import React from 'react';

import { Form, Input, Button, Table } from 'antd';
import { CustomForm } from './CustomForm';
import { CustomTable } from './Table';
const { Item } = Form;

export const antdMapping = {
    "Form": Form,
    "Input": Input,
    "Input.TextArea": Input.TextArea,
    "Button": Button,
    "Form.Item": Item,
    "Input.Password": Input.Password,
    "Table": Table,
    "CustomForm": CustomForm,
    "CustomTable": CustomTable
  }
  
 export const refs = {};

export const renderChild = (child) => {
    const { type: ChildType, props, children } = child || {};
  
    console.log(ChildType);
    if (!ChildType) {
      return null;
    }
  
    const refDetail = child.refKey ? (refs[child.refKey] = React.createRef()) : null;
  
    const childProps = { ...props, key: props?.key || null, ref: refDetail };
  
    if (children && children.length > 0) {
      return React.createElement(
        antdMapping[ChildType] ? antdMapping[ChildType] : ChildType ,
        childProps,
        Array.isArray(children) ? children.map(renderChild) : children,
  
      );
    }
  
    return React.createElement(antdMapping[ChildType] ? antdMapping[ChildType] : ChildType , childProps);
  };
  