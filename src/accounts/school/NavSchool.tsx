import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import { UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import login_purple from '../../assets/login_purple.png';
import {MdAccountCircle} from 'react-icons/md';
import {RiDashboard3Line, RiFileListLine, RiLogoutBoxRLine} from 'react-icons/ri';
import './NavSchool.css';

export interface NavSchoolProps {
    logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface NavSchoolState {
    collapsed: boolean
}
 
class NavSchool extends React.Component<NavSchoolProps, NavSchoolState> {
    constructor(props: NavSchoolProps) {
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
            <Navbar  light expand="md">
                <NavbarBrand href="/" >
                <img  style={{width: "40px"}} src={login_purple} alt="" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar}  />
                <Collapse isOpen={this.state.collapsed} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem className="mr-3 ">
                        <Link to="/school/dashboard"><RiDashboard3Line size={30} id="tooltip2" className="icons-school-menu" /></Link>
                        <UncontrolledTooltip placement="top" target="tooltip2">
                            Dashboard
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <Link to="/school/cohorts"><RiFileListLine size={30} id="tooltip3"  className="icons-school-menu" /></Link>
                        <UncontrolledTooltip placement="top" target="tooltip3">
                            Cohorts
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <Link to="/school/account"><MdAccountCircle size={30} id="tooltip1" className="icons-school-menu" /></Link>
                        <UncontrolledTooltip placement="top" target="tooltip1" >
                            Account
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <Link to="/school/logout"><RiLogoutBoxRLine size={30} id="tooltip4" className="icons-school-menu" /></Link>
                        <UncontrolledTooltip placement="top" target="tooltip4">
                            Logout
                        </UncontrolledTooltip>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            </div>
            </>
         );
    }
}
 
export default NavSchool;