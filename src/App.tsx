import "./App.css";
import * as React from "react";
import { GameBoard, Menu, GameBoardProps } from './components'

import { gameModes, GameModePresets, GameMode } from "./config/game-modes";
import { menus, AllMenuActions, GameMenus } from "./config/menus";

export interface AppProps {
  [key: string] : any
}

export interface AppState extends GameBoardState {
  activeMenu: string|boolean
  current: string
  game: number
  interval: NodeJS.Timer|null
  status: string
}

export interface GameBoardState {
  cells: ICell[]
  started: number
  ended: number
  timer: number
  debug: boolean
  numMines: number
  boardHeight: number
  boardWidth: number
}


export interface ICell {
  isMine: boolean
  id: number
  mineCount: number
  status: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props : any) {
    super(props);
    this.setBoard = this.setBoard.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.menuInput = this.menuInput.bind(this);
    this.state = {
      activeMenu: false,
      boardHeight: 10,
      boardWidth: 10,
      cells: [],
      current: "Beginner",
      debug: false,
      ended: 0,
      game: Date.now(),
      interval: null,
      numMines: 8,
      started: 0,
      status: 'active',
      timer: 0,
    };
  }

  toggleMenu(type: GameMenus) {
    if (this.state.activeMenu === type) {
      this.setState({ activeMenu: false });
    } else {
      this.setState({ activeMenu: type });
    }
  }

  menuInput(action: AllMenuActions) {
    console.log(action);
    switch (action) {
      case "set-beginner":
      case "set-intermediate":
      case "set-expert":
        this.setGame(action);
        break;
      case "toggle-sound":
        break;
      case "toggle-marks":
        break;
      case "new-game":
        this.setState({ game: Date.now() });
        break;
      case "open-preferences":
        break;
      case "close":
        // not sure if we need to do something here, menu closes on any action
        break;
      case "open-about":
        break;
      default:
        console.log("nothing setup for this");
    }
    this.setState({ activeMenu: false });
  }

  setGame(action: GameModePresets) {
    const config = gameModes[action];
    const game = Date.now();

    this.setState({
      boardWidth: config.width,
      boardHeight: config.height,
      numMines: config.numMines,
      current: config.title,
      game: game
    });
  }

  setBoard(config: GameMode) {
    this.setState({
      boardWidth: config.width,
      boardHeight: config.height,
      numMines: config.numMines,
      activeMenu: false
    });
  }

  getGameBoardProps() : GameBoardProps {
    const { cells, started, ended, timer, debug, numMines, boardHeight, boardWidth } = this.state
    return {
      cells,
      started,
      ended,
      timer,
      debug,
      numMines,
      boardHeight,
      boardWidth,
      resetGame: () => {}
    }
  }

  render() {
    return (
      <div className="App">
        <div className="outerBorder">
          <div className="AppBar">
            <div className="AppBarName AppBarItem">
              <span className="AppBarTitleText">Minesweeper</span>
            </div>
            <div className="AppBarButtons AppBarItem">
              <div className="MinimizeButton AppBarButton" />
              <div className="MaximizeButton AppBarButton" />
              <div className="CloseButton AppBarButton" />
            </div>
          </div>
          <div className="MenuBar">
            <Menu
              title="game"
              items={menus.game}
              toggle={this.toggleMenu}
              active={this.state.activeMenu}
              action={this.menuInput}
            />
            <Menu
              title="help"
              items={menus.help}
              toggle={this.toggleMenu}
              active={this.state.activeMenu}
              action={this.menuInput}
            />
          </div>
          <GameBoard
            { ...this.getGameBoardProps() }
          />
        </div>
      </div>
    );
  }
}

export default App;
