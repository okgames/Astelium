import {Server, RestCallback} from './server'
import * as path from 'path'

const server = new Server();

server.staticFolders = ["client/views", "client/scripts", "client/styles"];

server.restMapping = new Map<string, RestCallback>([
    ['/', (req, res) => {
        res.sendFile(`/index.html`);
    }]
]);

server.start();