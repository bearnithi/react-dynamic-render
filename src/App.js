import React, { useEffect, useReducer, useState } from 'react';
import { renderer } from './engine/renderer';
import { pageJson, pageInitialState, pageStateReducers } from './config/page';
import eventEmitter from './eventEmitter';

function reducer(state, action) {
  const modifier = pageStateReducers[action.type].modifier;

  if(modifier) {
    return modifier(state, action);
  }

  return state;
}


const App = () => {

  const [state, dispatch] = useReducer(reducer, pageInitialState);
  const [compJson, setCompJson] = useState(pageJson);
  const [lastPayload, setLastPayload] = useState(null);
  

  useEffect(() => {
    const eventListener = ({action, payload}) => {
      setLastPayload({ type: action, payload });
      dispatch({ type: action, payload });
    };
  
    eventEmitter.on('STATE_CHANGE', eventListener);
  
    return () => {
      eventEmitter.off('STATE_CHANGE', eventListener);
    };
  }, [])

  useEffect(() => {
    if(lastPayload) {
      const updatedJSON = {...compJson};
      renderer.updateComponentProps(updatedJSON, state, lastPayload.payload);
      setCompJson(updatedJSON);
    }
  }, [state]);



  return <div>{renderer.render(compJson)}</div>;
};
export default App;
