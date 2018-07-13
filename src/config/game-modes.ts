export const gameModes : GameModesConfig = {
    "set-beginner": { 
        title: "Beginner",
        height: 8,
        width: 8,
        numMines: 10 ,
    },
    "set-intermediate": {
      title: "Intermediate",
      height: 16,
      width: 16,
      numMines: 40,
    },
    "set-expert": {
        title: "Expert",
        height: 16,
        width: 30,
        numMines: 99 ,
    },
  };

export type GameModesConfig = {
   [K in GameModePresets]: GameMode
}

export type GameModePresets = 'set-beginner'|'set-intermediate'|'set-expert'

export interface GameMode {
    title: string
    height: number
    width: number
    numMines: number
}
