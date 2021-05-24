import React from 'react';
import './style/Bullet.css';
import BulletImg from '../img/bullet1.png';

class Bullet extends React.Component {

    render() {

        return (
            <img
                className='bulletImg'
                src={BulletImg} alt="Bullet"
                style={{
                    gridColumnStart: this.props.gridPositionColumn,
                    gridRowStart: this.props.gridPositionRow,
                    display: this.props.display
                }} >
            </img>
        )
    }
}

export default Bullet;