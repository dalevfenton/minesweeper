import React, { Component } from 'react';
import '../App.css';
import { arrayShuffle } from '../utility';
import Cell from './cell';

const cellRefs = [
  function(x, width){ return x-width-1},
  function(x, width){ return x-width},
  function(x, width){ return x-width+1},
  function(x, width){ return x-1},
  function(x, width){ return x+1},
  function(x, width){ return x+width-1},
  function(x, width){ return x+width},
  function(x, width){ return x+width+1},
];

class GameBoard extends Component {
  constructor (props){
    super(props)
    this.showCell = this.showCell.bind(this)
    this.clearCells = this.clearCells.bind(this)
    this.isWin = this.isWin.bind(this)
    this.isLoss = this.isLoss.bind(this)
    this.getCells = this.getCells.bind(this)
    this.state = {
      cells : [],
      status: 'active',
    }
  }

  isWin (cellArray) {
    let numLeft = cellArray.reduce(function(accum, cell, index){
      if(cell.status === "hidden"){
        return [...accum, index];
      }else{
        return accum;
      }
    }, []);

    if(numLeft.length===this.props.data.numMines ? true : false){
      this.setState({status: 'win'});
      return true;
    }else{
      return false;
    }
  }

  isLoss ( cellId ){
    let cells = this.state.cells;
    if(cells[cellId].isMine){
      //set game to loss and show all cells
      cells.forEach(function(cell){
        cell.status = "show";
      })
      this.setState({status: 'loss', cells: cells});
      return true;
    }else{
      return false;
    }
  }

  showCell ( cellId ){
    if(this.state.status==="active"){
      let cells = this.state.cells;
      cells[cellId].status = "show";
      if( !( this.isLoss(cellId) || this.isWin(cells) ) ){
        console.log(cells[cellId]);
        if(cells[cellId].mineCount === 0){
          //clear all surrounding cells (recursively)
          console.log('clearCells called');
          cells = this.clearCells( cellId, cells);
        }
        this.setState({cells: cells});
      }
    }
  }

  clearCells ( cellId, cellArray ){
    let clearCells = this.getCells(cellId);
    clearCells.forEach(function(subCellId) {
      cellArray[subCellId].status = "show";
      if( cellArray[subCellId].mineCount === 0 && cellArray[subCellId].status === "hidden" ){
        cellArray = this.clearCells(subCellId, cellArray);
      }
    }.bind(this));
    return cellArray;
  }

  getCells ( cellId ){
    let cellsAround = [];
    const width = this.props.data.width;
    const height = this.props.data.height;

    cellRefs.forEach(function(func, funcIndex){
      //check if we are a cell on the left or right edge of the board
      const leftCol = cellId%width === 0 ? true : false;
      const rightCol = (cellId+1)%width === 0 ? true : false;
      //check if the current function we're on should be excluded if we're
      //on that edge (i.e. a cell on the left of the left edge should be)
      const leftExclude = [0,3,5].indexOf(funcIndex) > -1 ? true : false;
      const rightExclude = [2,4,7].indexOf(funcIndex) > -1 ? true : false;
      //if we're on the edge of the board, don't look for mines
      //don't check this cell if it should be excluded
      if( (leftCol && leftExclude) || (rightCol && rightExclude) ){
        return;
      }
      //get the index of the the cell around the one we're checking
      const value = func(cellId, width);
      //check that the index is a valid cell
      //invalid cells occur when the cell we're checking is
      //along the edge of the game board
      if( value >= 0 && value <= (width*height)-1){
        cellsAround.push(value);
      }
    });
    return cellsAround;
  }

  countMines ( cellArray ){
    // _______
    // |1|2|3|   count the number of mines around a given cell
    // |4|X|5|   we are using a flat array to store our cells but knowing the
    // |6|7|8|   width and height of the matrix we can find the appropriate offsets
    // ‾‾‾‾‾‾‾
    // cell 1 = index - width - 1
    // cell 2 = index - width
    // cell 3 = index - width + 1
    // cell 4 = index - 1
    // cell 5 = index + 1
    // cell 6 = index + width - 1
    // cell 7 = index + width
    // cell 8 = index + width + 1

    cellArray.forEach(function(cell, index, array){
      let mineCount = 0;
      let cellsAround = this.getCells(index);
      cellsAround.forEach(function(cellId){
        if(array[cellId].isMine){
          mineCount += 1;
        }
      });
      cell.mineCount = mineCount;
    }.bind(this));
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
      return (<Cell data={cell} key={index} index={index} showCell={this.showCell} />);
    }.bind(this));
    let style = {
      width: (30*this.props.data.width) + 'px',
    };
    let status = this.state.status==="active"?"Active":this.state.status.toUpperCase();
    return (
      <div className="GameBoard" style={style}>
        <div className="statusMessage">{status}</div>
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
