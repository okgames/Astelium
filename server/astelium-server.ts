import { Server, HttpRequest, RestCallback } from "server/server";
import Player from "client/gamecore/player";
import WebSocket from 'ws';
import { Callback } from "client/gamecore/common";

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

const SOCKET_CLIENT_MESSAGES = new Map<string, Callback>([
    [
        'move-up-to-server', (data: any, server: AsteliumServer, wsServer: WebSocket.Server, ws: WebSocket) => {        
            const player = data.player;                   
            wsServer.broadcast(JSON.stringify({
                type: 'move-up-to-client',                            
                player
            }));
        }
    ],
    [
        'move-down-to-server', (data: any, server: AsteliumServer, wsServer: WebSocket.Server, ws: WebSocket) => {   
            const player = data.player;                        
            wsServer.broadcast(JSON.stringify({
                type: 'move-down-to-client',                            
                player
            }));    
        }
    ],
    [
        'move-left-to-server', (data: any, server: AsteliumServer, wsServer: WebSocket.Server, ws: WebSocket) => {   
            const player = data.player;         
            wsServer.broadcast(JSON.stringify({
                type: 'move-left-to-client',                          
                player
            }));  
        } 
    ],
    [
        'move-right-to-server', (data: any, server: AsteliumServer, wsServer: WebSocket.Server, ws: WebSocket) => {   
            const player = data.player;                      
            wsServer.broadcast(JSON.stringify({
                type: 'move-right-to-client',  
                player                         
            }));   
        }
    ],
    [
        'connection-request', (data: any, server: AsteliumServer, wsServer: WebSocket.Server, ws: WebSocket) => {      
            const currentPlayer = server._availablePlayers.pop();           
            if(currentPlayer != null) {
                server._activePlayers.push(currentPlayer); 
            }                                        
            wsServer.broadcast(JSON.stringify({
                type: 'connection-response-broadcast',                                                    
                activePlayers: server._activePlayers,
                availablePlayers: server._availablePlayers
            }));    
            ws.send(JSON.stringify({type: 'connection-response-single', currentPlayer})); 
        }
    ],
    [
        'before-unload', (data: any, server: AsteliumServer, wsServer: WebSocket.Server, ws: WebSocket) => {                                   
            server._activePlayers = data.activePlayers;
            server._availablePlayers = data.availablePlayers;    
        }
    ]
]); 

export class AsteliumServer extends Server {
    
    _availablePlayers: AsteliumPlayerDTO[];
    _activePlayers: AsteliumPlayerDTO[];           

    constructor(host?: string, port?: number, restMapping?: Map<HttpRequest, RestCallback>,
         staticResources?: string[], availablePlayers?: AsteliumPlayerDTO[],
         activePlayers?: AsteliumPlayerDTO[]) {
        super(host, port, restMapping, staticResources);         
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
                SOCKET_CLIENT_MESSAGES.get(data.type)(data, this, WEB_SOCKET_SERVER_INSTANCE, ws);          
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