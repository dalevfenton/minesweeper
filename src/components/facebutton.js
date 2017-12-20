import React, { Component } from "react";
import "../App.css";

class FaceButton extends Component {
  render() {
    let offset = 0;
    let spriteWidth = 26;
    switch (this.props.status) {
      case "win":
        offset = 3;
        break;
      case "loss":
        offset = 2;
        break;
      case "guess":
        offset = 1;
        break;
      default:
        offset = 0;
    }
    let style = {
      backgroundPositionX: String(spriteWidth * offset) + "px"
    };
    return (
      <div className="FaceButton" style={style} onClick={this.props.setup}>
        &nbsp;
      </div>
    );
  }
}

export default FaceButton;
