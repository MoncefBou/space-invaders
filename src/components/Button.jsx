import React from 'react';
import './style/Button.css';

class Spaceship extends React.Component {

  render() {
    return (
      <button onClick={this.props.begin}> {this.props.children} </button>
    )
  }
}



export default Spaceship;