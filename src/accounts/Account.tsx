import React, { ComponentProps} from 'react';
import { Alert, Col, Container, Row, Input, Form, FormGroup, Button, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Footer from '../components/Footer';
import APIURL from '../helpers/environment';
import './Account.css';
import {RiKey2Fill} from 'react-icons/ri';
import { BsLockFill, BsPersonFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import UnlockSettings from './UnlockSettings';


export interface AccountProps {
   token: string
}
 
export interface AccountState {
    alertText: String,
    alertColor: string,
    alertVisible: boolean,
    unlocked: boolean
}
 
class Account extends React.Component<AccountProps, AccountState> {
    constructor(props: AccountProps) {
        super(props);
        this.state = { 
            alertText: "",
            alertColor: "",
            alertVisible: false,
            unlocked: false
          };
    }

    componentDidMount() {
        this.checkIdentity();     
    }

    checkIdentity = () => {

    }

    /* ALERT MESSAGES */
    // alert will display and disappear after 2sec
    onShowAlert = ()=>{
        this.setState({alertVisible:true},()=>{
          window.setTimeout(()=>{
            this.setState({alertVisible:false})
          },2000)
        });
    }

    setTextAlert = (color: string, text: string) => {
        this.setState({
            alertColor: color,
            alertText: text
        })
    }  

    overlayOff = () => {
        this.setState({
            unlocked: true
        })
    }
      /* END of ALERT MESSAGES */

    /*****************************/
    // showPwd = () => {
    //     this.setState({
    //         isPwdVisible: !(this.state.isPwdVisible)
    //     });
    //     this.state.isPwdVisible ? this.setState({typePwd: "password"}) : this.setState({typePwd: "text"});
    //     console.log("ispwdvisible", this.state.isPwdVisible);
    // }
    
    
    // handleSubmit = (e: React.SyntheticEvent) => {
    //     e.preventDefault();
        
    //     fetch(`${APIURL}/jobseeker/comparePwd`, {
    //         method: "POST",
    //         body: JSON.stringify({
    //             jobseeker:{ 
    //                 password: this.state.password
    //             }
    //         }),
    //         headers: new Headers({
    //           "Content-Type": "application/json",
    //           'Authorization': this.props.token
    //         }),
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {            
    //           console.log(data);
    //           this.setState({ selectClass: ""}); // to remove the overlay and unlock the settings
    //           this.setTextAlert("success",`Password confirmed!`);
    //           this.onShowAlert();
    //         });
            
    // }

    // setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     this.setState({
    //         password: e.currentTarget.value
    //     })
    // }


    render() { 
        return ( 
            <>
           <div className="dash-wrapper">
                <br/>
                <div className="cadre-title"  style={{width: "250px"}}>
                    <h4 >{localStorage.getItem('jobseekerName')}'s </h4>
                    <h2 >- Account -</h2>
                </div>
                <br/>
                {/* Display messages: Success or error to inform user */}
                <Alert   color={this.state.alertColor} isOpen={this.state.alertVisible} style={{textAlign: "center"}}>
                    {this.state.alertText}
                </Alert  >
                

                {/* LOCK/UNLOCK Settings */}
                 {this.state.unlocked ? <></> :   <UnlockSettings token={this.props.token} setTextAlert={this.setTextAlert} onShowAlert={this.onShowAlert} overlayOff={this.overlayOff}/> }
            
                
                <br/>
                <br/>
                <Container >                
                <Row>
                    <Col md="3">
                        <div className="profile-box ">
                            <h5 style={{color: "white"}}>Profile</h5>
                            <hr/>
                            <p>Hello name!</p>
                            <ul>
                                <li>Logged in with: </li>
                                <li>Linked to school with: </li>
                                <li>Sharing some data</li>
                            </ul>
                            <br/>
                        </div>
                    </Col>
                    <Col md="9">
                    <div className="design-container ">
                            Settings
                        </div>
                    </Col>
                </Row>
                
                <br/>
                </Container>
                <br/>
                <br/>
            </div>
            </>
         );
    } 
}
 
export default Account;