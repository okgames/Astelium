import Engine from "client/gamecore/engine";
import Player from "client/gamecore/player";
import Pawn from "client/gamecore/pawn";

export type Callback = (...parameters) => void;

export type GameObjectPosition = {
    x: number
    y: number
    angle?: number
}

export type GameState = {
    storage: GameObjectStorage
    dom: string
}

export type GameObjectStorage = {
     players: Player[]
     pawns: Pawn[] 
}

export type SavedGame = {
    date: string
    name: string
    state: GameState
}

