export type Callback = (...parameters) => void;

export type Position = {
    x: number,
    y: number,
    angle?: number
}

export type SavedGame = {
    date: string,
    name: string,
    state: string
}