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

const showAllSaveFiles = (req, res) => {
    
}

const loadFile = (req, res) => {    
    fs.readFile(`${__dirname}/saves/${req.body.name}.json`, 'utf8', (err, data) => {
        if(err) {
            throw err;
        }        
        res.setHeader('Content-type', 'application/json');
        res.send(JSON.parse(data)); 
    });     
}

server.restMapping = new Map<HttpRequest, RestCallback>([
    [{url: '/', method: RequestMethod.GET}, (req, res) => {
        res.sendFile(`/index.html`);
    }],
    [{url: '/save', method: RequestMethod.POST}, saveFile],
    [{url: '/showAllSaves', method: RequestMethod.POST}, showAllSaveFiles],
    [{url: '/load', method: RequestMethod.POST}, loadFile],
]);

server.start();