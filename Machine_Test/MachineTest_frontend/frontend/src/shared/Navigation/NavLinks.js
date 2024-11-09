import React, { useContext } from "react";
import './NavLinks.css';
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

// step:3 inorder to use useContext we need to listen to it
const NavLinks = props =>{
    // create an object of AuthContext
    // listening
    const auth = useContext(AuthContext);
    return(
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>All Users</NavLink>
            </li>
            {auth.isLoggedIn && (
            <li>
                <NavLink to="/u1/places" exact>My Places</NavLink>
            </li>)
            }
            
            {auth.isLoggedIn && (
            <li>
                <NavLink to="/places/new" exact>Add Places</NavLink>
            </li>)
            }

            {!auth.isLoggedIn && (
            <li>
                <NavLink to="/auth" exact>Authenticate</NavLink>
            </li>)
            }
            {auth.isLoggedIn &&(
                <li>
                    <button onClick={auth.logout}>LOGOUT</button>
                </li>
            )}
        </ul>
    )
}

export default NavLinks;