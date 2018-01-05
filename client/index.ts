import MainMenu from "./gamecore/main-menu"
import AudioManager from "client/gamecore/audio-manager";

document.addEventListener("DOMContentLoaded", () => {
    console.log('Document was loaded');
    const audioManager = new AudioManager();
    audioManager.load([
        '/location.mp3',
        '/menu.mp3',
        '/multiplayer.mp3',
        '/newgame.mp3',
        '/options.mp3',
        '/singleplayer.mp3',
    ])
    let mainMenu = new MainMenu(null, audioManager);
    mainMenu.build('#renderTarget'); 
});