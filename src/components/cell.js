import React, { Component } from 'react';
import '../App.css';

function isRMB(e){
  let isRMB;
  if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      isRMB = e.which === 3;
  else if ("button" in e)  // IE, Opera
      isRMB = e.button === 2;
  return isRMB;
}

class Cell extends Component {
  constructor(props){
    super(props)
    this.show = this.show.bind(this)
    this.flag = this.flag.bind(this)
  }

  show(e){
    e.preventDefault();
    const check = e.nativeEvent;
    console.log(check);
    e.preventDefault();
    if(this.props.data.status !== "hidden"){
      return;
    }
    this.props.showCell(this.props.index);
  }

  flag(e){
    e.preventDefault();
    if(this.props.data.status === "hidden" && isRMB(e.nativeEvent)){
      //turn on the flag
      this.props.flagCell(this.props.index);
    }
  }

  render(){
    let className = "GameBoardCell";
    let cellText = this.props.data.mineCount === 0 ? "" : this.props.data.mineCount;
    if(this.props.data.status === "hidden"){
      className += " HiddenCell";
    }else if(this.props.data.status === "flagged"){
      className += " FlaggedCell";
    }else{
      className += " ShowCell";
    }
    if(this.props.data.status==="hidden" && this.props.gameStatus==='active'){
      return (
        <div className={className} onClick={this.show} onContextMenu={this.flag}>
        </div>
      );
    }else{
      return (
        <div className={className} onContextMenu={this.flag}>
          {this.props.data.isMine ? 'X' : cellText}
        </div>
      );
    }
  }
}

export default Cell;
