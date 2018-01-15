import { SavedGame } from "client/gamecore/common";

export default class GameStateManager {

    private _currentState: string;
    private _savedGames: SavedGame[];
    
    constructor(currentState?: string, savedGames?: SavedGame[]) {
        this._currentState = currentState || null;
        this._savedGames = savedGames || [];
    }

    get currentState() {
        return this.currentState;
    }

    set currentState(currentState: string) {
        this._currentState = currentState;
    }

    get savedGames() {
        return this._savedGames;
    }

    set savedGames(savedGames: SavedGame[]) {
        this._savedGames = savedGames;
    }

    public save(saveName: string, url: string): void {
        console.log('Save');
        const save = {
            date: new Date().toString(),
            state: this._currentState,
            name: saveName
        }         
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
        })
        .then((data) => {
             console.log(data);
        })     
    }

    public load(saveName: string, url: string): void {
        console.log('Load');
    }
} 