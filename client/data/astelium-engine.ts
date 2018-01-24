import Engine from "client/gamecore/engine";
import AsteliumPlayer from "client/data/astelium-player";

export enum AsteliumSelector {
    AUDIO_MANAGER_ID = 'ast-aud-manager',
    GAME_STATE_MANAGER_ID = 'ast-gamestate-manager',
    NETWORK_MANAGER_ID = 'ast-network-manager',
    GAME_LAYOUT_ID = 'game-layout',
    GAME_MENU_ID = 'ast-menu',
    SINGLE_PLAYER_ID = 'ast-player',
    PLAYER_I_ID = 'ast-player-1',
    PLAYER_II_ID = 'ast-player-2',
    ADVICER_ID = 'ast-advicer'
}

class AsteliumEngine extends Engine {

    private _activePlayers: AsteliumPlayer[];
    private _currentPlayer: AsteliumPlayer;

    get activePlayers(): AsteliumPlayer[] {
        return this._activePlayers;
    }

    set activePlayers(players: AsteliumPlayer[]) {
        this._activePlayers = players;
    }

    get currentPlayer(): AsteliumPlayer {
        return this._currentPlayer;
    }

    set currentPlayer(player: AsteliumPlayer) {
        this._currentPlayer = player;
    }

}

export const APP_ENGINE_INSTANCE = new AsteliumEngine();