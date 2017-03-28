import React, { Component } from 'react';
import '../App.css';

// function getButton(e){
//   let event = e || window.event;
//   let code;
//   console.log({button: e.button, which: e.which, buttons: e.buttons});
//   if ("which" in event){  // IE, Opera
//       if(event.which === 3){
//         code = 'RMB';
//       }
//       if(event.which === 1){
//         code = 'LMB';
//       }else{
//         code = 'Other';
//       }
//   }else if ("button" in event){  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
//       if(event.button === 2){
//         code = 'RMB';
//       }
//       if(event.button === 0){
//         code = 'LMB';
//       }else{
//         code = 'Other';
//       }
//   }
//   return code;
// }

class Cell extends Component {
  constructor(props){
    super(props)
    this.show = this.show.bind(this)
    this.flag = this.flag.bind(this)
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
      console.log('do double click');
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
        <div className={className}
          onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onContextMenu={this.handleClickDown}>
        </div>
      );
    }else{
      return (
        <div className={className}
          onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onContextMenu={this.handleClickDown}>
          {this.props.data.isMine ? 'X' : cellText}
        </div>
      );
    }
  }
}

export default Cell;
