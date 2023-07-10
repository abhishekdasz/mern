import React from 'react'
import '../styles/NavBar.css'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
        <div className="nav-sec">
            <div className="nav-container">
                <h1>
                    <NavLink to='/'> Logo </NavLink>
                </h1>
                <ul>
                    <li> <NavLink to='/'> Home </NavLink> </li>
                    <li> <NavLink to='about'> About </NavLink> </li>
                    <li> <NavLink to='contact'> Contact Us </NavLink> </li>
                    <li> <NavLink to='login'> Login </NavLink> </li>
                    <li> <NavLink to='registration'> Registration </NavLink> </li>
                    <li> <NavLink to='logout'> Logout </NavLink> </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default NavBar;
