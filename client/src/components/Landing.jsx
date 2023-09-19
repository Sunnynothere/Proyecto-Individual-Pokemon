import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import logo from './images/pokemon.png';

const Landing = () => {
    return(
        <div className='container_landing'>
            <div className='container_content'>
                <div className='title_landing'>
                    <img src={logo} alt='' />
                </div>
                <div className='button_landing'>
                    <Link to='/home'>
                        <button className='landing_button'>
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Landing;