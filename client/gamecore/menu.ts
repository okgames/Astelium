import Model from "client/gamecore/model";
import { Callback } from "client/gamecore/common";
import AudioManager from "client/gamecore/audio-manager";

export default abstract class Menu extends Model {
    
    private _actionItems: Map<string, Callback>;

    constructor(HTMLTemplate?: string, audioManager?: AudioManager,
         actionItems?: Map<string, Callback>) {
        super(HTMLTemplate, audioManager);
        this._actionItems = actionItems || new Map([
            ["Item1", () => {
                console.log("Item 1 was chosen")
            }],
            ["Item2", () => {
                console.log("Item 2 was chosen")
            }],
            ["Item3", () => {
                console.log("Item 3 was chosen")
            }]
        ]);
    }

    set actionItems(actionItems: Map<string, Callback>) {
        this._actionItems = actionItems;
    }

    get actionItems() {
        return this._actionItems;
    }

    protected abstract initializeView(menuSelector: string, actionItems: Map<string, Callback>): void;

    protected abstract registerEvents(actionItems: Map<string, Callback>): void;
}