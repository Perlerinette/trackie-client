import React, { ComponentProps} from 'react';
import { Alert, Col, Container, Row, Input, Form, FormGroup, Button, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
import Footer from '../components/Footer';
import APIURL from '../helpers/environment';
import './Account.css';
import {RiKey2Fill, RiUserSharedFill} from 'react-icons/ri';
import { BsLockFill, BsPersonFill, BsEyeFill, BsEyeSlashFill, BsLink } from 'react-icons/bs';
import UnlockSettings from './UnlockSettings';
import {SiMinutemailer} from 'react-icons/si';
import InterfaceJobseeker from '../interfaces/InterfaceJobseeker';
import { BiLink, BiUnlink } from 'react-icons/bi';
import {GrAddCircle, GrUpdate} from 'react-icons/gr';
import { MdAccountCircle } from 'react-icons/md';
import Trackie from '../assets/trackie_sol.png'


export interface AccountProps {
   token: string
}
 
export interface AccountState {
    alertText: String,
    alertColor: string,
    alertVisible: boolean,
    unlocked: boolean,
    email: string,
    firstname: string,
    lastname: string,
    password:string,
    sharedata: boolean,
    invitcode: string,
    newCode: string,
    newEmail: string,
    newPwd: string,
    confirmPwd: string,
    newShare: boolean,
    membership: string,
    creation: Date
}
 
class Account extends React.Component<AccountProps, AccountState> {
    constructor(props: AccountProps) {
        super(props);
        this.state = { 
            alertText: "",
            alertColor: "",
            alertVisible: false,
            unlocked: false,
            email: "",
            firstname: "",
            lastname: "",
            password:"",
            sharedata: false,
            invitcode: "",
            newCode: "",
            newEmail: "",
            newPwd: "",
            confirmPwd: "",
            newShare: false,
            membership: "",
            creation: new Date
          };
    }

    componentDidMount() {
        this.getProfile();     
    }

    getProfile = () => {
    // fetch and delete from database
    fetch(`${APIURL}/jobseeker/getProfile`, {
        method: 'GET',
            headers:new Headers ({
                'Content-Type': 'application/json', 
                'Authorization': this.props.token
            })
        }) 
        .then( (response) => response.json())
        .then((profile: InterfaceJobseeker) => {            
            console.log(profile);
            this.setState({
                email: profile.email,
                password: profile.password,
                firstname: profile.firstname,
                lastname: profile.lastname,
                sharedata: profile.sharedata,
                invitcode: profile.invitcode,
                creation: profile.createdAt,
                membership: this.getMMDDYYYY(this.state.creation.toISOString())
            });
        })
        .catch(error => console.log(error));

    }

    // format date in MM/dd/YYYY
    getMMDDYYYY = (date: string) => {
        
        let year = date.slice(0,4);
        let month = date.slice(5,7);
        let day = date.slice(8,10);
        date = month + '/' + day + '/' + year;
        
        return date;
    }

    /* ALERT MESSAGES */
    // alert will display and disappear after 2sec
    onShowAlert = ()=>{
        this.setState({alertVisible:true},()=>{
          window.setTimeout(()=>{
            this.setState({alertVisible:false})
          },3000)
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


    setNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newEmail: e.currentTarget.value
        })
    }

    changeEmail = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(this.state.newEmail!== ''){
        fetch(`${APIURL}/jobseeker/changeEmail`, {
            method: "PATCH",
            body: JSON.stringify({
                jobseeker:{ 
                    email: this.state.newEmail
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': this.props.token
            }),
            })
            .then((response) => response.json())
            .then((data) => {            
                console.log(data);
                this.setState({ 
                    email: this.state.newEmail,
                    newEmail:""
                }); 
                this.setTextAlert("success",`Email updated!`);
                this.onShowAlert();
            });
        } else {
            this.setTextAlert("danger",`Email canoot be empty!`);
            this.onShowAlert();
        }
    }

    setNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newPwd: e.currentTarget.value
        })
    }
    setConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            confirmPwd: e.currentTarget.value
        })
    }

    changePwd = (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        if(this.state.newPwd !== '' && this.state.confirmPwd !== ""){
            if(this.state.newPwd === this.state.confirmPwd){
                fetch(`${APIURL}/jobseeker/changePwd`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        jobseeker:{ 
                            password: this.state.newPwd
                        }
                    }),
                    headers: new Headers({
                        "Content-Type": "application/json",
                        'Authorization': this.props.token
                    }),
                    })
                    .then((response) => response.json())
                    .then((data) => {            
                        console.log(data);
                        this.setState({ 
                            password: this.state.newPwd,
                            newPwd:""
                        }); 
                        this.setTextAlert("success",`Password updated!`);
                        this.onShowAlert();
                    });
            } else {
                this.setTextAlert("danger",`Passwords don't match!`);
                this.onShowAlert();                
            }
        } else {
            this.setTextAlert("danger",`Passwords cannot be empty!`);
            this.onShowAlert();
        }
    }
    


    changeSharing = (e: React.SyntheticEvent) => {
        e.preventDefault();

        fetch(`${APIURL}/jobseeker/changeSharing`, {
            method: "PATCH",
            body: JSON.stringify({
                jobseeker:{ 
                    sharedata: !this.state.sharedata //toggle value of sharedata
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': this.props.token
            }),
            })
            .then((response) => response.json())
            .then((data) => {            
                console.log(data);
                this.setState({ sharedata: !this.state.sharedata});
                this.setTextAlert("success",`Sharing option updated`);
                this.onShowAlert();
            });
    }

    
    setCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newCode: e.currentTarget.value
        })
    }

    addCode = (e: React.SyntheticEvent) => {
        e.preventDefault();

        fetch(`${APIURL}/jobseeker/addCode`, {
            method: "PATCH",
            body: JSON.stringify({
                jobseeker:{ 
                    invitcode: this.state.newCode.toUpperCase() 
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': this.props.token
            }),
            })
            .then((response) => response.json())
            .then((data) => {            
                console.log(data);
                this.setState({ 
                    invitcode: this.state.newCode.toUpperCase()
                }); 
                this.setTextAlert("success",`School code added!`);
                this.onShowAlert();
            });
    }


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

                 {/* {this.state.unlocked ? <></> :   <UnlockSettings token={this.props.token} setTextAlert={this.setTextAlert} onShowAlert={this.onShowAlert} overlayOff={this.overlayOff}/> }
                 */}
                
                <br/>
                <br/>
                <Container >                
                <Row >
                    <Col md="4" className="profile-box "> 
                            <h4 style={{color: "white"}}>Profile</h4>
                            <hr style={{borderTop: "5px dotted white"}}/>
                            <br/>
                            <h5>Hello {this.state.firstname} {this.state.lastname} !</h5>
                            <br/>
                            <Container className="profile-container">
                                <MdAccountCircle className="icon-profile-valid"/> Member since {this.state.membership} 
                                <br/>
                                <br/>
                                <SiMinutemailer className="icon-profile-valid"/>{' '} {this.state.email} 
                                <br/>
                                <br/>
                                {this.state.sharedata ?
                                <> 
                                <RiUserSharedFill className="icon-profile-valid"/> Sharing data with school <br/><br/>
                                {this.state.invitcode ?
                                    <><BiLink className="icon-profile-valid"/> code: {this.state.invitcode}  </> : <> <BiLink className="icon-profile-invalid"/> no code provided </>}
                                </> :
                                <> <BiUnlink className="icon-profile-invalid"/> Data is NOT shared </>
                                }
                                <br/> <br/>
                                {/* <img  className="trackie-img" src={Trackie} alt="" /> */}
                            </Container>
                            
                    </Col>
                    
                    <Col md="7" className="settings-box ">
                        <h4 style={{color: "#637259"}}>Settings</h4>
                        <hr style={{borderTop: "5px dotted #637259"}}/>
                        <br/>
                        <Container style={{textAlign: "left"}}>
                            
                                <Label>Modify Email: </Label>
                                <InputGroup>
                                    <Input onChange={this.setNewEmail} type="email" name="email" placeholder="Enter new email" value={this.state.newEmail} required />
                                    <InputGroupAddon addonType="append" >
                                            <InputGroupText className="icon-field">
                                                <span style={{cursor:'pointer'}} onClick={this.changeEmail}>
                                                <GrUpdate /></span>
                                            </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                
                                <br/>
                                <hr style={{borderTop: "2px dotted #dafbc6"}}/>
                                
                                <Label>Modify Password: </Label>
                                <InputGroup>
                                    <Input onChange={this.setNewPassword} type="password" name="password" placeholder="Enter new password" value={this.state.newPwd} required />
                                </InputGroup>
                                <br/>
                                <Label>Confirm Password: </Label>
                                <InputGroup>
                                    <Input onChange={this.setConfirmPassword} type="password" name="password" placeholder="Re-enter new password" value={this.state.confirmPwd} required />
                                    <InputGroupAddon addonType="append" >
                                            <InputGroupText className="icon-field">
                                                <span style={{cursor:'pointer'}} onClick={this.changePwd}>
                                                <GrUpdate /></span>
                                            </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>

                                <br/>
                                <hr style={{borderTop: "2px dotted #dafbc6"}}/>

                                {/* if data is already shared, show option not to share */}
                                {this.state.sharedata ? 
                                <>
                                <Row >
                                    <Col>
                                    Stop sharing:   <br/>
                                    <RiUserSharedFill className="btn-stop-sharing" onClick={this.changeSharing}/> 
                                    </Col>
                                    <Col >                                    
                                    <Label>School code:</Label>
                                    {this.state.invitcode ?
                                    <>                                    
                                    <Input type="text" value={this.state.invitcode} disabled style={{width:"fit-content"}} />
                                    </>
                                    :
                                    <>
                                    <InputGroup>
                                        <Input onChange={this.setCode} type="text" name="code" placeholder="Add your code" value={this.state.newCode} required />
                                        <InputGroupAddon addonType="append" >
                                                <InputGroupText className="icon-field">
                                                    <span style={{cursor:'pointer'}} onClick={this.addCode}>
                                                    <GrAddCircle /></span>
                                                </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    </>
                                    }
                                    </Col>
                                </Row>
                                </> :
                                <>
                                <Row >
                                    <Col>
                                    Share Option:   <br/>
                                    <RiUserSharedFill className="btn-start-sharing" onClick={this.changeSharing}/> 
                                    </Col>
                                    <Col >
                                    <Label>School code:</Label>
                                    {this.state.invitcode ?
                                    <>                                    
                                    <Input type="text" value={this.state.invitcode} disabled style={{width:"fit-content"}} />
                                    </>
                                    :
                                    <>
                                    <InputGroup>
                                        <Input onChange={this.setCode} type="text" name="code" placeholder="Add your code" value={this.state.newCode} required />
                                        <InputGroupAddon addonType="append" >
                                                <InputGroupText className="icon-field">
                                                    <span style={{cursor:'pointer'}} onClick={this.addCode}>
                                                    <GrAddCircle /></span>
                                                </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    </>
                                    }
                                    </Col>
                                </Row>
                                </>
                                }

                        <br/>   
                        <br/>  
                        </Container>
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