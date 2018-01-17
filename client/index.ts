import AsteliumMenu from "client/data/astelium-menu";
import AsteliumAudioManager from "client/data/astelium-audiomanager";
import Layout from "client/gamecore/layout";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import AsteliumGameLayout from "client/data/astelium-layout";
import AsteliumPlayer from "client/data/astelium-player";
import Advicer from "client/data/astelium-advicer";
import { APP_ENGINE_INSTANCE } from "client/data/astelium-engine";


document.addEventListener("DOMContentLoaded", () => {
    console.log('Document was loaded');
    const audioManager = new AsteliumAudioManager();
    const stateManager = new AsteliumGameStateManager();
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
   
    APP_ENGINE_INSTANCE.loadModels([
        new AsteliumGameLayout('game-layout', audioManager, null, true, stateManager),
        new AsteliumMenu('ast-menu', audioManager, null, true),            
        new AsteliumPlayer(
            'ast-player', audioManager, null, false,
            {
                x: 0,
                y: 0
            },              
        ),
        new Advicer(
            'ast-advicer', audioManager, null, false,
            {
                x: 250,
                y: 250
            }
        )    
    ]);

    const gameLayout = (APP_ENGINE_INSTANCE.getModel('game-layout') as AsteliumGameLayout);

    gameLayout.childModels = [
        APP_ENGINE_INSTANCE.getModel('ast-menu'),
        APP_ENGINE_INSTANCE.getModel('ast-player'),
        APP_ENGINE_INSTANCE.getModel('ast-advicer')
    ];
  
    gameLayout.render('renderTarget', '/menu.mp3');
});