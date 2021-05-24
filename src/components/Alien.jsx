import React from 'react';
import './style/Alien.css';
import ImgAlien from '../img/alien/alien3.png'


class Alien extends React.Component {

    render() {

        return (
            <img className='alienComing' src={ImgAlien} alt="Alien"
                style={{
                    gridColumnStart: this.props.gridPositionColumn,
                    gridRowStart: this.props.gridPositionRow
                }}>
            </img>
        )
    }
}

export default Alien;