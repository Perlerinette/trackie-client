import React from 'react';
import {Link} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { UncontrolledTooltip, Dropdown, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {RiHomeSmileLine, RiLoginBoxLine} from 'react-icons/ri';

export interface NavHomeProps {
    
}
 
export interface NavHomeState {
    collapsed: boolean,
    dropdowned: boolean
}
 
class NavHome extends React.Component<NavHomeProps, NavHomeState> {
    constructor(props: NavHomeProps) {
        super(props);
        this.state = { 
            collapsed: false,
            dropdowned: false
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
            <Navbar className="color-nav" light expand="md" fixed="top">
                <NavbarToggler onClick={this.toggleNavbar}  />
                <Collapse isOpen={this.state.collapsed} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem className="mr-3 ml-3">
                        <Link to="/" onClick={this.toggleNavbar} className="text-decoration-none"> 
                            <NavLink ><RiHomeSmileLine  size={30} className="icon-home"/> </NavLink>
                         </Link> 
                                            
                    </NavItem>
                    <NavItem  className="mr-3 ml-3">
                        <UncontrolledDropdown setActiveFromChild>
                            <DropdownToggle tag="a" className="nav-link ">
                            <RiLoginBoxLine size={30} id="tooltipLogin" className="icon-home"/>                            
                            {/* <UncontrolledTooltip placement="top" target="tooltipLogin">
                                Log in
                            </UncontrolledTooltip> */}
                            </DropdownToggle>
                            <DropdownMenu >
                                <Link to="/login" onClick={this.toggleNavbar} className="text-decoration-none">
                                    <DropdownItem >Job Seeker</DropdownItem>
                                </Link>
                                <DropdownItem divider />
                                <Link to="/school/login" onClick={this.toggleNavbar} className="text-decoration-none">
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
 
export default NavHome;