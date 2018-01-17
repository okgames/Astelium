import Menu from "client/gamecore/menu";
import { Callback } from "client/gamecore/common";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import Model from "client/gamecore/model";
import Layout from "client/gamecore/layout";
import GameObject from "client/gamecore/gameobject";
import { APP_ENGINE_INSTANCE } from "client/data/astelium-engine";


export default class AsteliumMenu extends Menu {  

    public render(renderToselector?: string): void {      
        this.audioManager.play('/menu.mp3', true);       
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
                this.audioManager.play('/newgame.mp3');                     
            }],
            ['Load', () => {               
                this.initializeView(this.getSavedGamesItems())
                this.registerEvents();
            }],
            ['Options', () => {        
                this.audioManager.play('/options.mp3');                          
            }],
        ])
    }

    private getNewGameItems(): Map<string, Callback> {
        return new Map<string, Callback>([
            ['SinglePlayer', () => {     
                const parentModel = APP_ENGINE_INSTANCE.getModel(this.parentSelector);                    
                this.initializeView(this.getInGameItems());  
                this.registerEvents(); 
                this.audioManager.playSelected(['/singleplayer.mp3', '/location.mp3']);                  
                (parentModel as Layout).renderSelectedChildren([
                    'ast-player', 'ast-advicer'
                ]);             
            }],
            ['Multiplayer', () => {
                this.audioManager.play('/multiplayer.mp3');              
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
                (parentModel as Layout).stateManager.save(new Date().toLocaleTimeString("en-us", 
                {
                    year: "numeric", month: "short", day: "numeric",
                    hour: "2-digit", minute: "2-digit", second: "2-digit"  
                }).replace(/\:/g, '-'), '/save');
                this.audioManager.playSelected(['/location.mp3']);                  
                (parentModel as Layout).renderSelectedChildren([
                    'ast-player', 'ast-advicer'
                ]);   
            }],
            ['Load', () => {      
                this.initializeView(this.getSavedGamesItems());
                this.registerEvents();
            }], 
            ['Continue', () => {
                this.audioManager.playSelected(['/location.mp3']);                  
                (parentModel as Layout).renderSelectedChildren([
                    'ast-player', 'ast-advicer'
                ]);                  
            }]
        ]);
    }

    private getSavedGamesItems(): Map<string, Callback> {
        const parentModel = APP_ENGINE_INSTANCE.getModel(this.parentSelector); 
        const stateManager = (parentModel as Layout).stateManager;
        let itemsMap = new Map<string, Callback>();        
        stateManager.savedGames.forEach((saved, index) => {
            itemsMap.set(`${index + 1}-${saved.name}`, () => {               
                stateManager.load(saved.name, '/load')
            })
        });      
        itemsMap.set('Back', () => {          
            this.initializeView(this.getInGameItems());    
            this.audioManager.playSelected(['/location.mp3']);                  
            (parentModel as Layout).renderSelectedChildren([
                'ast-player', 'ast-advicer'
            ]);          
        });
        console.log('SavedGames', itemsMap);
        return itemsMap;
    }

    private hideView() {
        const parentModel = APP_ENGINE_INSTANCE.getModel(this.parentSelector); 
        this.audioManager.playSelected(['/singleplayer.mp3', '/location.mp3']);                  
        (parentModel as Layout).renderSelectedChildren([
            'ast-player', 'ast-advicer'
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