import AsteliumMenu from "client/data/astelium-menu";
import AsteliumAudioManager from "client/data/astelium-audiomanager";
import Layout from "client/gamecore/layout";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import AsteliumGameLayout from "client/data/astelium-layout";
import AsteliumPlayer from "client/data/astelium-player";
import Advicer from "client/data/astelium-advicer";
import { AsteliumSelector, APP_ENGINE_INSTANCE } from "client/data/astelium-engine";
import Player from "client/gamecore/player";
import AsteliumNetworkManager from "client/data/astelium-networkmanager";


document.addEventListener("DOMContentLoaded", () => {  

    const socket = new WebSocket("ws://localhost:3000");
    const audioManager = new AsteliumAudioManager(AsteliumSelector.AUDIO_MANAGER_ID);
    const stateManager = new AsteliumGameStateManager(AsteliumSelector.GAME_STATE_MANAGER_ID);
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
        audioManager, stateManager, networkManager
    ]);

   
    let currentPlayer;
    let activePlayers = [] as AsteliumPlayer[];
    let availablePlayers = [] as AsteliumPlayer[];

   
    socket.onopen = (event) => {           
        console.log('Connected...');      
        socket.send(JSON.stringify({type: 'connection-request', status: 'Opened'}));        
        // socket.send(JSON.stringify({type: 'state-to-server', player: player1}));
        socket.onmessage = (event) => {           
            const serverData = JSON.parse(event.data);           
            console.log('From server: ', serverData);
            switch(serverData.type) {
                case 'state-to-client': {                     
                    APP_ENGINE_INSTANCE.updateModel(AsteliumSelector.PLAYER_I_ID, serverData.player);                          
                    break;
                }                
                case 'connection-response-broadcast': {                    
                    activePlayers = serverData.activePlayers.map((dtoPlayer) => {
                      return Object.assign(new AsteliumPlayer(), dtoPlayer);  
                    });   
                    console.log("ACTIVE PLa", activePlayers);
                    availablePlayers = serverData.availablePlayers;    
                    APP_ENGINE_INSTANCE.activePlayers = activePlayers;
                    APP_ENGINE_INSTANCE.loadModels(activePlayers); 
                    activePlayers.forEach((player) => {
                        APP_ENGINE_INSTANCE.getModel<AsteliumGameLayout>(AsteliumSelector.GAME_LAYOUT_ID)
                            .appendChild(player);
                    });       
                    console.log('ENGINE', APP_ENGINE_INSTANCE.modelsMap.values());                               
                    break;
                }         
                case 'connection-response-single': {
                    currentPlayer = serverData.currentPlayer;                      
                    APP_ENGINE_INSTANCE.currentPlayer = Object.assign(APP_ENGINE_INSTANCE
                        .getModel<AsteliumPlayer>(currentPlayer._selector), currentPlayer);
                    console.log('Current player', APP_ENGINE_INSTANCE.currentPlayer);                    
                    break;
                }               
                case 'player': {
                    console.log(JSON.stringify(serverData.players));                                  
                    break;
                }                   
                default: {
                    console.log('Unknown type of received data...');
                    break;
                }
            }               
        };   
        window.onbeforeunload = (evt) => {
            activePlayers.splice(activePlayers.indexOf(currentPlayer), 1);
            availablePlayers.push(currentPlayer);            
            socket.send(JSON.stringify({
                type: 'before-unload',                
                activePlayers,
                availablePlayers
            }));          
        }            
        socket.onclose = (event) => {
            console.log('Closed connection...');             
        };    
        socket.onerror = (error) => {
            socket.send(JSON.stringify(error));
        };           
    }      

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
});