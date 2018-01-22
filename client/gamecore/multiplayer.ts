import Player from "client/gamecore/player";
import { GameObjectPosition } from "client/gamecore/common";

export default abstract class MultiPlayer extends Player {

    private _socket: WebSocket;

    constructor(selector?: string, HTMLTemplate?: string, autoRendering?: boolean, 
        position?: GameObjectPosition, socket?: WebSocket) {
            super(selector, HTMLTemplate, autoRendering, position);
            this._socket = socket;
    }

    get socket() {
        return this._socket;
    }

    set socket(socket: WebSocket) {
        this._socket = socket;
    }

    public moveUp(pixels: number): void {
        super.moveUp(pixels);
        this._socket.send({id: this._selector, position: this._position});
    }

    public moveDown(pixels: number): void {      
        super.moveUp(pixels);
        this._socket.send({id: this._selector, position: this._position});
    }

    public moveLeft(pixels: number): void {
        super.moveUp(pixels);
        this._socket.send({id: this._selector, position: this._position});
    }

    public moveRight(pixels: number): void {
        super.moveUp(pixels);
        this._socket.send({id: this._selector, position: this._position});
    }

    
}