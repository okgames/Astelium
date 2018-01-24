import express from 'express'
import bodyParser from 'body-parser'
import Player from 'client/gamecore/player';
const http = require('http')

export interface RestCallback {
    (req?: any, res?: any, err?: Error): void
}

export interface SocketCallback {
    (socketData: any): void
}

export enum RequestMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put', 
    DELETE = 'delete'
}

export type HttpRequest = {
    method: RequestMethod,
    url: string
}

export abstract class Server {

    private _host: string;
    private _port: number;
    private _restMapping: Map<HttpRequest, RestCallback>;    
    private _staticResources: string[];  
    constructor(host?: string, port?: number, restMapping?: Map<HttpRequest, RestCallback>,
         staticResources?: string[]) {
        this._host = host || 'localhost';
        this._port = port || 3000;        
        this._restMapping = restMapping || new Map<HttpRequest, RestCallback>([
            [{ url: this._host, method: RequestMethod.GET }, (req, res) => res.send('Whitelabel page...')]
        ]);
        this._staticResources = staticResources || ['public', 'static'];        
    }

    get host(): string {
        return this._host;
    }

    set host(host: string) {
        this._host = host;
    }

    get port(): number {
        return this._port;
    }

    set port(port: number) {
        this._port = port;
    }

    get restMapping(): Map<HttpRequest, RestCallback> {
        return this._restMapping;
    }

    set restMapping(restMapping: Map<HttpRequest, RestCallback>) {     
        this._restMapping = restMapping;
    }

    get staticResources(): string[] {
        return this._staticResources;
    }

    set staticResources(staticResources: string[]) {
        this._staticResources = staticResources;
    }

    protected abstract enableSockets(serverInstance: any): void;
   
    public start(): void {       
        const APP = express();
        const ROOT_DIRECTORY = require('app-root-dir').get();               
        APP.use(bodyParser.urlencoded());
        APP.use(bodyParser.json());  
        this._staticResources.forEach((folder) => {           
            APP.use(express.static(`${ROOT_DIRECTORY}/${folder}`));
        });                  
        this._restMapping.forEach((callback, request) => {             
            APP[request.method](request.url, callback)
        });
        const SERVER_INSTANCE = http.createServer(APP); 
        this.enableSockets(SERVER_INSTANCE);
        SERVER_INSTANCE.listen(this._port, 
            () => console.log(`Server was started on http://${this._host}:${this._port}`));   
    }
}