import Engine from "client/gamecore/engine";

export enum AsteliumSelector {
    AUDIO_MANAGER_ID = 'ast-aud-manager',
    GAME_STATE_MANAGER_ID = 'ast-gamestate-manager',
    GAME_LAYOUT_ID = 'game-layout',
    GAME_MENU_ID = 'ast-menu',
    SINGLE_PLAYER_ID = 'ast-player',
    PLAYER_I_ID = 'ast-player-1',
    PLAYER_II_ID = 'ast-player-2',
    ADVICER_ID = 'ast-advicer'
}

export const APP_ENGINE_INSTANCE = new Engine();