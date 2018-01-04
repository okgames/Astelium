import {Server, RestCallback} from './server'
import * as path from 'path'

const server = new Server();

server.staticResources = ["client/static/views", "client/static/scripts", "client/static/styles"];

server.restMapping = new Map<string, RestCallback>([
    ['/', (req, res) => {
        res.sendFile(`/index.html`);
    }]
]);

server.start();