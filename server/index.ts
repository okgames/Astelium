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
    fs.appendFile(`${__dirname}/saves/${req.body.name}.json`, JSON.stringify(req.body), (err) => {
        if(err) {
            throw err;
        } 
        console.log('Game was saved!');
    });   
}

const loadFile = (req, res) => {   
    console.log(req.body);
    //const content = fs.readFileSync(`${__dirname}/saves/${req.body.name}.json`, 'utf8');    
    return {x: 23};
}

server.restMapping = new Map<HttpRequest, RestCallback>([
    [{url: '/', method: RequestMethod.GET}, (req, res) => {
        res.sendFile(`/index.html`);
    }],
    [{url: '/save', method: RequestMethod.POST}, saveFile],
    [{url: '/load', method: RequestMethod.POST}, loadFile],
]);

server.start();