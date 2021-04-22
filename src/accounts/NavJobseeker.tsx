import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import { UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Dashboard from './Dashboard';
import login_green from '../assets/login_green.png';


import {MdAccountCircle} from 'react-icons/md';
import {RiDashboard3Line, RiFileListLine, RiLogoutBoxRLine} from 'react-icons/ri';
import Myjobapps from './MyJobApps';
import Account from './Account';

export interface NavJobseekerProps {
    token: string,
    logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface NavJobseekerState {
    collapsed: boolean,
    dashboardDisplayed: boolean,
    accountDisplayed: boolean,
    myAppsDisplayed: boolean
}
 
class NavJobseeker extends React.Component<NavJobseekerProps, NavJobseekerState> {
    constructor(props: NavJobseekerProps) {
        super(props);
        this.state = { 
            collapsed: false,
            dashboardDisplayed: true, //by default
            accountDisplayed: false,
            myAppsDisplayed: false
          };
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    displayDashboard = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        console.log('dashboard displayed');
        this.setState({
            dashboardDisplayed: true,
            accountDisplayed: false,
            myAppsDisplayed: false
        })
    }

    displayAccount = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        console.log('account displayed');
        this.setState({
            dashboardDisplayed: false,
            accountDisplayed: true,
            myAppsDisplayed: false
        })
    }

    displayMyApps = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        console.log('myApps displayed');
        this.setState({
            dashboardDisplayed: false,
            accountDisplayed: false,
            myAppsDisplayed: true
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
                        <MdAccountCircle size={30} id="tooltip1" onClick={this.displayAccount}/>
                        <UncontrolledTooltip placement="top" target="tooltip1" >
                            Account
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <RiDashboard3Line size={30} id="tooltip2" onClick={this.displayDashboard}/>
                        <UncontrolledTooltip placement="top" target="tooltip2">
                            Dashboard
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <RiFileListLine size={30} id="tooltip3"  onClick={this.displayMyApps}/>
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

            {this.state.dashboardDisplayed ? <Dashboard token={this.props.token} /> :
            this.state.accountDisplayed ? <Account token={this.props.token}/> :
            this.state.myAppsDisplayed ? <Myjobapps token={this.props.token}/> : null}
            

            </div>
            </>
         );
    }
}
 
export default NavJobseeker;