import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export interface NavHeaderProps {
    
}
 
export interface NavHeaderState {
    collapsed: boolean
}
 
class NavHeader extends React.Component<NavHeaderProps, NavHeaderState> {
    constructor(props: NavHeaderProps) {
        super(props);
        this.state = { 
            collapsed: false
          };
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    
    render() { 
        return ( 
            <>
            <div >
            <Navbar color="primary" dark expand="md">
                {/* <NavbarBrand href="/" > */}
                {/* Routes Practice */}
                {/* </NavbarBrand> */}
                <NavbarToggler onClick={this.toggleNavbar}  />
                <Collapse isOpen={this.state.collapsed} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <Link to="/" onClick={this.toggleNavbar} className="text-decoration-none">
                        <NavLink >About Trackie</NavLink>
                    </Link>
                    </NavItem>
                    <NavItem>
                        <UncontrolledDropdown>
                            <DropdownToggle>
                                Log in
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to="/login/jobseeker" onClick={this.toggleNavbar}>
                                    <DropdownItem>Job Seeker</DropdownItem>
                                </Link>
                                <DropdownItem divider />
                                <Link to="/login/school" onClick={this.toggleNavbar}>
                                    <DropdownItem>School</DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            </div>
            </>
         );
    }
}
 
export default NavHeader;