import React, { Component } from "react";
import "../App.css";

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.state = {};
  }

  handleInput(e) {
    this.props.doAction(this.props.item.action);
  }

  render() {
    return (
      <div className="MenuItem" onClick={this.handleInput}>
        {this.props.item.label}
      </div>
    );
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {};
  }
  toggle(e) {
    this.props.toggle(this.props.title);
  }
  isActive() {
    return this.props.active === this.props.title;
  }

  render() {
    let body = "";
    let wrapperClass = "MenuWrapper";
    if (this.isActive()) {
      wrapperClass += " MenuActive";
      let menuItems = this.props.items.map((item, index) => {
        return (
          <MenuItem item={item} key={index} doAction={this.props.action} />
        );
      });
      body = <div className="MenuBody">{menuItems}</div>;
    }
    return (
      <div className={wrapperClass}>
        <div className="MenuTitle" onClick={this.toggle}>
          {this.props.title}
        </div>
        {body}
      </div>
    );
  }
}
export default Menu;
