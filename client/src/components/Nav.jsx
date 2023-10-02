import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import './nav.css';
import logoNav from './images/pokemon.png';

const Nav = () => {
    return(
        <nav>
            <div className='container_nav'>
                <div className='logo'>
                    <img src={logoNav} className='nav_logo' alt='' /> 
                </div>
                <div className='nav_search'>
                    <Search />
                </div>
                <div className='add'>
                    <Link to='/pokemon'>
                        <button className='add_button'>
                            Add Pokemon
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )
};

export default Nav;