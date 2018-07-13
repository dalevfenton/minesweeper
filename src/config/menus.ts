import { GameModePresets } from './game-modes'

export const gameMenu : IMenuItem[] = [
    { label: "New", hotkey: "F2", action: "new-game", keybind: "N" },
    { label: "Beginner", action: "set-beginner", divider: true, keybind: "B" },
    { label: "Intermediate", action: "set-intermediate", keybind: "I" },
    { label: "Expert", action: "set-expert", keybind: "E" },
    { label: "Sound", action: "toggle-sound", divider: true, keybind: "S" },
    { label: "Marks", action: "toggle-marks", keybind: "M" },
    {
        label: "Preferences",
        hotkey: "F3",
        action: "open-preferences",
        divider: true,
        keybind: "P"
    },
    { label: "Exit", action: "close", divider: true, keybind: "E" },
];

export const helpMenu : IMenuItem[] = [
    { label: "Index", hotkey: "F1", action: "index", keybind: "I" },
    { label: "Keyboard", action: "keyboard", keybind: "K" },
    { label: "Using Help", action: "using-help", keybind: "H" },
    { label: "About", action: "open-about", divider: true, keybind: "A" },
];

export const menus: {[K in GameMenus]: IMenuItem[]} = {
    'game': gameMenu,
    'help': helpMenu,
};

export type GameMenus = 'game'|'help'

export type GameActions = 'toggle-sound'|'toggle-marks'|'new-game'|'open-preferences'|'close'|'index'|'keyboard'|'using-help'|'open-about'

export type AllMenuActions = GameModePresets | GameActions

export interface IMenuItem {
    label: string
    hotkey?: string
    action: AllMenuActions
    keybind?: string
    divider?: boolean
}