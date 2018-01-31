import Block from './Block'
import { BLOCK_TYPE, GAME_STATE, randomNumBetween } from '../util/util'
import { MAZE_WORLD } from '../util/mazes'

export default class Maze {
    constructor(args) {
        this.mazeMap = args.mazeMap;
        this.create = args.create;
        this.addSteps = args.addSteps;
        this.endGame = args.endGame;
        this.gameState = GAME_STATE.INTRO;

        this.currentPosition = {
            row: 0,
            column: 0
        }
        this.exitPosition = {
            row: 0,
            column: 0
        }
        this.lastMove = 0;
        this.moveFrequency = 75;
        this.drawMaze();
    }

    updateMaze(mazeSource, gameState) {
        if (Number.isSafeInteger(mazeSource)) {
            this.mazeMap = MAZE_WORLD[mazeSource];
        } else {
            this.mazeMap = mazeSource;
        }
        this.gameState = gameState;
        this.drawMaze();
    }

    drawMaze() {
        this.mazeMap.map.forEach((arrayItems, row) => {
            //console.log(row + '[' + arrayItems + ']')
            arrayItems.forEach((cellValue, column) => {
                //console.log(column + '[' + cellValue + ']')
                if (cellValue === BLOCK_TYPE.EXIT.cellValue) {
                    this.drawBlock(row, column, BLOCK_TYPE.EXIT)
                    this.exitPosition = { row, column }
                }
                if (cellValue === BLOCK_TYPE.ENTRY.cellValue) {
                    this.drawBlock(row, column, BLOCK_TYPE.ENTRY)
                    this.currentPosition = { row, column }
                }
                if (cellValue === BLOCK_TYPE.WALL.cellValue) {
                    this.drawBlock(row, column,
                        (this.gameState === GAME_STATE.SELECT || this.gameState === GAME_STATE.OVER) ?
                        BLOCK_TYPE.ILLUSION_WALL :
                        BLOCK_TYPE.WALL)
                }
            });
        });
    }

    drawBlock(row, column, blockType, animation=true) {
        var block = new Block({
            ...blockType,
            blockSize: this.mazeMap.blockSize,
            position: {
                x: column * this.mazeMap.blockSize,
                y: row * this.mazeMap.blockSize
            },
            translate: {
                x: 15,
                y: 50
            },
        });
        if(animation) {
            this.timerID = setTimeout(
                () => { this.create(block, 'blocks'); },
                randomNumBetween(100, 700)
            );
        } else {
            this.create(block, 'blocks');
        }
    }

    isAvailable(newPosition) {
        let currentBlock = this.mazeMap.map[newPosition.row][newPosition.column];
        return (currentBlock === BLOCK_TYPE.PATH.cellValue || currentBlock === BLOCK_TYPE.EXIT.cellValue)
    }

    isExitPosition(position) {
        return (position.row === this.exitPosition.row && position.column === this.exitPosition.column)
    }

    render(state) {
        if (state.keys.up || state.keys.down || state.keys.right || state.keys.left) {
            if (Date.now() - this.lastMove > this.moveFrequency) {
                var newPosition = null;
                if (state.keys.up) {
                    newPosition = { row: this.currentPosition.row - 1, column: this.currentPosition.column };
                }
                if (state.keys.down) {
                    newPosition = { row: this.currentPosition.row + 1, column: this.currentPosition.column };
                }
                if (state.keys.left) {
                    newPosition = { row: this.currentPosition.row, column: this.currentPosition.column - 1 };
                }
                if (state.keys.right) {
                    newPosition = { row: this.currentPosition.row, column: this.currentPosition.column + 1 };
                }

                if (this.isAvailable(newPosition)) {
                    this.drawBlock(this.currentPosition.row, this.currentPosition.column, BLOCK_TYPE.PATH, false)
                    this.drawBlock(newPosition.row, newPosition.column, BLOCK_TYPE.ACTIVE, false)
                    this.addSteps();
                    if (this.isExitPosition(newPosition)) {
                        console.log('Win!')
                        this.endGame();
                    }
                    this.currentPosition = newPosition;
                }
                this.lastMove = Date.now();
            }
        }
    }
}
