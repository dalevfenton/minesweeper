import React, { Component } from "react";
import "../App.css";

class Counter extends Component {
  render() {
    let numbers = this.props.count.split("");
    numbers = numbers.map((number, index) => {
      let style = {
        backgroundPositionX: String(11 * Number(number)) + "px"
      };
      return <div className="CounterNumber" style={style} key={index} />;
    });
    return <div className={this.props.className}>{numbers}</div>;
  }
}

export default Counter;
