import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { renderChild, refs } from './renderer';
import { formJson } from './config/form';
import { pageJson } from './config/page';



const App = () => {


  useEffect(() => {

    setTimeout(() => {
      console.log(refs)
    }, 5000)
  }, [])

  return <div>{renderChild(pageJson)}</div>;
};
export default App;
