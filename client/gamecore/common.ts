import GameObject from "client/gamecore/gameobject";
import Engine from "client/gamecore/engine";

export type Callback = (...parameters) => void;

export type GameObjectPosition = {
    x: number,
    y: number,
    angle?: number
}

export type GameState = {
    gameObjects: GameObject[],
    dom: string
}

export type SavedGame = {
    date: string,
    name: string,
    state: GameState
}

