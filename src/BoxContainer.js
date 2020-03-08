import React, { Component } from 'react';
import './BoxContainer.css'
import Box from './Box'

class BoxContainer extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    changeLightStartsOn: .25
  }
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < this.props.nRows; i++) {
      const row = [];
      for (let j = 0; j < this.props.nCols; j++) {
        row.push(Math.random() < this.props.changeLightStartsOn)
      }
      board.push(row);
    }
    return board;
  }

  select(coord) {
    const [row, col] = coord.split('-').map(cur => Number(cur));
    const { nRows, nCols } = this.props;
    const board = this.state.board;
    function flipBoxes(row, col) {
      if (row >= 0 && row < nCols && col >= 0 && col < nRows) {
        board[row][col] = !board[row][col];
      }
    }

    flipBoxes(row, col)
    flipBoxes(row + 1, col)
    flipBoxes(row - 1, col)
    flipBoxes(row, col + 1)
    flipBoxes(row, col - 1)

    const hasWon = board.every(row => row.every(box => !box))
    this.setState({ board: board, hasWon: hasWon })
  }


  render() {
    const board = [];
    for (let i = 0; i < this.props.nRows; i++) {
      const row = [];
      for (let j = 0; j < this.props.nCols; j++) {
        const coord = `${i}-${j}`
        row.push(<Box key={coord} isLit={this.state.board[i][j]} click={() => this.select(coord)} />)
      }
      board.push(<tr key={i} >{row}</tr>);
    }
    return (
      <table className="BoxContainer">
        <tbody>{board}</tbody>
      </table>
    )
  }
}

export default BoxContainer;