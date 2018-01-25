import Engine from "client/gamecore/engine";
import AsteliumPlayer from "client/data/astelium-player";
import AsteliumPhysicsManager from "client/data/astelium-physicsmanager";
import { Direction } from "client/gamecore/physicsmanager";
import { Callback } from "client/gamecore/common";
import AsteliumGameLayout from "client/data/astelium-layout";

export enum AsteliumSelector {
    AUDIO_MANAGER_ID = 'ast-aud-manager',
    GAME_STATE_MANAGER_ID = 'ast-gamestate-manager',
    NETWORK_MANAGER_ID = 'ast-network-manager',
    PHYSICS_MANAGER_ID = 'ast-phys-manager',
    GAME_LAYOUT_ID = 'game-layout',
    GAME_MENU_ID = 'ast-menu',  
    ADVICER_ID = 'ast-advicer'
}

class AsteliumEngine extends Engine {

    private _activePlayers: AsteliumPlayer[];
    private _availablePlayers: AsteliumPlayer[];
    private _currentPlayer: AsteliumPlayer;
    public readonly SOCKET_SERVER_MESSAGES = new Map<string, Callback>([
        [  'move-up-to-client', (serverData) => {                   
                console.log(`UP ${serverData.player._selector}`);
                const player = serverData.player;
                this.getManager<AsteliumPhysicsManager>(AsteliumSelector.PHYSICS_MANAGER_ID)
                    .animate(player._selector, player._position, Direction.UP); 
            }
        ],
        [   'move-down-to-client', (serverData) => {                   
                console.log(`DOWN ${serverData.player._selector}`) 
                const player = serverData.player;
                this.getManager<AsteliumPhysicsManager>(AsteliumSelector.PHYSICS_MANAGER_ID)
                    .animate(player._selector, player._position, Direction.DOWN);
            }
        ],
        [
            'move-left-to-client', (serverData) => {   
                console.log(`LEFT ${serverData.player._selector}`);  
                const player = serverData.player;
                this.getManager<AsteliumPhysicsManager>(AsteliumSelector.PHYSICS_MANAGER_ID)
                    .animate(player._selector, player._position, Direction.LEFT);  
            }   
        ],
        [
            'move-right-to-client', (serverData) => {                       
                console.log(`RIGHT ${serverData.player._selector}`);
                const player = serverData.player;
                this.getManager<AsteliumPhysicsManager>(AsteliumSelector.PHYSICS_MANAGER_ID)
                    .animate(player._selector, player._position, Direction.RIGHT);           
            }
        ],
        [
            'connection-response-broadcast', (serverData) => {     
                console.log(serverData);               
                this.activePlayers = serverData.activePlayers.map((dtoPlayer) => {
                   return Object.assign(new AsteliumPlayer(), dtoPlayer);  
                });                     
                this.availablePlayers = serverData.availablePlayers.map((dtoPlayer) => {
                    return Object.assign(new AsteliumPlayer(), dtoPlayer); 
                });;                     
                this.loadModels(this.activePlayers);                     
                this.activePlayers.forEach((player) => {
                    this.getModel<AsteliumGameLayout>(AsteliumSelector.GAME_LAYOUT_ID)
                        .appendChild(player);
                });       
                console.log('ENGINE', this.modelsMap.values()); 
            }
        ],
        [
            'connection-response-single', (serverData) => {
                this.currentPlayer = serverData.currentPlayer;                          
                this.currentPlayer = Object.assign(this.getModel<AsteliumPlayer>(this.currentPlayer._selector),
                    this.currentPlayer);
                console.log('Current player', this.currentPlayer); 
            }
        ]
    ]);

    get activePlayers(): AsteliumPlayer[] {
        return this._activePlayers;
    }

    set activePlayers(players: AsteliumPlayer[]) {
        this._activePlayers = players;
    }

    get availablePlayers(): AsteliumPlayer[] {
        return this._availablePlayers;
    }

    set availablePlayers(players: AsteliumPlayer[]) {
        this._availablePlayers = players;
    }

    get currentPlayer(): AsteliumPlayer {
        return this._currentPlayer;
    }

    set currentPlayer(player: AsteliumPlayer) {
        this._currentPlayer = player;
    }
}

export const APP_ENGINE_INSTANCE = new AsteliumEngine();


