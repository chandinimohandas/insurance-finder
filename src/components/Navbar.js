import { AiOutlineCar } from 'react-icons/ai';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

export default function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='navbar'>
                    <div className='navbar-container container'>
                        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                            <AiOutlineCar className='navbar-icon' />
              INSURANCE
            </Link>
                        <div className='menu-icon' onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                    Home
                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/policies'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Policies
                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/charts'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Charts
                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    );
}

