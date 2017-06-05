import React, { Component } from 'react';
import '../styles/sass.scss';

export default class App extends Component {
  niceColor(angle) {
    return `hsl(
      ${angle},
      ${100-(20*Math.random())}%,
      ${50+10*(Math.random()-0.5)}%)`;
  }

  spacedRandom(partitions) {
    const result = [];

    for(let i=0; i<partitions; i++) {
      result[i] = Math.random()/(partitions*2) + i/partitions + i/(partitions*4);
    }

    return result;
  }

  render() {
    const color_blocks = [];
    const blocks = 6;
    const colors = this.spacedRandom(blocks);

    for (var i = 0; i < blocks; i++) {
      color_blocks.push(
        <div className='color-block'
          key={i}
          style={{backgroundColor: this.niceColor(colors[i]*360)}}></div>
      );
    }

    return (
      <div className="main">
          {color_blocks}
      </div>
    );
  }
}
