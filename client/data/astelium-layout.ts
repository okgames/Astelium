import Layout from "client/gamecore/layout";
import AudioManager from "client/gamecore/audiomanager";
import AsteliumPlayer from "client/data/astelium-player";
import Advicer from "client/data/astelium-advicer";
import GameStateManager from "client/gamecore/gamestatemanager";
import AsteliumMenu from "client/data/astelium-menu";
import { AsteliumSelector } from "client/data/astelium-engine";
import AsteliumAudioManager from "client/data/astelium-audiomanager";

export default class AsteliumGameLayout extends Layout {

    constructor(selector?: string, HTMLTemplate?: string, autoRendering?: boolean) {
        super(selector, HTMLTemplate, autoRendering);           
    }    

    public render(renderToSelector?: string, audioTrack?: string): void {
        super.render(renderToSelector);  
    }
}