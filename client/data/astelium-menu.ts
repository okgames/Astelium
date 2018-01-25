import Menu from "client/gamecore/menu";
import { Callback } from "client/gamecore/common";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import Model from "client/gamecore/model";
import Layout from "client/gamecore/layout";
import GameObject from "client/gamecore/gameobject";
import { AsteliumSelector, APP_ENGINE_INSTANCE } from "client/data/astelium-engine";
import AsteliumAudioManager from "client/data/astelium-audiomanager";
import AsteliumPlayer from "client/data/astelium-player";
import Player from "client/gamecore/player";
import Pawn from "client/gamecore/pawn";


export default class AsteliumMenu extends Menu {

    protected initializeView(actionItems: Map<string, Callback>): void {      
        const parentModel = APP_ENGINE_INSTANCE.getModel(this._parentSelector);  
        let template = `<div class="ast-header">ASTELIUM</div>
            <div class="ast-logo"></div>`;
        this._actionItems = actionItems;
        this._actionItems.forEach((value, key) => {
            let item = `<div class="action-item" id="action-${key.substring(0, 3)}">
                <button>${key}</button>
            </div>`;
            template += item;            
        });    
        this._HTMLTemplate = template;                   
    }

    public render(renderToSelector?: string): void {       
        APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
            .play('/menu.mp3', true);               
        if(this._HTMLTemplate === null) {                   
            this.initializeView(this.getBasicItems());                           
        } else {
            this.initializeView(this._actionItems);  
        }       
        document.querySelector(`#${this._parentSelector}`).innerHTML = '';
        super.render(renderToSelector); 
        this.registerEvents();               
    }

    private getBasicItems(): Map<string, Callback> {
        return new Map<string, Callback>([
            ['New game', () => {             
                this.initializeView(this.getNewGameItems());                                 
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
                    .playSelected(['/newgame.mp3']); 
                this.render(this._parentSelector);                    
            }],
            ['Load', () => {               
                this.getSavedGameItems().then((items) => {
                    this.initializeView(items); 
                    this.render(this._parentSelector);                                           
                })
                .then(() => {                 
                    this.initializeView(this.getInGameItems());        
                });                          
            }],
            ['Options', () => {        
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
                    .play('/options.mp3');                          
            }],
        ])
    }

    private getNewGameItems(): Map<string, Callback> {
        return new Map<string, Callback>([
            ['SinglePlayer', () => {     
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
                    .playSelected(['/singleplayer.mp3', '/location.mp3']);   
                const parentModel = APP_ENGINE_INSTANCE.getModel(this._parentSelector);                    
                this.initializeView(this.getInGameItems()); 
                this.render(this._parentSelector);                                            
                (parentModel as Layout).renderSelectedChildren(this.getGameObjectsSelectors());             
                APP_ENGINE_INSTANCE.currentPlayer.init();        
            }],
            ['Multiplayer', () => {
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
                    .playSelected(['/multiplayer.mp3', '/location.mp3']);
                const parentModel = APP_ENGINE_INSTANCE.getModel(this._parentSelector);      
                console.log('CHILDREN', parentModel._childModels);              
                this.initializeView(this.getInGameItems()); 
                this.render(this._parentSelector);                                             
                (parentModel as Layout).renderSelectedChildren(this.getGameObjectsSelectors());                        
                APP_ENGINE_INSTANCE.currentPlayer.init();                                 
            }], 
            ['Back', this.backCallback()]
        ]);
    }

    private getInGameItems(): Map<string, Callback> {
        const parentModel = APP_ENGINE_INSTANCE.getModel(this._parentSelector); 
        return new Map<string, Callback>([
            ['Save', () => {                               
                APP_ENGINE_INSTANCE.getManager<AsteliumGameStateManager>(AsteliumSelector.GAME_STATE_MANAGER_ID)
                    .save(new Date().toLocaleTimeString("en-us", 
                {
                    year: "numeric", month: "short", day: "numeric",
                    hour: "2-digit", minute: "2-digit", second: "2-digit"  
                }).replace(/\:/g, '-'), '/save');
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
                    .playSelected(['/location.mp3']);                  
                (parentModel as Layout).renderSelectedChildren(this.getGameObjectsSelectors());                 
                APP_ENGINE_INSTANCE.currentPlayer.init();        
            }],
            ['Load', () => {      
                this.getSavedGameItems().then((items) => {                  
                    this.initializeView(items);                                    
                    this.render(this._parentSelector);                                                       
                })
                .then(() => {                 
                    this.initializeView(this.getInGameItems());        
                });                      
            }], 
            ['Continue', () => {
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
                    .playSelected(['/location.mp3']);                  
                (parentModel as Layout).renderSelectedChildren(this.getGameObjectsSelectors());  
                APP_ENGINE_INSTANCE.currentPlayer.init();                        
            }]
        ]);
    }

    private async getSavedGameItems(): Promise<Map<string, Callback>> {
        const parentModel = APP_ENGINE_INSTANCE.getModel(this._parentSelector); 
        const stateManager = 
            APP_ENGINE_INSTANCE.getManager<AsteliumGameStateManager>(AsteliumSelector.GAME_STATE_MANAGER_ID);       
        let itemsMap = new Map<string, Callback>();       
        return await stateManager.showAllSaves('/showAllSaves').then((saveNames) => {    
            itemsMap.set('Back', this.backCallback());          
            saveNames.forEach((name, index) => {                     
                itemsMap.set(`${index + 1}-${name}`, () => {               
                    stateManager.load(name, '/load').then((save) => {                      
                        stateManager.currentState = save.state;                       
                        APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
                            .playSelected(['/location.mp3']);   
                        let restoredObjects: Model[] = [];                         
                        save.state.storage.players.forEach((player) => {                                                                       
                            restoredObjects.push(player);
                            APP_ENGINE_INSTANCE.updateModel(player._selector, player);
                        });   
                        save.state.storage.pawns.forEach((pawn) => {                                                         
                            restoredObjects.push(pawn);
                            APP_ENGINE_INSTANCE.updateModel(pawn._selector, pawn);
                        });  
                        (parentModel as Layout).renderSelectedChildren(restoredObjects.map(obj => obj._selector));                      
                        APP_ENGINE_INSTANCE.currentPlayer.init();           
                    }); 
                });             
            });                
            return itemsMap;   
        });   
    }

    private backCallback(): Callback {
        const parentModel = APP_ENGINE_INSTANCE.getModel(this._parentSelector); 
        return (this._actionItems === this.getInGameItems()) ? () => {
                this.initializeView(this.getInGameItems());   
                this.render(this._parentSelector);        
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AsteliumSelector.AUDIO_MANAGER_ID)
                    .playSelected(['/location.mp3']);                  
                (parentModel as Layout).renderSelectedChildren(this.getGameObjectsSelectors());                  
            } : () => {
                this.initializeView(this.getBasicItems());    
                this.render(this._parentSelector);                         
            }
    }

    private getGameObjectsSelectors(): string[] {
        const parentModel = APP_ENGINE_INSTANCE.getModel(this._parentSelector); 
        return parentModel._childModels
            .filter(child => child instanceof GameObject)
            .map(gameobject => gameobject._selector);
    }

    private registerEvents(): void {
        this._actionItems.forEach((value, key) => {            
            document.querySelector(`#action-${key.substring(0, 3)}`).addEventListener('click', value);
        });
    }
}