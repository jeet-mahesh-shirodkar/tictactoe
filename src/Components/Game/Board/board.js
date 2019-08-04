import React from 'react';
// import Blocks from '../Blocks/blocks.js'
import '../Board/board.css';
// import { thisExpression } from '@babel/types';

export default class Board extends React.Component {
    constructor(props) {
        super(props)

        this.state = ({
            blocks: Array(9).fill(''),
            next: 'X',
            step: 0,
            valueX: 'X',
            winner: undefined,
            moves :0,
            gameCompleted:false

        })
        this.handleClick = this.handleClick.bind(this);
        this.Winner = this.Winner.bind(this);
        this.reset= this.reset.bind(this);
    }

    Winner() {

        let arr = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        var block =this.state.blocks
        for (let i = 0; i < arr.length; i++) {
            // let [a, b, c] = arr[i];
            if(block[arr[i][0]] && block[arr[i][0]] === block[arr[i][1]] && block[arr[i][1]] === block[arr[i][2]])
            return block[arr[i][0]]
        }
    }

    handleClick(e) {
        if(this.state.gameCompleted) return;
        var arr = this.state.blocks
        var moves =this.state.moves
        if (arr[e.target.dataset.block] === '') {
            console.log(e.target.dataset.block)
            arr[e.target.dataset.block] = this.state.next
            e.target.innerText = this.state.next
            console.log(e.target.innerText)
            this.setState({
                next: this.state.next === 'X' ? 'O' : 'X',
                valueX: !this.state.valueX,
                blocks: this.state.blocks,
                moves:moves+1
            })
            // console.log(this.state.moves)
        }

        if(moves === 8){
            this.setState({
                winner:'GAME DRAW',
                gameCompleted:true
            })
        }

        var winner = this.Winner();
        if(winner === 'X'){
            this.setState({
                winner:'X',
                gameCompleted:true
            })
        }
        else if(winner === 'O'){
            this.setState({
                winner:'0',
                gameCompleted:true
            })
        }
    }

    reset(){
        this.setState({
            blocks:[],
            next: 'X',
            step: 0,
            valueX: 'X',
            winner: undefined,
            moves :0,
            gameCompleted:false
        })
    }
    render() {
        const status = this.state.valueX ? 'X' : 'O';
        return (
            <div className="board">
                <div className="turn">
                    <h3>React Tic Tac Toe</h3>
                    <p>Next to Play</p>{status}
                    <p>Game Winner</p>{this.state.winner}
                    {/* <button onClick={this.reset}>Play New Game</button> */}
                </div>
                <div className="blocks" onClick={(e) => this.handleClick(e)}>
                    <div className="block" data-block="0"></div>
                    <div className="block" data-block="1"></div>
                    <div className="block" data-block="2"></div>
                    <div className="block" data-block="3"></div>
                    <div className="block" data-block="4"></div>
                    <div className="block" data-block="5"></div>
                    <div className="block" data-block="6"></div>
                    <div className="block" data-block="7"></div>
                    <div className="block" data-block="8"></div>
                </div>
            </div>
        );
    }
}