import AsteliumMenu from "client/data/astelium-menu";
import AsteliumAudioManager from "client/data/astelium-audiomanager";
import Layout from "client/gamecore/layout";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import AsteliumGameLayout from "client/data/astelium-layout";
import AsteliumPlayer from "client/data/astelium-player";
import Advicer from "client/data/astelium-advicer";
import { APP_ENGINE_INSTANCE, AsteliumSelector } from "client/data/astelium-engine";
import AsteliumMultiplayer from "client/data/astelium-multiplayer";


document.addEventListener("DOMContentLoaded", () => {    
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {     
        socket.send(JSON.stringify({status: "Connected"}));  
        console.log('Connected...');
    }

    socket.onmessage = (event) => {
        const incomingMessage = event.data;
        socket.send(JSON.stringify({status: 'Message was sent'}));
        console.log('From server: ', incomingMessage);
    };

    socket.onclose = () => {
        socket.send(JSON.stringify({status: 'Closed'}));
        console.log('Closed connection...');
    }

    socket.onerror = (error) => {
        socket.send(JSON.stringify({data: error}));
    }

    
    const audioManager = new AsteliumAudioManager(AsteliumSelector.AUDIO_MANAGER_ID);
    const stateManager = new AsteliumGameStateManager(AsteliumSelector.GAME_STATE_MANAGER_ID);
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
        new AsteliumGameLayout(AsteliumSelector.GAME_LAYOUT_ID, null, true),
        new AsteliumMenu(AsteliumSelector.GAME_MENU_ID, null, true), 
        new AsteliumPlayer(
            AsteliumSelector.SINGLE_PLAYER_ID, null, false,
            {
                x: 0,
                y: 0
            }      
        ),           
        new AsteliumMultiplayer(
            AsteliumSelector.PLAYER_I_ID, null, false,
            {
                x: 0,
                y: 0
            },        
            socket      
        ),
        new AsteliumMultiplayer(
            AsteliumSelector.PLAYER_II_ID, null, false,
            {
                x: 0,
                y: 100
            },              
            socket
        ),
        new Advicer(
            AsteliumSelector.ADVICER_ID, null, false,
            {
                x: 250,
                y: 250
            }
        )    
    ])

    const gameLayout = APP_ENGINE_INSTANCE.getModel<AsteliumGameLayout>(AsteliumSelector.GAME_LAYOUT_ID);   
    gameLayout.setChildModels([
        APP_ENGINE_INSTANCE.getModel(AsteliumSelector.GAME_MENU_ID),
        APP_ENGINE_INSTANCE.getModel(AsteliumSelector.SINGLE_PLAYER_ID),
        APP_ENGINE_INSTANCE.getModel(AsteliumSelector.PLAYER_I_ID),
        APP_ENGINE_INSTANCE.getModel(AsteliumSelector.PLAYER_II_ID),
        APP_ENGINE_INSTANCE.getModel(AsteliumSelector.ADVICER_ID)
    ]);  
    console.log('CHILDS', gameLayout._childModels)
    gameLayout.render('renderTarget');    
});