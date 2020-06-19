import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';


const Nav = ({authStatus}) => {
    let login;
    authStatus ?
        login = <NavLink exact to='/signout' className="link dim white dib mr3" activeStyle={{ textDecoration: 'underline' }}>Sign out</NavLink> :
        login = <NavLink exact to='/signin' className="link dim white dib mr3" activeStyle={{ textDecoration: 'underline' }}>Sign In</NavLink>
    return(
        <header className="tr w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            <nav className="f6 fw6 ttu tracked">
                <NavLink exact to='/' className="link dim white dib mr3" activeStyle={{ textDecoration: 'underline' }}>Home</NavLink>
                <NavLink exact to='/about' className="link dim white dib mr3" activeStyle={{ textDecoration: 'underline' }}>About</NavLink>
                {login}
            </nav>
        </header>
    )
}

export default Nav;