import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import { UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import login_green from '../assets/login_green.png';

import {MdAccountCircle} from 'react-icons/md';
import {RiDashboard3Line, RiFileListLine, RiLogoutBoxRLine} from 'react-icons/ri';

export interface NavJobseekerProps {
    logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface NavJobseekerState {
    collapsed: boolean
}
 
class NavJobseeker extends React.Component<NavJobseekerProps, NavJobseekerState> {
    constructor(props: NavJobseekerProps) {
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
                <img  style={{width: "40px"}} src={login_green} alt="" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar}  />
                <Collapse isOpen={this.state.collapsed} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem className="mr-3">
                        <MdAccountCircle size={30} id="tooltip1"/>
                        <UncontrolledTooltip placement="top" target="tooltip1">
                            Account
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <RiDashboard3Line size={30} id="tooltip2"/>
                        <UncontrolledTooltip placement="top" target="tooltip2">
                            Dashboard
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <RiFileListLine size={30} id="tooltip3"/>
                        <UncontrolledTooltip placement="top" target="tooltip3">
                            My Applications
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <RiLogoutBoxRLine size={30} id="tooltip4" onClick={this.props.logout}/>
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
 
export default NavJobseeker;