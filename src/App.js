import React, { Component } from "react";
import Menu from "./components/menu";
import GameBoard from "./components/gameboard";
import "./App.css";
import gameModes from "./config/game-modes";
import menus from "./config/menus";

class App extends Component {
  constructor(props) {
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
      ended: false,
      game: Date.now(),
      interval: null,
      numMines: 8,
      started: false,
      status: 'active',
      timer: null,
    };
  }

  toggleMenu(type) {
    if (this.state.activeMenu === type) {
      this.setState({ activeMenu: false });
    } else {
      this.setState({ activeMenu: type });
    }
  }

  menuInput(action) {
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
        this.menuActive = false;
        break;
      case "open-about":
        break;
      default:
        console.log("nothing setup for this");
    }
    this.setState({ activeMenu: false });
  }

  setGame(action) {
    const config = gameModes[action];
    const game = Date.now();

    this.setState({
      width: config.width,
      height: config.height,
      numMines: config.numMines,
      current: config.title,
      game: game
    });
  }

  setBoard(config) {
    this.setState({
      width: config.width,
      height: config.height,
      numMines: config.numMines,
      menuActive: false
    });
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
              items={menus.gameMenu}
              toggle={this.toggleMenu}
              active={this.state.activeMenu}
              action={this.menuInput}
            />
            <Menu
              title="help"
              items={menus.helpMenu}
              toggle={this.toggleMenu}
              active={this.state.activeMenu}
              action={this.menuInput}
            />
          </div>
          <GameBoard
            data={this.state}
            openMenu={this.openMenu}
            key={this.game}
          />
        </div>
      </div>
    );
  }
}

export default App;
