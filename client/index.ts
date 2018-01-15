import AsteliumMenu from "client/data/astelium-menu";
import AsteliumAudioManager from "client/data/astelium-audiomanager";
import Layout from "client/gamecore/layout";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import AsteliumGameLayout from "client/data/astelium-layout";


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
    ])
    const gameLayout = new AsteliumGameLayout('game-layout', audioManager, null, stateManager, true);    
    gameLayout.render('renderTarget', '/menu.mp3');  
});