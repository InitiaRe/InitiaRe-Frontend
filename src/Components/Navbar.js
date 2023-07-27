import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';



function Navbar() {
    const bars = <FontAwesomeIcon icon={faBars} />
    const x = <FontAwesomeIcon icon={faTimes} />

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY && click === false) { // if scroll down and the dropdown isn't active hide the navbar
                setShow(false);
            } else { // if scroll up show the navbar
                setShow(true);
            }

            // remember current page location to use in the next move
            setLastScrollY(window.scrollY);
        }
    };

    // event listener to get scroll position
    useEffect(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', controlNavbar);
    
          // cleanup function
          return () => {
            window.removeEventListener('scroll', controlNavbar);
          };
        }
      }, [lastScrollY]);


    return (
        <div className={`nav-wrap ${show ? 'shown' : 'hidden'}`}>
            <nav className="navbar">
                <div className="logo-container">
                    <Link to="/" >
                        <img src="/Images/initiare-logo-final-centered.png" className="logo" />
                    </Link>
                </div>
                <div className="menu-container">
                    <div className="menu-icons" onClick={handleClick}>
                        {click ? x : bars}
                    </div>
                </div>


            </nav>
            <ul className={`nav-menu ${click ? 'active' : 'inactive'}`}>
                <DropdownItem title="Home" link="/" closeMenu={handleClick} />
                <DropdownItem title="About" link="/about" closeMenu={handleClick} />
                <DropdownItem title="Archive" link="/archive" closeMenu={handleClick} />
                <DropdownItem title="Upload" link="/upload" closeMenu={handleClick} />
                <DropdownItem title="Blog" link="/blog" closeMenu={handleClick} />
                <DropdownItem title="InitiaRe x Scholar Journal" link="/ixsjournal" closeMenu={handleClick} />
            </ul>

        </div>
    );
};

function DropdownItem(props) {
    return (
        <>
            <li className="nav-pages" onClick={props.closeMenu}>
                <Link to={props.link} className="nav-links">
                    {props.title}
                </Link>
            </li>

        </>
    );
}



export default Navbar;