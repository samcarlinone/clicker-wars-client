import React, { Component } from 'react';
import Header from './header';
import '../styles/sass.scss';

export default class App extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        {this.props.children}
      </div>
    );
  }
}
