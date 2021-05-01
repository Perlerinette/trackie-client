import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem  } from 'reactstrap';
import { UncontrolledTooltip } from 'reactstrap';

import login_green from '../assets/login_green.png';


import {MdAccountCircle} from 'react-icons/md';
import {RiDashboard3Line, RiFileListLine, RiLogoutBoxRLine} from 'react-icons/ri';
import { Link } from 'react-router-dom';

export interface NavJobseekerProps {
    // token: string,
    // logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface NavJobseekerState {
    collapsed: boolean,
}
 
class NavJobseeker extends React.Component<NavJobseekerProps, NavJobseekerState> {
    constructor(props: NavJobseekerProps) {
        super(props);
        this.state = { 
            collapsed: false,
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
                    <NavItem className="mr-3 ">
                        <Link to="mydashboard"><RiDashboard3Line size={30} id="tooltip2" className="icons-menu" /></Link>
                        <UncontrolledTooltip placement="top" target="tooltip2">
                            Dashboard
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <Link to="myjobapplications"><RiFileListLine size={30} id="tooltip3"  className="icons-menu" /></Link>
                        <UncontrolledTooltip placement="top" target="tooltip3">
                            My Applications
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <Link to="myaccount"><MdAccountCircle size={30} id="tooltip1" className="icons-menu" /></Link>
                        <UncontrolledTooltip placement="top" target="tooltip1" >
                            Account
                        </UncontrolledTooltip>
                    </NavItem>
                    <NavItem className="mr-3 ml-3">
                        <Link to="logout"><RiLogoutBoxRLine size={30} id="tooltip4" className="icons-menu" /></Link>
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