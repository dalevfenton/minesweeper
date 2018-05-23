export const gameMenu = [
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

export const helpMenu = [
    { label: "Index", hotkey: "F1", action: "", keybind: "I" },
    { label: "Keyboard", action: "", keybind: "K" },
    { label: "Using Help", action: "", keybind: "H" },
    { label: "About", action: "open-about", divider: true, keybind: "A" },
];

export default {
    gameMenu,
    helpMenu,
};