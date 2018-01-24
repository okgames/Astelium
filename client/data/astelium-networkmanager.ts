import Manager from "client/gamecore/manager";

export default class AsteliumNetworkManager extends Manager {  

    private static _socket: WebSocket;

    constructor(id: string, socket: WebSocket) {
        super(id);        
        AsteliumNetworkManager._socket = socket;
    }

    get socket() {
        return AsteliumNetworkManager._socket;
    }

    set socket(socket: WebSocket) {
        AsteliumNetworkManager._socket = socket;
    }

    public static send(data: any) {
        this._socket.send(data);
    }

}