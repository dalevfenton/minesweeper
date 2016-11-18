import React, { Component } from 'react';
import '../App.css';
import { arrayShuffle } from '../utility';

class Cell extends Component {
  render(){
    let className = "GameBoardCell";

    return (
      <div className={className}>
        {this.props.data.isMine ? 'X' : this.props.data.mineCount}
      </div>
    )
  }
}

class GameBoard extends Component {
  constructor (props){
    super(props)
    this.state = {
      cells : []
    }
  }

  countMines ( cellArray ){
    // _______
    // |1|2|3|
    // |4|X|5|
    // |6|7|8|
    // ‾‾‾‾‾‾‾
    // count the number of mines around a given cell
    // we are using a flat array to store our cells but knowing the
    // width and height of the matrix we can find the appropriate offsets
    // cell 1 = index - width - 1
    // cell 2 = index - width
    // cell 3 = index - width + 1
    // cell 4 = index - 1
    // cell 5 = index + 1
    // cell 6 = index + width - 1
    // cell 7 = index + width
    // cell 8 = index _ width + 1
    const width = this.props.data.width;
    const height = this.props.data.height;
    const functions = [
      function(x){ return x-width-1},
      function(x){ return x-width},
      function(x){ return x-width+1},
      function(x){ return x-1},
      function(x){ return x+1},
      function(x){ return x+width-1},
      function(x){ return x+width-1},
      function(x){ return x+width-1},
    ]

    cellArray.forEach(function(cell, index, array){
      let mineCount = 0;
      functions.forEach(function(func){
        const value = func(index);
        if( value >= 0 && value <= (width*height)-1){
          console.log(array[value]);
          if(array[value].isMine){
            mineCount += 1;
          }
        }
      });
      cell.mineCount = mineCount;
    });
    return cellArray;
  }

  componentWillMount(){
    const length = this.props.data.width * this.props.data.height;
    let cells = [];
    for(let i = 0; i < length; i++){
      let isMine = i<this.props.data.numMines ? true : false;
      cells.push({isMine: isMine, status: 'hidden'});
    }
    cells = arrayShuffle(cells);
    cells = this.countMines(cells);
    this.setState({ cells: cells });
  }

  render(){
    let cells = this.state.cells.map(function(cell, index){
      return (<Cell data={cell} key={index} index={index} />);
    }.bind(this));
    let style = {
      width: (30*this.props.data.width) + 'px',
    };
    return (
      <div className="GameBoard" style={style}>
        <div>game board goes here</div>
        <div>width - {this.props.data.width}</div>
        <div>height - {this.props.data.height}</div>
        <div>numMines - {this.props.data.numMines}</div>
        {cells}
        <button onClick={this.props.openMenu}>Open Menu</button>
      </div>
    );
  }
}

export default GameBoard;