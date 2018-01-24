import { Server, HttpRequest, RestCallback } from "server/server";
import Player from "client/gamecore/player";
import WebSocket from 'ws';
import AsteliumPlayer from "client/data/astelium-player";

export interface AsteliumPlayerDTO {
    _selector?: string;
    _parentSelector?: string;
    _HTMLTemplate?: string;     
    _childModels?: AsteliumPlayerDTO[];  
    _autoRendering?: boolean;
    _position?: {
        x?: number,
        y?: number,
        angle?: number
    }
}

export enum AsteliumPlayerSelector {   
    PLAYER_I_ID = 'ast-player-1',
    PLAYER_II_ID = 'ast-player-2'    
}

export class AsteliumServer extends Server {
    
    private _availablePlayers: AsteliumPlayerDTO[];
    private _activePlayers: AsteliumPlayerDTO[];

    constructor(host?: string, port?: number, restMapping?: Map<HttpRequest, RestCallback>,
         staticResources?: string[], availablePlayers?: AsteliumPlayerDTO[],
         activePlayers?: AsteliumPlayerDTO[]) {
        super();         
        this._availablePlayers = availablePlayers || [];     
        this._activePlayers = activePlayers || [];
    }

    get availablePlayers(): AsteliumPlayerDTO[] {
        return this._availablePlayers;
    }

    set availablePlayers(players: AsteliumPlayerDTO[]) {
        this._availablePlayers = players;
    }

    get activePlayers(): AsteliumPlayerDTO[] {
        return this._activePlayers;
    }

    set activePlayers(players: AsteliumPlayerDTO[]) {
        this._activePlayers = players;
    }

    protected enableSockets(serverInstance: any) {
        const WEB_SOCKET_SERVER_INSTANCE = new WebSocket.Server({ server: serverInstance});           
        WEB_SOCKET_SERVER_INSTANCE.broadcast = (data) => {            
            WEB_SOCKET_SERVER_INSTANCE.clients.forEach((client) => {
                client.send(data);
            });
        };        
        WEB_SOCKET_SERVER_INSTANCE.on('connection', (ws: WebSocket) => { 
            const clients = Array.from<WebSocket>(WEB_SOCKET_SERVER_INSTANCE.clients);    
            ws.on('open', (socketData) => {
                console.log('OPEN', socketData);
            });                      
            ws.on('message', (socketData) => {
                const data = JSON.parse(socketData);
                switch(data.type) {
                    case 'state-to-server': {                        
                        const player = data.player;   
                        const index = this._activePlayers.findIndex(pl => pl._selector === player._selector);
                        this._activePlayers[index] = player;                                         
                        WEB_SOCKET_SERVER_INSTANCE.broadcast(JSON.stringify({
                            type: 'state-to-client',
                            currentPlayer: player,
                            activePlayers: this._activePlayers,
                            availablePlayers: this._availablePlayers
                        }));                                           
                        break;
                    }                   
                    case 'connection-request': {      
                        const currentPlayer = this._availablePlayers.pop();
                        if(currentPlayer != null) {
                            this._activePlayers.push(currentPlayer); 
                        }                                        
                        WEB_SOCKET_SERVER_INSTANCE.broadcast(JSON.stringify({
                            type: 'connection-response-broadcast',                                                    
                            activePlayers: this._activePlayers,
                            availablePlayers: this._availablePlayers
                        }));    
                        ws.send(JSON.stringify({type: 'connection-response-single', currentPlayer}));                                           
                        break;
                    }                  
                    case 'player': {
                        console.log(JSON.stringify(data.player));                       
                        ws.send(JSON.stringify({type: 'player', players: this._availablePlayers.values()}));    
                        break;
                    }
                    case 'before-unload': {
                        const data = JSON.parse(socketData);                      
                        this._activePlayers = data.activePlayers;
                        this._availablePlayers = data.availablePlayers;
                        console.log('UNLOAD', this._activePlayers, this._availablePlayers.length);
                        break;
                    }                 
                    default: {
                        console.log('Unknown type of received data...');
                        break;
                    }                       
                }             
               
            });
            ws.on('error', (err) => {
                console.log('Received error', err);               
            });
            ws.on('close', (socketData) => {                      
                console.log('Connection is closed...')
            });              
        });        
    }

}