import React, { Component } from "react";
import "../App.css";
import { shuffleArray } from "../utility";
import Cell from "./cell";
import Counter from "./counter";
import FaceButton from "./facebutton";

const cellRefs = [
  function(x, width) {
    return x - width - 1;
  },
  function(x, width) {
    return x - width;
  },
  function(x, width) {
    return x - width + 1;
  },
  function(x, width) {
    return x - 1;
  },
  function(x, width) {
    return x + 1;
  },
  function(x, width) {
    return x + width - 1;
  },
  function(x, width) {
    return x + width;
  },
  function(x, width) {
    return x + width + 1;
  }
];

class GameBoard extends Component {
  constructor (props){
    super(props)
    this.isWin = this.isWin.bind(this)
    this.isLoss = this.isLoss.bind(this)
    this.setGuess = this.setGuess.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.showCell = this.showCell.bind(this)
    this.flagCell = this.flagCell.bind(this)
    this.doubleClickCell = this.doubleClickCell.bind(this)
    this.clearCell = this.clearCell.bind(this)
    this.clearCells = this.clearCells.bind(this)
    this.getCells = this.getCells.bind(this)
    this.countMines = this.countMines.bind(this)
    this.startAtZero = this.startAtZero.bind(this)
    this.setup = this.setup.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
    this.state = {
      cells: [],
      status: "active",
      started: false,
      ended: false,
      timer: null,
      interval: null,
      debug: true
    };
  }

  isWin(cellArray) {
    let numLeft = cellArray.reduce(function(accum, cell, index) {
      if (cell.status !== "show") {
        return [...accum, index];
      } else {
        return accum;
      }
    }, []);

    if (numLeft.length === this.props.data.numMines ? true : false) {
      this.endGame("win", null);
      return true;
    } else {
      return false;
    }
  }

  isLoss(cellId) {
    let cells = this.state.cells;
    if (cells[cellId].isMine) {
      //set game to loss
      cells[cellId].status = "loss";
      this.endGame("loss", cells);
      return true;
    } else {
      return false;
    }
  }

  handleReset( e ){
    if(this.state.interval){
      clearInterval(this.state.interval);
    }
    let cells = this.setup();
    this.setState({
      cells: cells,
      status: "active",
      started: false,
      timer: null,
      interval: null
    });
  }

  showCell(cellId) {
    //if this is the first cell clicked, we need to make sure we start
    //on a zero mine cell
    this.setState({ status: "active" });
    if (!this.state.started) {
      this.startAtZero(cellId);
      return;
    }

    let cells = this.state.cells;
    cells = this.clearCell(cells, cellId);
    this.setState({ cells: cells });
  }

  flagCell(cellId) {
    //flag the cell
    if (this.state.status === "active" || this.state.status === "guess") {
      let cells = this.state.cells;
      if (cells[cellId].status === "hidden") {
        cells[cellId].status = "flagged";
      } else {
        cells[cellId].status = "hidden";
      }
      this.setState({ cells: cells });
    }
  }

  doubleClickCell(cellId) {
    //clears all cells around the double clicked cell, if enough
    //surrounding cells have been flagged
    //can cause a win or loss
    this.setState({ status: "active" });
    let cellsAround = this.getCells(cellId);
    let cells = this.state.cells;
    let flaggedCells = cellsAround.reduce((accum, aroundCellId, index) => {
      if (cells[aroundCellId].status === "flagged") {
        accum.push(aroundCellId);
      }
      return accum;
    }, []);
    if (flaggedCells.length === cells[cellId].mineCount) {
      cellsAround.forEach(aroundId => {
        //set each to 'show' and check for loss
        if (cells[aroundId].status === "hidden") {
          cells = this.clearCell(cells, aroundId);
        }
      });
    }
    this.setState({ cells: cells });
  }

  clearCell(cellArray, cellId) {
    //clear the cell
    if (this.state.status === "active" || this.state.status === "guess") {
      cellArray[cellId].status = "show";
      if (!(this.isLoss(cellId) || this.isWin(cellArray))) {
        if (cellArray[cellId].mineCount === 0) {
          //clear all surrounding cells (recursively)
          cellArray = this.clearCells(cellId, cellArray, []);
        }
      }
    }
    return cellArray;
  }

  clearCells(cellId, cellArray, checked) {
    let accum = checked || [];
    let clearCells = this.getCells(cellId);
    clearCells.forEach(subCellId => {
        cellArray[subCellId].status = "show";
        if (
          cellArray[subCellId].mineCount === 0 &&
          accum.indexOf(subCellId) === -1
        ) {
          accum.push(subCellId);
          cellArray = this.clearCells(subCellId, cellArray, accum);
        }
      }
    );
    return cellArray;
  }

  //returns an array of indices representing the cells surrounding
  //the cell at cellId
  getCells(cellId) {
    let cellsAround = [];
    const width = this.props.data.width;
    const height = this.props.data.height;

    cellRefs.forEach((func, funcIndex) => {
      //check if we are a cell on the left or right edge of the board
      const leftCol = cellId % width === 0 ? true : false;
      const rightCol = (cellId + 1) % width === 0 ? true : false;
      //check if the current function we're on should be excluded if we're
      //on that edge (i.e. a cell on the left of the left edge should be)
      const leftExclude = [0, 3, 5].indexOf(funcIndex) > -1 ? true : false;
      const rightExclude = [2, 4, 7].indexOf(funcIndex) > -1 ? true : false;
      //if we're on the edge of the board, don't look for mines
      //don't check this cell if it should be excluded
      if ((leftCol && leftExclude) || (rightCol && rightExclude)) {
        return;
      }
      //get the index of the the cell around the one we're checking
      const value = func(cellId, width);
      //check that the index is a valid cell
      //invalid cells occur when the cell we're checking is
      //along the edge of the game board
      if (value >= 0 && value <= width * height - 1) {
        cellsAround.push(value);
      }
    });
    return cellsAround;
  }

  countMines(cellArray) {
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

    cellArray.forEach(
      function(cell, index, array) {
        let mineCount = 0;
        //returns the valid cells around this one in the matrix
        //( filters out non-proximate cells on edges & corners )
        let cellsAround = this.getCells(index);
        cellsAround.forEach(function(cellId) {
          if (array[cellId].isMine) {
            mineCount += 1;
          }
        });
        cell.mineCount = mineCount;
      }.bind(this)
    );
    return cellArray;
  }

  startAtZero( cellId ){
      //get current cells
      let cells = this.state.cells;
      //get cells to clear out
      // let cellsAround = this.getCells(cellId);
      // cellsAround.push(cellId);
      let cellsAround = [cellId];
      //get list of current zero cells making sure
      //to exclude cells in the group we are clearing
      let emptyCells = cells.reduce( (accum, cell, index)=>{
        if(cell.isMine === false && cellsAround.indexOf(index) === -1){
          return [...accum, cell];
        }else{
          return accum;
        }
      }, []);
      //for each cell in the group to clear we swap its
      //isMine property with one from an empty cell
      cellsAround.forEach( (id) => {
        if(cells[id].isMine){
          //pick a random cell in the array of empty cells
          let replaceId = Math.floor( Math.random() * emptyCells.length-1 );
          //remove it from the array so we don't pick it twice
          let replaceCell = emptyCells.splice(replaceId, 1)[0];
          //swap the values
          cells[id].isMine = false;
          cells[replaceCell.id].isMine = true;
        }
      });
      //reset the counted values of mines based on the new array
      cells = this.countMines(cells);
      cells[cellId].status = "show";

      cells = this.clearCell( cells, cellId );
      //cells = this.clearCells( cellId, cells);
      //reset state and then clear the original cell that was clicked
      //set start time so we can diff when we need to
      let timer = Date.now();
      let interval = setInterval( this.updateTimer, 1000 );
      this.setState({ cells: cells, started: true, timer: timer, interval: interval });
  }

  setGuess() {
    console.log("set guess called, pre check");
    if (this.status === "win" || this.status === "loss") {
      return;
    }
    console.log("set guess called, passed check");
    this.setState({ status: "guess" });
  }

  setup() {
    const length = this.props.data.width * this.props.data.height;
    let cells = [];
    for (let i = 0; i < length; i++) {
      let isMine = i < this.props.data.numMines ? true : false;
      cells.push({ isMine: isMine, status: "hidden", id: i });
    }
    cells = shuffleArray(cells);
    cells = this.countMines(cells);
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
    this.setState({
      cells: cells,
      status: "active",
      started: false,
      timer: null,
      interval: null
    });
  }

  updateTimer(e) {
    this.forceUpdate();
  }

  componentWillMount() {
    this.setup();
  }

  render() {
    let cells = this.state.cells.map((cell, index) => {
      return (
        <Cell
          data={cell}
          key={index}
          index={index}
          showCell={this.showCell}
          flagCell={this.flagCell}
          doubleClickCell={this.doubleClickCell}
          gameStatus={this.state.status}
          setGuess={this.setGuess}
        />
      );
    });

    let padding = "000";
    let mineCount = this.state.cells.reduce((accum, cell, index) => {
      if (cell.isMine && cell.status !== "flagged") {
        accum++;
      }
      return accum;
    }, 0);
    mineCount = (padding + mineCount).slice(-3);

    let time = padding;
    if (this.state.started && this.state.ended) {
      time =
        padding +
        String(Math.floor((this.state.ended - this.state.timer) / 1000));
      time = time.slice(-3);
    } else if (this.state.started) {
      time =
        padding + String(Math.floor((Date.now() - this.state.timer) / 1000));
      time = time.slice(-3);
    }

    let style = {
      width: 30 * this.props.data.width + 24 + "px"
    };
    let debugStyle = this.state.debug
      ? { display: "block" }
      : { display: "none" };

    return (
      <div className="GameBoard" style={style}>
        <div className="BoardMeta">
          <Counter className="MineCounter" count={mineCount} />
          <FaceButton setup={this.setup} status={this.state.status} />
          <Counter className="Timer" count={time} />
        </div>
        <div className="CellsWrapper">{cells}</div>
        <button onClick={this.props.openMenu}>Open Menu</button>
        <div className="debug" style={debugStyle}>
          <div className="statusMessage">{this.state.status}</div>
          <div>width - {this.props.data.width}</div>
          <div>height - {this.props.data.height}</div>
          <div>numMines - {this.props.data.numMines}</div>
        </div>
      </div>
    );
  }
}

export default GameBoard;
