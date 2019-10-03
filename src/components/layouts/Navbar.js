import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Mobile } from  '../../assets/mobile-alt-solid.svg';
import { ReactComponent as CartPlus } from  '../../assets/cart-plus-solid.svg';

const Navbar = () => {
    return (  
        <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item mx-3">
                            <NavLink to="/" className="nav-link" activeClassName="active">
                                {/*<Mobile className="app-icon pr-2"/>*/}
                                Dispositivos
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink to="/requests" className="nav-link" activeClassName="active">
                                {/*<CartPlus className="app-icon mt-2 pr-2"/>*/}
                                Pedidos
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
 
export default Navbar;