import React, { Component } from 'react';
import '../App.css';

let numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

class Cell extends Component {
  constructor(props){
    super(props)
    this.show = this.show.bind(this)
    this.flag = this.flag.bind(this)
    this.fastClear = this.fastClear.bind(this)
    this.handleClickDown = this.handleClickDown.bind(this)
    this.handleClickUp = this.handleClickUp.bind(this)
    this.state = {
      LMB: false,
      RMB: false
    }
  }

  handleClickUp(e){
    e.preventDefault();
    if( this.state.LMB && this.state.RMB ){
      //do double click
      this.fastClear(e);
    }else if( this.state.LMB ){
      //do show cell
      this.show(e);
    }else if( this.state.RMB ){
      //do flag toggle
      this.flag(e);
    }
    this.setState({LMB: false, RMB: false});
  }

  handleClickDown(e){
    e.preventDefault();
    if(e.buttons === 3){
      this.setState({LMB: true, RMB: true});
    }else if(e.buttons === 1){
      this.setState({LMB: true});
      this.props.setGuess();
    }else if(e.buttons === 2){
      this.setState({RMB: true});
    }
  }

  show(e){
    e.preventDefault();
    if(this.props.data.status !== "hidden"){
      return;
    }
    this.props.showCell(this.props.index);
  }

  flag(e){
    if(this.props.data.status !== "show"){
      this.props.flagCell(this.props.index);
    }
  }

  fastClear(e){
    e.preventDefault();
    if(this.props.data.status !== "show"){
      return;
    }
    this.props.doubleClickCell(this.props.index);
  }

  render(){
    let className = "GameBoardCell";
    let cellText = this.props.data.mineCount === 0 ? "" : this.props.data.mineCount;
    if(this.props.data.status === "hidden"){
      //hidden cells are always hidden
      className += " HiddenCell";
    }else if(this.props.data.status === "flagged"){
      //if the game is still active we let flags display no matter what
      if(this.props.gameStatus==="loss" && !this.props.data.isMine){
        className += " MisFlagged";
      }else{
        className += " FlaggedCell";
      }
    }else if(this.props.gameStatus==="loss"){
      if(this.props.data.status==="loss"){
        className += "LossCell";
      }
    }else{
      className += " ShowCell " + numberWords[this.props.data.mineCount] + "Cell";
    }
    if(this.props.data.status==="hidden" && (this.props.gameStatus==='active' || this.props.gameStatus==='guess')){
      return (
        <div className={className}
          onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onContextMenu={this.handleClickDown}>
        </div>
      );
    }else{
      return (
        <div className={className}
          onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onContextMenu={this.handleClickDown}>
          {this.props.data.isMine ? ' ' : cellText}
        </div>
      );
    }
  }
}

export default Cell;
