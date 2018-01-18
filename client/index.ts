import AsteliumMenu from "client/data/astelium-menu";
import AsteliumAudioManager from "client/data/astelium-audiomanager";
import Layout from "client/gamecore/layout";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import AsteliumGameLayout from "client/data/astelium-layout";
import AsteliumPlayer from "client/data/astelium-player";
import Advicer from "client/data/astelium-advicer";
import { APP_ENGINE_INSTANCE, AUDIO_MANAGER_ID, GAME_STATE_MANAGER_ID,
     GAME_LAYOUT_ID, GAME_MENU_ID, ADVICER_ID, PLAYER_II_ID, PLAYER_I_ID } from "client/data/astelium-engine";


document.addEventListener("DOMContentLoaded", () => {
    console.log('Document was loaded');
    const audioManager = new AsteliumAudioManager(AUDIO_MANAGER_ID);
    const stateManager = new AsteliumGameStateManager(GAME_STATE_MANAGER_ID);
    audioManager.load([
        '/location.mp3',
        '/menu.mp3',
        '/multiplayer.mp3',
        '/newgame.mp3',
        '/options.mp3',
        '/singleplayer.mp3',
        '/slime.mp3',
        '/soul.mp3'
    ]);

    APP_ENGINE_INSTANCE.registerManagers([
        audioManager, stateManager
    ]);
   
    APP_ENGINE_INSTANCE.loadModels([
        new AsteliumGameLayout(GAME_LAYOUT_ID, null, true),
        new AsteliumMenu(GAME_MENU_ID, null, true),            
        new AsteliumPlayer(
            PLAYER_I_ID, null, false,
            {
                x: 0,
                y: 0
            },              
        ),
        new AsteliumPlayer(
            PLAYER_II_ID, null, false,
            {
                x: 0,
                y: 40
            },              
        ),
        new Advicer(
            ADVICER_ID, null, false,
            {
                x: 250,
                y: 250
            }
        )    
    ]);

     // For singleplayer first
    const gameLayout = APP_ENGINE_INSTANCE.getModel<AsteliumGameLayout>(GAME_LAYOUT_ID);
    const player1 = APP_ENGINE_INSTANCE.getModel<AsteliumPlayer>(PLAYER_I_ID);   
    gameLayout.childModels = [
        APP_ENGINE_INSTANCE.getModel(GAME_MENU_ID),
        APP_ENGINE_INSTANCE.getModel(PLAYER_I_ID),
        APP_ENGINE_INSTANCE.getModel(ADVICER_ID)
    ];  
    gameLayout.render('renderTarget', '/menu.mp3');    
});