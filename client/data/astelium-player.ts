import Mover from "client/gamecore/mover";
import Layout from "client/gamecore/layout";
import GameObject from "client/gamecore/gameobject";
import { AsteliumSelector, APP_ENGINE_INSTANCE} from "client/data/astelium-engine";
import AudioManager from "client/gamecore/audiomanager";
import { GameObjectPosition, Callback, GameObjectStorage} from "client/gamecore/common";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import AsteliumAudioManager from "client/data/astelium-audiomanager";
import Player from "client/gamecore/player";
import Pawn from "client/gamecore/pawn";
import AsteliumNetworkManager from "client/data/astelium-networkmanager";

export default class AsteliumPlayer extends Player {
        
    constructor(selector?: string, HTMLTemplate?: string, autoRendering?: boolean, 
            position?: GameObjectPosition) {
        super(selector, HTMLTemplate, autoRendering, position);  
        this._moveEventListener = this.getMoveListener();     
        this._actionEventListener = this.getActionListener();      
    }

    private getMoveListener(): Callback {
        return (evt) => {
            switch(evt.key) {
                case 'w': {                                  
                    this.moveUp(3);
                    break;
                };
                case 's': {
                    this.moveDown(3);
                    break;
                };
                case 'a': {                                   
                    this.moveLeft(3);
                    break;
                };
                case 'd': {                                    
                    this.moveRight(3);
                    break;
                };               
                default: 
                    break;
            }
        }
    }

    private getActionListener(): Callback {
        return (evt) => {
            const parentModel = APP_ENGINE_INSTANCE.getModel(this._parentSelector);              
            if(evt.key === 'Enter') {                  
                console.log('Action is called');
            }                  
            if(evt.key === 'Escape')  {             
                APP_ENGINE_INSTANCE.getManager<AsteliumGameStateManager>(AsteliumSelector.GAME_STATE_MANAGER_ID)
                .currentState = {
                    storage: {
                      players: parentModel._childModels.filter(child => child instanceof Player),
                      pawns: parentModel._childModels.filter(child => child instanceof Pawn) 
                    } as GameObjectStorage,
                    dom: document.querySelector(`#${parentModel._selector}`).outerHTML                     
                }             
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
                    .playSelected(['/soul.mp3', '/menu.mp3']);                       
                (parentModel as Layout).renderSelectedChildren([
                    AsteliumSelector.GAME_MENU_ID
                ]);  
                this.pause();                                       
            }      
        }
    }
  
    protected addMoveListener(): void {      
        document.addEventListener('keypress', this._moveEventListener)      
    }

    protected addActionListener(): void {       
        document.addEventListener('keydown', this._actionEventListener);
    }  

    protected removeMoveListener(): void {      
        document.removeEventListener('keypress', this._moveEventListener)      
    }

    protected removeActionListener(): void {
        document.removeEventListener('keydown', this._actionEventListener);
    }  

    public moveUp(pixels: number): void {
        super.moveUp(pixels);        
        APP_ENGINE_INSTANCE.updateModel(this._selector, this);
        AsteliumNetworkManager.send(JSON.stringify({type: 'state-to-server', player: this}));      
    }

    public moveDown(pixels: number): void {
        super.moveDown(pixels);     
        APP_ENGINE_INSTANCE.updateModel(this._selector, this);
        AsteliumNetworkManager.send(JSON.stringify({type: 'state-to-server', player: this}));       
    }

    public moveLeft(pixels: number): void {
        super.moveLeft(pixels);
        APP_ENGINE_INSTANCE.updateModel(this._selector, this);
        AsteliumNetworkManager.send(JSON.stringify({type: 'state-to-server', player: this}));     
    }

    public moveRight(pixels: number): void {
        super.moveRight(pixels);        
        APP_ENGINE_INSTANCE.updateModel(this._selector, this);        
        AsteliumNetworkManager.send(JSON.stringify({type: 'state-to-server', player: this}));       
    }

    public init(): void {       
        this.addMoveListener();
        this.addActionListener();        
    }

    public pause(): void {
        this.removeMoveListener();
        this.removeActionListener();        
    } 
}