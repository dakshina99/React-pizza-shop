import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {

    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

      render(){
        return(
            <div>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler className="col-3 float-left" onClick={this.toggleNav}/>
                    
                    <div className="col-auto col-sm-1 float-left">
                        <NavbarBrand href="/"><img src="assets/images/logo.png" height="30" width="41" alt="logo.png"/></NavbarBrand>
                    </div>
                    
                    <div className="col-12 col-sm-11 float-right">
                        {/* it really hard working with newer react versions while getting adapted to use the instructions explained in the videos */}
                        
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg"></span> Home </NavLink>
                                </NavItem>
        
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus"><span className="fa fa-info fa-lg"></span> About Us </NavLink>
                                </NavItem>
        
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu"><span className="fa fa-list fa-lg"></span> Menu </NavLink>
                                </NavItem>
        
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus"><span className="fa fa-address-card fa-lg"></span> Contact Us </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </div>
            </Navbar>

            <div className="jumbotron">
                {/* found out that latest reactstrap doesnt come with Jumbotron element */}
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Header;