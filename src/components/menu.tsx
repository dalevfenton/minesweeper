import * as React from "react";
import "../App.css";
import { IMenuItem, AllMenuActions } from "../config";

export interface MenuItemProps {
  item: IMenuItem
  doAction: (action: string) => void
}

export class MenuItem extends React.Component<MenuItemProps> {
  constructor(props: MenuItemProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { doAction, item } = this.props
    return (
      <div className="MenuItem" onClick={() => doAction(item.action)}>
        {item.label}
      </div>
    );
  }
}

export interface MenuProps {
  toggle: (title: string) => void
  action: (action: AllMenuActions) => void
  active: boolean|string
  title: string
  items: IMenuItem[]
}

export class Menu extends React.Component<MenuProps> {
  constructor(props: MenuProps) {
    super(props);

    this.state = {};
  }
  
  isActive() {
    const { active, title } = this.props
    return active && active === title;
  }

  genMenuBody() {
    const { items, action } = this.props
    return ( this.isActive() ? 
      (items.map((item, index) => <MenuItem item={item} key={index} doAction={action} />)) : 
      null )
  }

  render() {
    const wrapperClass = `MenuWrapper ${this.isActive() ? 'MenuActive' : ''}`
    const { title, toggle } = this.props
    return (
      <div className={wrapperClass}>
        <div className="MenuTitle" onClick={() => toggle(title)}>
          {title}
        </div>
        <div className="MenuBody">{this.genMenuBody()}</div>
      </div>
    );
  }
}
