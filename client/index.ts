import AsteliumMenu from "client/data/astelium-menu";
import AsteliumAudioManager from "client/data/astelium-audiomanager";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import AsteliumGameLayout from "client/data/astelium-layout";
import AsteliumPlayer from "client/data/astelium-player";
import Advicer from "client/data/astelium-advicer";
import { AsteliumSelector, APP_ENGINE_INSTANCE } from "client/data/astelium-engine";
import Player from "client/gamecore/player";
import AsteliumNetworkManager from "client/data/astelium-networkmanager";
import Mover from "client/gamecore/mover";
import AsteliumPhysicsManager from "client/data/astelium-physicsmanager";


document.addEventListener("DOMContentLoaded", async () => {  
    
    await fetch('/app-url',
    {
        method: 'GET'
    })
    .then((res) => {            
        return res.json(); 
    })
    .then((data) => {      
        const socket = new WebSocket(`wss://${data.host}:${data.port}`);       
        socket.onopen = (event) => {           
            console.log('Connected...');      
            socket.send(JSON.stringify({type: 'connection-request', status: 'Opened'}));            
            socket.onmessage = (event) => {           
                const serverData = JSON.parse(event.data);           
                console.log('From server: ', serverData);
                APP_ENGINE_INSTANCE.SOCKET_SERVER_MESSAGES.get(serverData.type)(serverData);         
            };   
            window.onbeforeunload = (evt) => {
                APP_ENGINE_INSTANCE.activePlayers.splice(APP_ENGINE_INSTANCE.activePlayers
                    .indexOf(APP_ENGINE_INSTANCE.currentPlayer), 1);
                APP_ENGINE_INSTANCE.availablePlayers.push(APP_ENGINE_INSTANCE.currentPlayer);            
                socket.send(JSON.stringify({
                    type: 'before-unload',                
                    activePlayers: APP_ENGINE_INSTANCE.activePlayers,
                    availablePlayers: APP_ENGINE_INSTANCE.availablePlayers
                }));          
            }                 
            socket.onclose = (event) => {
                console.log('Closed connection...');             
            };    
            socket.onerror = (error) => {
                socket.send(JSON.stringify(error));
            };           
        }     
        const audioManager = new AsteliumAudioManager(AsteliumSelector.AUDIO_MANAGER_ID);
        const stateManager = new AsteliumGameStateManager(AsteliumSelector.GAME_STATE_MANAGER_ID);
        const physicsManager = new AsteliumPhysicsManager(AsteliumSelector.PHYSICS_MANAGER_ID);  
        const networkManager = new AsteliumNetworkManager(AsteliumSelector.NETWORK_MANAGER_ID, socket);
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
            audioManager, stateManager, networkManager, physicsManager
        ]);
    

        APP_ENGINE_INSTANCE.loadModels([
            new AsteliumGameLayout(AsteliumSelector.GAME_LAYOUT_ID, null, true),
            new AsteliumMenu(AsteliumSelector.GAME_MENU_ID, null, true),                     
            new Advicer(
                AsteliumSelector.ADVICER_ID, null, false,
                {
                    x: 250,
                    y: 250
                }
            )    
        ]);
    
        APP_ENGINE_INSTANCE.getModel<AsteliumGameLayout>(AsteliumSelector.GAME_LAYOUT_ID)
            .setChildModels([
                APP_ENGINE_INSTANCE.getModel(AsteliumSelector.GAME_MENU_ID),      
                APP_ENGINE_INSTANCE.getModel(AsteliumSelector.ADVICER_ID)
            ]);       

        APP_ENGINE_INSTANCE.getModel<AsteliumGameLayout>(AsteliumSelector.GAME_LAYOUT_ID)
            .render('renderTarget');      
    })         
});