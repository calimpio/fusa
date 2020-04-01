import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import g from "./globals"

class Root extends Component {
  render() {
    g.GRequester().Router()    
    return (
      <h1>Hola mundo desde React</h1>
    )
  }
}

let container = document.getElementById('app');
let component = <Root />;
ReactDOM.render(component, container);