import React, { Component } from 'react';
import './Box.css'

class Box extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.click()
  }


  render() {
    return <td className={this.props.isLit ? 'Box Box-select' : 'Box'} onClick={this.handleClick}></td>;
  }
}

export default Box;