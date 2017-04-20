import React, { Component } from 'react';
import Menu from './components/menu';
import GameBoard from './components/gameboard';
import './App.css';

const gameMenu = [
  {label: "New", hotkey: "F2", action: "new-game", keybind: "N"},
  {label: "Beginner", action: "set-beginner", divider: true, keybind: "B"},
  {label: "Intermediate", action: "set-intermediate", keybind: "I"},
  {label: "Expert", action: "set-expert", keybind: "E"},
  {label: "Sound", action: "toggle-sound", divider: true, keybind: "S"},
  {label: "Marks", action: "toggle-marks", keybind: "M"},
  {label: "Preferences", hotkey: "F3", action: "open-preferences", divider: true, keybind: "P"},
  {label: "Exit", action: "close", divider: true, keybind: "E"}
]
const helpMenu = [
  {label: "Index", hotkey: "F1", action: "", keybind: "I"},
  {label: "Keyboard", action: "", keybind: "K"},
  {label: "Using Help", action: "", keybind: "H"},
  {label: "About", action: "open-about", divider: true, keybind: "A"}
]
class App extends Component {
  constructor ( props ){
    super(props)
    this.setBoard = this.setBoard.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.state = {
      activeMenu: false,
      width: 10,
      height: 10,
      numMines: 8,
    }
  }

  toggleMenu ( type ){
    if(this.state.activeMenu === type){
      this.setState({activeMenu: false});
    }else{
      this.setState({activeMenu: type});
    }
  }

  setBoard ( config ){
    this.setState({ width: config.width, height: config.height, numMines: config.numMines, menuActive: false });
  }

  render() {
    // let toRender = {};
    // if(this.state.menuActive){
    //   toRender = ( <Menu menuActive={this.state.menuActive} setBoard={this.setBoard} /> );
    // }else{
    //   toRender = (  );
    // }

    return (
      <div className="App">
        <div className="outerBorder">
          <div className="AppBar">
            <div className="AppBarName AppBarItem"><span className="AppBarTitleText">Minesweeper</span></div>
            <div className="AppBarButtons AppBarItem">
              <div className="MinimizeButton AppBarButton"></div>
              <div className="MaximizeButton AppBarButton"></div>
              <div className="CloseButton AppBarButton"></div>
            </div>
          </div>
          <div className="MenuBar">
            <Menu title="game" items={gameMenu} toggle={this.toggleMenu} active={this.state.activeMenu} />
            <Menu title="help" items={helpMenu} toggle={this.toggleMenu} active={this.state.activeMenu} />
          </div>
          <GameBoard data={this.state} openMenu={this.openMenu} />
        </div>
      </div>
    );
  }
}

export default App;
