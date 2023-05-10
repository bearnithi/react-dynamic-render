import React from 'react';

import { Form, Input, Button, Table } from 'antd';
const { Item } = Form;


class BudRenderer {
  refs = {};
  componentMapping = {
    "Form": Form,
    "Input": Input,
    "Input.TextArea": Input.TextArea,
    "Button": Button,
    "Form.Item": Item,
    "Input.Password": Input.Password,
    "Table": Table,
  } 

  constructor() {
    // FOR SIGNLETON
    if (typeof BudRenderer.instance === 'object') {
      return BudRenderer.instance;
    }

    BudRenderer.instance = this;

    return this;
  }

  registerComponent(name, component) {
    this.componentMapping[name] = component;
  }

  render = (child) => {
    const { type: ChildType, props, children } = child || {};
  
    if (!ChildType) {
      return null;
    }
  
    const refDetail = child.refKey ? (this.refs[child.refKey] = React.createRef()) : null;
  
    const childProps = { ...props, ref: refDetail };
  
    if (children && children.length > 0) {
      return React.createElement(
        this.componentMapping[ChildType] ? this.componentMapping[ChildType] : ChildType ,
        childProps,
        Array.isArray(children) ? children.map(this.render) : children,
  
      );
    }
  
    return React.createElement(this.componentMapping[ChildType] ? this.componentMapping[ChildType] : ChildType , childProps);
  }

  updateComponentProps = (data, state, newState) => {
    if (data.stateKey && state[data.stateKey] !== undefined) {
      data.props = { ...data.props, ...state[data.stateKey] };
    }
  
    if (data.children && Array.isArray(data.children) && data.children.length > 0) {
      data.children.forEach((child) => {
        this.updateComponentProps(child, state, newState);
      });
    }
  };
  
}

export const renderer = new BudRenderer();
export const refs = renderer.refs;