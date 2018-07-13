import * as React from "react";
import "../App.css";
import Cell from "./cell";
import Counter from "./counter";
import FaceButton from "./facebutton";
import { GameBoardState } from '../App'

// type CellRefParams = {
//   x: number,
//   width: number,
// }

// const cellRefs = [
//   ({x, width}: CellRefParams) : number => {
//     return x - width - 1;
//   },
//   ({x, width}: CellRefParams) : number => {
//     return x - width;
//   },
//   ({x, width}: CellRefParams) : number => {
//     return x - width + 1;
//   },
//   ({x, width}: CellRefParams) : number => {
//     return x - 1;
//   },
//   ({x, width}: CellRefParams) : number => {
//     return x + 1;
//   },
//   ({x, width}: CellRefParams) : number => {
//     return x + width - 1;
//   },
//   ({x, width}: CellRefParams) : number => {
//     return x + width;
//   },
//   ({x, width}: CellRefParams) : number => {
//     return x + width + 1;
//   }
// ];

export interface GameBoardProps extends GameBoardState {
  resetGame: () => void
}

export class GameBoard extends React.Component<GameBoardProps,{}> {
  private padding = '000'
  constructor (props: GameBoardProps){
    super(props)

    this.state = {};
  }

  padString(val: string): string {
    return (this.padding + val).slice(-3);
  }

  getMineCount(): string {
    const mineCount = this.props.cells.reduce((accum, cell) => {
      if (cell.isMine && cell.status !== "flagged") {
        accum++;
      }
      return accum;
    }, 0);
    return this.padString(mineCount.toString());
  }

  getTime(): string {
    const { started, ended, timer } = this.props
    let time = '';
    if (started && ended) {
      time = String(Math.floor((ended - timer) / 1000));
    } else if (started) {
      time = String(Math.floor((Date.now() - timer) / 1000));
    }
    return this.padString(time)
  }

  render() {
    const { cells, debug, boardHeight, boardWidth, numMines, resetGame } = this.props
    const mineCount = this.getMineCount()
    const time = this.getTime()
    const style = { width: 30 * boardWidth + 24 + "px" };
    let debugStyle = debug
      ? { display: "block" }
      : { display: "none" };

    return (
      <div className="GameBoard" style={style}>
        <div className="BoardMeta">
          <Counter className="MineCounter" count={mineCount} />
          <FaceButton reset={resetGame} status={status} />
          <Counter className="Timer" count={time} />
        </div>
        <div className="CellsWrapper">{
          cells.map((cell, index) => <Cell
          data={cell}
          key={index}
          index={index}
          onClick={(e:React.MouseEvent<HTMLElement>) => console.log({cell, e})}
          onMouseDown={(e:React.MouseEvent<HTMLElement>) => console.log(e)}
          gameStatus={status}
        />)
        }</div>
        <div className="debug" style={debugStyle}>
          <div className="statusMessage">{status}</div>
          <div>{`width - ${boardWidth}`}</div>
          <div>{`height - ${boardHeight}`}</div>
          <div>{`numMines - ${numMines}`}</div>
        </div>
      </div>
    );
  }
}
