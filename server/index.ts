import {Server, RestCallback, HttpRequest, RequestMethod} from './server'
const fs = require('fs');
import * as path from 'path'

const server = new Server();

server.staticResources = [
    "client/static/audio",
    "client/static/fonts",
    "client/static/images",
    "client/static/scripts",
    "client/static/styles",
    "client/static/views",    
];

const saveFile = (req, res) => {
    console.log(req.body);
    const filepath = `${__dirname}/saves/x.json`;   
    console.log(filepath);   
    const stream = fs.createWriteStream(filepath);
    stream.once('open', (fd) => {
        stream.write(JSON.stringify(req.body));      
        stream.end();
    });   
}

server.restMapping = new Map<HttpRequest, RestCallback>([
    [{url: '/', method: RequestMethod.GET}, (req, res) => {
        res.sendFile(`/index.html`);
    }],
    [{url: '/save', method: RequestMethod.POST}, saveFile]
]);

server.start();