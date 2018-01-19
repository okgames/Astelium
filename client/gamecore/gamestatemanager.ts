import { SavedGame, GameState } from "client/gamecore/common";
import Manager from "client/gamecore/manager";

export default class GameStateManager extends Manager {

    private _currentState: GameState;
    private _savedGames: SavedGame[];
    
    constructor(id: string, currentState?: GameState, savedGames?: SavedGame[]) {
        super(id);
        this._currentState = currentState || null;
        this._savedGames = savedGames || [];
    }

    get currentState() {
        return this.currentState;
    }

    set currentState(currentState: GameState) {
        this._currentState = currentState;
    }

    get savedGames() {
        return this._savedGames;
    }

    set savedGames(savedGames: SavedGame[]) {
        this._savedGames = savedGames;
    }

    public save(saveName: string, url: string): void {        
        console.log('Current State ', this._currentState)
        const save = {
            date: new Date().toLocaleTimeString("en-us", {
                weekday: "long", year: "numeric", month: "short",  
                day: "numeric", hour: "2-digit", minute: "2-digit",
                second: "2-digit"  
            }),
            state: this._currentState,
            name: saveName
        }         
        console.log('Save', save);
        fetch('/save',
        {
            method: 'POST',
            body: JSON.stringify(save),               
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((res) => { 
            return res.json(); 
        });
        this._savedGames.push(save);       
    }

    public async showAllSaves(url: string): Promise<string[]> {           
        return await fetch('/showAllSaves',
        {
            method: 'GET'
        })
        .then((res) => {            
            return res.json(); 
        })
        .then((data) => {
            console.log('Response', data);
            return data.saves; 
        })       
    }

    public load(saveName: string, url: string): Promise<SavedGame> {     
        console.log('Save name', saveName);      
        return fetch('/load',
        {
            method: 'POST',   
            body: JSON.stringify({name: saveName}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((res) => {             
            return res.json(); 
        })
        .then((data) => {
            return data; 
        })       
    }
} 