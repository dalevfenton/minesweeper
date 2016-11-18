import React, { Component } from 'react';
import Menu from './components/menu';
import GameBoard from './components/gameboard';
import './App.css';

class App extends Component {
  constructor ( props ){
    super(props)
    this.setBoard = this.setBoard.bind(this)
    this.openMenu = this.openMenu.bind(this)
    this.state = {
      menuActive: true,
      width: null,
      height: null,
      numMines: null,
      cells: null,
      time: null,
    }
  }

  openMenu ( ){
    this.setState({ menuActive: true });
  }

  setBoard ( config ){
    this.setState({ width: config.width, height: config.height, numMines: config.numMines, menuActive: false });
  }

  render() {
    let toRender = {};
    if(this.state.menuActive){
      toRender = ( <Menu menuActive={this.state.menuActive} setBoard={this.setBoard} /> );
    }else{
      toRender = ( <GameBoard data={this.state} openMenu={this.openMenu} /> );
    }

    return (
      <div className="App">
        {toRender}
      </div>
    );
  }
}

export default App;
