import React, { Component } from "react";
import "../App.css";

const menuItems = [
  { title: "Beginner", height: 8, width: 8, numMines: 10 },
  { title: "Intermediate", height: 16, width: 16, numMines: 40 },
  { title: "Expert", height: 16, width: 30, numMines: 99 }
];
class CustomSettings extends Component {
  constructor(props) {
    super(props);
    this.setValue = this.setValue.bind(this);
    this.action = this.action.bind(this);
    this.state = {
      width: 8,
      height: 8,
      numMines: 10
    };
  }

  setValue(e) {
    e.preventDefault();
    const obj = {};
    obj[e.target.id.substring(7)] = e.target.value;
    this.setState(obj);
  }

  action(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  render() {
    return (
      <div className="CustomSettingsModal">
        <input
          id="custom-width"
          type="range"
          max="30"
          min="5"
          value={this.state.width}
          onChange={this.setValue}
        />
        <input
          id="custom-height"
          type="range"
          max="30"
          min="5"
          value={this.state.height}
          onChange={this.setValue}
        />
        <input
          id="custom-mines"
          type="range"
          max={this.state.width * this.state.height - 1}
          min="1"
          value={this.state.numMines}
          onChange={this.setValue}
        />
        <div className="ButtonStandard" onClick={this.props.cancel}>
          Cancel
        </div>
        <div className="ButtonStandard" onClick={this.action}>
          Start
        </div>
      </div>
    );
  }
}

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.action = this.action.bind(this);
  }
  action(e) {
    e.preventDefault();
    this.props.action(this.props.data);
  }
  render() {
    return <li onClick={this.action}>{this.props.data.title}</li>;
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.setCustom = this.setCustom.bind(this);
    this.state = {
      showCustom: false
    };
  }

  setCustom() {
    this.setState({ showCustom: !this.state.showCustom });
  }

  render() {
    if (this.state.showCustom) {
      return (
        <CustomSettings cancel={this.setCustom} action={this.props.setBoard} />
      );
    }

    const staticItems = menuItems.map(
      function(item, index) {
        return (
          <MenuItem key={index} action={this.props.setBoard} data={item} />
        );
      }.bind(this)
    );

    return (
      <div className="MenuContainer">
        Menu
        <ul>
          {staticItems}
          <MenuItem action={this.setCustom} data={{ title: "Custom" }} />
        </ul>
      </div>
    );
  }
}

export default Menu;
