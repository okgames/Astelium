import Menu from "client/gamecore/menu";
import { Callback } from "client/gamecore/common";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import Model from "client/gamecore/model";
import Layout from "client/gamecore/layout";
import GameObject from "client/gamecore/gameobject";
import { APP_ENGINE_INSTANCE, AUDIO_MANAGER_ID, GAME_STATE_MANAGER_ID,
     PLAYER_I_ID, ADVICER_ID } from "client/data/astelium-engine";
import AsteliumAudioManager from "client/data/astelium-audiomanager";


export default class AsteliumMenu extends Menu {  

    public render(renderToselector?: string): void {      
        APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AUDIO_MANAGER_ID).play('/menu.mp3', true);       
        if(this.HTMLTemplate === Model.EMPTY_HTML_TEMPLATE) {                   
            this.initializeView(this.getBasicItems());                           
        } else {
            this.initializeView(this.actionItems);  
        }         
        this.registerEvents();   
    }

    private getBasicItems(): Map<string, Callback> {
        return new Map<string, Callback>([
            ['New game', () => {             
                this.initializeView(this.getNewGameItems());   
                this.registerEvents();
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AUDIO_MANAGER_ID).play('/newgame.mp3');                     
            }],
            ['Load', () => {               
                this.initializeView(this.getSavedGamesItems())
                this.registerEvents();
            }],
            ['Options', () => {        
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AUDIO_MANAGER_ID).play('/options.mp3');                          
            }],
        ])
    }

    private getNewGameItems(): Map<string, Callback> {
        return new Map<string, Callback>([
            ['SinglePlayer', () => {     
                const parentModel = APP_ENGINE_INSTANCE.getModel(this.parentSelector);                    
                this.initializeView(this.getInGameItems());  
                this.registerEvents(); 
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AUDIO_MANAGER_ID)
                .playSelected(['/singleplayer.mp3', '/location.mp3']);                  
                (parentModel as Layout).renderSelectedChildren([
                    PLAYER_I_ID, ADVICER_ID
                ]);  
            }],
            ['Multiplayer', () => {
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AUDIO_MANAGER_ID)
                .play('/multiplayer.mp3');              
            }], 
            ['Back', () => {              
                this.initializeView(this.getBasicItems());
                this.registerEvents();
            }]
        ]);
    }

    private getInGameItems(): Map<string, Callback> {
        const parentModel = APP_ENGINE_INSTANCE.getModel(this.parentSelector); 
        return new Map<string, Callback>([
            ['Save', () => {                               
                APP_ENGINE_INSTANCE.getManager<AsteliumGameStateManager>(GAME_STATE_MANAGER_ID)
                .save(new Date().toLocaleTimeString("en-us", 
                {
                    year: "numeric", month: "short", day: "numeric",
                    hour: "2-digit", minute: "2-digit", second: "2-digit"  
                }).replace(/\:/g, '-'), '/save');
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AUDIO_MANAGER_ID)
                .playSelected(['/location.mp3']);                  
                (parentModel as Layout).renderSelectedChildren([
                    PLAYER_I_ID, ADVICER_ID
                ]);   
            }],
            ['Load', () => {      
                this.initializeView(this.getSavedGamesItems());
                this.registerEvents();
            }], 
            ['Continue', () => {
                APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AUDIO_MANAGER_ID)
                .playSelected(['/location.mp3']);                  
                (parentModel as Layout).renderSelectedChildren([
                    PLAYER_I_ID, ADVICER_ID
                ]);                  
            }]
        ]);
    }

    private getSavedGamesItems(): Map<string, Callback> {
        const parentModel = APP_ENGINE_INSTANCE.getModel(this.parentSelector); 
        const stateManager = APP_ENGINE_INSTANCE.getManager<AsteliumGameStateManager>(GAME_STATE_MANAGER_ID);
        let itemsMap = new Map<string, Callback>(); 
        stateManager.showAllSaves('/showAllSaves').then((saveNames) => {            
            saveNames.forEach((name, index) => {
                itemsMap.set(`${index + 1}-${name}`, () => {               
                    stateManager.load(name, '/load').then(save => console.log('Save: ', save));
                })
            });      
        });        
        const backCallback = (this.actionItems === this.getInGameItems())
        ? () => {
            this.initializeView(this.getInGameItems());    
            APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AUDIO_MANAGER_ID)
            .playSelected(['/location.mp3']);                  
            (parentModel as Layout).renderSelectedChildren([
                PLAYER_I_ID, ADVICER_ID
            ]);     
        }
        : () => {
            this.initializeView(this.getBasicItems());         
        }
        itemsMap.set('Back', backCallback);       
        return itemsMap;
    }

    private hideView() {
        const parentModel = APP_ENGINE_INSTANCE.getModel(this.parentSelector); 
        APP_ENGINE_INSTANCE.getManager<AsteliumAudioManager>(AUDIO_MANAGER_ID)
        .playSelected(['/singleplayer.mp3', '/location.mp3']);                  
        (parentModel as Layout).renderSelectedChildren([
            PLAYER_I_ID, ADVICER_ID
        ]);   
        this.initializeView(this.getInGameItems());   
        this.registerEvents();
    }

    protected initializeView(actionItems: Map<string, Callback>): void {      
        const parentModel = APP_ENGINE_INSTANCE.getModel(this.parentSelector);  
        let template = `<div id="${this.selector}">
            <div class="ast-header">ASTELIUM</div>
            <div class="ast-logo">
        </div>`;
        this.actionItems = actionItems;
        this.actionItems.forEach((value, key) => {
            let item = `<div class="action-item" id="action-${key.substring(0, 3)}">
                <button>${key}</button>
            </div>`;
            template += item;            
        });      
        template += '</div>';     
        this.HTMLTemplate = template;    
        document.querySelector(`#${parentModel.selector}`).innerHTML = this.HTMLTemplate;                 
    }

    protected registerEvents(): void {
        this.actionItems.forEach((value, key) => {            
            document.querySelector(`#action-${key.substring(0, 3)}`).addEventListener('click', value);
        });
    }
}