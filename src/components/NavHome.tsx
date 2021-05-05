import React from 'react';
import {Link, NavLink} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {RiHomeSmileLine, RiLoginBoxLine} from 'react-icons/ri';

export interface NavHomeProps {
    menu: boolean
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
                    
                    {this.props.menu ?
                    <NavItem  className="mr-3 ml-3">
                        <UncontrolledDropdown setActiveFromChild>
                            <DropdownToggle tag="a" className="nav-link ">
                            <RiHomeSmileLine size={30} className="icon-home"/>                          
                            </DropdownToggle>                            
                            <DropdownMenu >
                                <a href="#home">
                                    <DropdownItem className="custom-hover font">Home</DropdownItem>
                                </a>
                                <DropdownItem divider />
                                <a href="#about">
                                    <DropdownItem className="custom-hover font">About Trackie</DropdownItem>
                                </a>
                                <DropdownItem divider />
                                <a href="#features">
                                    <DropdownItem className="custom-hover font">Features</DropdownItem>
                                </a>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </NavItem>
                    :
                    <NavItem className="mr-3 ml-3">
                        <Link to="/" onClick={this.toggleNavbar} className="nav-link"> 
                            <RiHomeSmileLine  size={30} className="icon-home"/> 
                         </Link> 
                                            
                    </NavItem>
                    }
                    <NavItem  className="mr-3 ml-3">
                        <UncontrolledDropdown setActiveFromChild>
                            <DropdownToggle tag="a" className="nav-link ">
                            <RiLoginBoxLine size={30} id="tooltipLogin" className="icon-home"/>                            
                            {/* <UncontrolledTooltip placement="top" target="tooltipLogin">
                                Log in
                            </UncontrolledTooltip> */}
                            </DropdownToggle>
                            <DropdownMenu >
                                <Link to="/login" onClick={this.toggleNavbar} className="text-decoration-none ">
                                    <DropdownItem className="custom-hover font">Job Seeker</DropdownItem>
                                </Link>
                                <DropdownItem divider />
                                <Link to="/school/login" onClick={this.toggleNavbar} className="text-decoration-none ">
                                    <DropdownItem className="custom-hover font">School</DropdownItem>
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