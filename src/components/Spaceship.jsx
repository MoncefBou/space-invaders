import React from 'react';
import './style/Spaceship.css';
import ImageSpaceship from '../img/spaceship/ship1.png';

class Spaceship extends React.Component {

  render() {
    return (

      <img 
      className='spaceshipImg'
      src={ImageSpaceship} alt="Spaceship"
        style={{
          display: this.props.display,
          gridColumnStart: this.props.gridPositionColumn,
          gridRowStart: this.props.gridPositionRow
        }}>
      </img>
    )
  }
}

export default Spaceship;