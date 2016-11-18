import React, { Component } from 'react';
import '../App.css';

class Cell extends Component {
  constructor(props){
    super(props)
    this.show = this.show.bind(this)
  }

  show(e){
    e.preventDefault();
    if(this.props.data.status !== "hidden"){
      return;
    }
    this.props.showCell(this.props.index);
  }

  render(){
    let className = "GameBoardCell";

    this.props.data.status==="hidden" ? className+=" HiddenCell" : className += " ShowCell";
    if(this.props.data.status==="hidden"){
      return (
        <div className={className + " HiddenCell"} onClick={this.show}>
        </div>
      );
    }else{
      return (
        <div className={className}>
          {this.props.data.isMine ? 'X' : this.props.data.mineCount}
        </div>
      );
    }
  }
}

export default Cell;
