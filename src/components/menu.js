import React, { Component } from "react";
import "../App.css";

const menuItems = [
  { title: "Beginner", height: 8, width: 8, numMines: 10 },
  { title: "Intermediate", height: 16, width: 16, numMines: 40 },
  { title: "Expert", height: 16, width: 30, numMines: 99 }
];

class Menu extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {};
  }
  toggle(e) {
    this.props.toggle(this.props.title);
  }
  render() {
    let body = "";
    if (this.props.active === this.props.title) {
      body = <div className="MenuBody">Menu Body Goes Here</div>;
    }
    return (
      <div className="MenuWrapper">
        <div className="MenuTitle" onClick={this.toggle}>
          {this.props.title}
        </div>
        {body}
      </div>
    );
  }
}
export default Menu;
