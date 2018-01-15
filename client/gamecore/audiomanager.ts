import { isUndefined } from "util";

export default class AudioManager {

    private _generalVolume: number;
    private _audioMap: Map<string, HTMLAudioElement>;

    constructor(audioMap?: Map<string, HTMLAudioElement>) {
        this._audioMap = audioMap || new Map<string, HTMLAudioElement>([]);
    }
    
    get generalVolume(): number {
        return this._generalVolume;
    }

    set generalVolume(generalVolume: number) {
        this._generalVolume = generalVolume;
    }

    get audioMap(): Map<string, HTMLAudioElement> {
        return this._audioMap;
    }

    set audioMap(audioMap: Map<string, HTMLAudioElement>) {
        this._audioMap = audioMap;
    }

    public load(trackListUrls: string[]): void {
        trackListUrls.forEach((url) => {
            this.audioMap.set(url, new Audio(url));
        })
    }

    public play(srcUrl: string, loop?: boolean, volume?: number): void {
        const audio = this.audioMap.get(srcUrl);       
        audio.loop = loop || false;
        audio.volume = volume || this._generalVolume || 1.0;    
        audio.play();       
    }    

    public playSelected(srcUrls: string[], loop?: boolean, volume?: number) {       
        this.audioMap.forEach((aud, url) => {
            console.log(srcUrls, url)
            if(srcUrls.includes(url)) {     
                aud.loop = loop || false;      
                aud.volume = volume || this._generalVolume || 1.0;    
                aud.play();
            } else {               
                aud.pause();
            }
        })
    }

    public stopAll(): void {
        this.audioMap.forEach((aud) => {
            if(aud.played) {
                aud.pause();
            }
        })
    }

    public stopAllExceptSelected(srcUrls: string[]): void {
        this.audioMap.forEach((aud, url) => {
            if(srcUrls.includes(url) && aud.played) {
                aud.pause();
            }
        })
    }
}