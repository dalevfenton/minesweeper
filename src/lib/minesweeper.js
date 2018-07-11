import { cellRefs, shuffleArray } from '../utility'

export class Minesweeper {
    static generateCells({ boardWidth, boardHeight, numMines }) {
            let cells = [];
            for (let i = 0; i < (boardWidth * boardHeight); i++) {
              let isMine = i < numMines;
              cells.push({ isMine, status: "hidden", id: i });
            }
            cells = shuffleArray(cells);
            return this.countMines(cells);
    }

    static countMines({ cells, boardWidth, boardHeight }) {
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
    
        cells = cells.map((cell, index) => {
            let mineCount = 0;
            //returns the valid cells around this one in the matrix
            //( filters out non-proximate cells on edges & corners )
            const surroundingCellIndices = this.getSurroundingCellIndices({ index, boardWidth, boardHeight });
            surroundingCellIndices.forEach(function(neighborIndex) {
              if (cells[neighborIndex].isMine) {
                mineCount += 1;
              }
            });
            cell.mineCount = mineCount;
            return cell
          }
        );
        return cells;
    }

    static getSurroundingCellIndices({ index, boardWidth, boardHeight }) {
        let cellsAround = [];
    
        cellRefs.forEach((func, funcIndex) => {
          //check if we are a cell on the left or right edge of the board
          const isLeftBoardEdge = index % width === 0;
          const isRightBoardEdge = (index + 1) % width === 0;
          //check if the current function we're on should be excluded if we're
          //on that edge (i.e. a cell on the left of the left edge should be)
          const leftExclude = [0, 3, 5].indexOf(funcIndex) > -1;
          const rightExclude = [2, 4, 7].indexOf(funcIndex) > -1;
          //if we're on the edge of the board, don't look for mines
          //don't check this cell if it should be excluded
          if ((isLeftBoardEdge && leftExclude) || (isRightBoardEdge && rightExclude)) {
            return;
          }
          //get the index of the the cell around the one we're checking
          const neighboringCellIndex = func(index, boardWidth);
          //check that the index is a valid cell
          //invalid cells occur when the cell we're checking is
          //along the edge of the game board
          if (neighboringCellIndex >= 0 && neighboringCellIndex <= (boardWidth * boardHeight - 1)) {
            cellsAround.push(value);
          }
        });
        return cellsAround;
    }

    static isWin({ cellArray, numMines }) {
        let numLeft = cellArray.reduce((accum, cell, index)=> cell.status !== 'show' ? [...accum, index] : accum, []);
        return numLeft.length === numMines
    }

    static isLoss({ cellId, cellArray }) {
        return cellArray[cellId].isMine
    }

}