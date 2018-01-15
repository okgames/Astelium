import Menu from "client/gamecore/menu";
import { Callback } from "client/gamecore/common";
import AsteliumGameStateManager from "client/data/astelium-gamestatemanager";
import Model from "client/gamecore/model";
import Layout from "client/gamecore/layout";

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
                this.initializeView(this.getInGameItems());  
                this.registerEvents(); 
                this.audioManager.playSelected(['/singleplayer.mp3', '/location.mp3']);                  
                (this.parentModel as Layout).renderSelectedChildren([
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
        return new Map<string, Callback>([
            ['Save', () => {                
                this.parentModel.stateManager.save(new Date().toString(), '/save')
            }],
            ['Load', () => {
                this.parentModel.stateManager.load(new Date().toString(), '/load')
            }], 
            ['Continue', () => {
                this.audioManager.playSelected(['/location.mp3']);                  
                (this.parentModel as Layout).renderSelectedChildren([
                    'ast-player', 'ast-advicer'
                ]);                  
            }]
        ]);
    }

    private getSavedGamesItems(): Map<string, Callback> {
        const stateManager = this.parentModel.stateManager;
        let itemsMap = new Map<string, Callback>();
        stateManager.savedGames.forEach((saved) => {
            itemsMap.set(`${saved.name} ---- ${saved.date}`, () => {
                stateManager.load(saved.name, '/load')
            })
        });      
        itemsMap.set('Back', () => {              
            this.initializeView(this.actionItems);
            this.registerEvents();
        });
        return itemsMap;
    }

    private hideView() {
        this.audioManager.playSelected(['/singleplayer.mp3', '/location.mp3']);                  
        (this.parentModel as Layout).renderSelectedChildren([
            'ast-player', 'ast-advicer'
        ]);   
        this.initializeView(this.getInGameItems());   
        this.registerEvents();
    }

    protected initializeView(actionItems: Map<string, Callback>): void {       
        let template = '<div id="${this.selector}"><div class="ast-header">ASTELIUM</div><div class="ast-logo"></div>';
        this.actionItems = actionItems;
        this.actionItems.forEach((value, key) => {
            let item = `<div class="action-item" id="action-${key.substring(0, 3)}">
                <button>${key}</button>
            </div>`;
            template += item;            
        });      
        template += '</div>'
        // document.querySelector(`#${this.selector}`).innerHTML = template;     
        // this.HTMLTemplate = document.querySelector(`#${this.selector}`).outerHTML; 
        this.HTMLTemplate = template;    
        document.querySelector(`#${this.parentModel.selector}`).innerHTML = this.HTMLTemplate;     
    }

    protected registerEvents(): void {
        this.actionItems.forEach((value, key) => {            
            document.querySelector(`#action-${key.substring(0, 3)}`).addEventListener('click', value);
        });
    }
}