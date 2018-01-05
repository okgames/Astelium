import {Server, RestCallback} from './server'
import * as path from 'path'

const server = new Server();

server.staticResources = [
    "client/static/audio",
    "client/static/fonts",
    "client/static/images",
    "client/static/scripts",
    "client/static/styles",
    "client/static/views"    
];

server.restMapping = new Map<string, RestCallback>([
    ['/', (req, res) => {
        res.sendFile(`/index.html`);
    }]
]);

server.start();