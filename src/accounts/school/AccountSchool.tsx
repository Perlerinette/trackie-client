import * as React from 'react';
import './DashboardSchool.css';
import './AccountSchool.css';
import NavSchool from './NavSchool';
import { Alert, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap';
import UnlockSchoolSettings from './UnlockSchoolSettings';
import { FaSchool } from 'react-icons/fa';
import InterfaceSchool from '../../interfaces/InterfaceSchool';
import APIURL from '../../helpers/environment';
import { SiMinutemailer } from 'react-icons/si';
import { GrUpdate } from 'react-icons/gr';

export interface AccountSchoolProps {
    schoolToken: string,
    logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface AccountSchoolState {
    alertText: String,
    alertColor: string,
    alertVisible: boolean,
    unlocked: boolean,
    schoolname: string,
    email: string,
    password:string,
    newEmail: string,
    newPwd: string,
    confirmPwd: string,
    membership: string,
    creation: Date
}
 
class AccountSchool extends React.Component<AccountSchoolProps, AccountSchoolState> {
    constructor(props: AccountSchoolProps) {
        super(props);
        this.state = { 
            alertText: "",
            alertColor: "",
            alertVisible: false,
            unlocked: false,   
            schoolname: "",         
            email: "",
            password:"",
            newEmail: "",
            newPwd: "",
            confirmPwd: "",
            membership: "",
            creation: new Date()
          };
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


      componentDidMount() {
        this.getSchoolProfile();     
    }

    getSchoolProfile = () => {
    // fetch and delete from database
    fetch(`${APIURL}/school/getProfile`, {
        method: 'GET',
            headers:new Headers ({
                'Content-Type': 'application/json', 
                'Authorization': this.props.schoolToken
            })
        }) 
        .then( (response) => response.json())
        .then((profile: InterfaceSchool) => {            
            console.log(profile);
            this.setState({
                schoolname: profile.schoolname,
                email: profile.email,
                password: profile.password,
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


    // change Email
    setNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newEmail: e.currentTarget.value
        })
    }

    changeEmail = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(this.state.newEmail!== ''){
        fetch(`${APIURL}/school/changeEmail`, {
            method: "PATCH",
            body: JSON.stringify({
                school:{ 
                    email: this.state.newEmail
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': this.props.schoolToken
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



    // Change password
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
                fetch(`${APIURL}/school/changePwd`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        school:{ 
                            password: this.state.newPwd
                        }
                    }),
                    headers: new Headers({
                        "Content-Type": "application/json",
                        'Authorization': this.props.schoolToken
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



    render() { 
        return ( 
            <>
            <NavSchool logout={this.props.logout}/>
            <div className="dash-wrapper-school">
            <br/>
                <div className="cadre-title-school" style={{width: "250px"}}>
                    <h4 >{localStorage.getItem('schoolName')}'s </h4>
                    <h1 className='font'>- Account -</h1>
                </div>
                <br/>
                {/* Display messages: Success or error to inform user */}
                <Alert   color={this.state.alertColor} isOpen={this.state.alertVisible} style={{textAlign: "center"}}>
                                    {this.state.alertText}
                </Alert  >
                
                
                {/* LOCK/UNLOCK Settings */}

                 {this.state.unlocked ? <></> :   <UnlockSchoolSettings schoolToken={this.props.schoolToken} setTextAlert={this.setTextAlert} onShowAlert={this.onShowAlert} overlayOff={this.overlayOff}/> }
                
                
                <br/>
                <br/>
                <Container >                
                <Row >
                    <Col md="4" className="profile-school-box "> 
                        <h3 className='font' style={{color: "white", paddingTop:'10px'}}>Profile</h3>
                        <hr style={{borderTop: "5px dotted white"}}/>
                        <br/>
                        <h5 style={{color: '#d4c4fb'}}>Hello {this.state.schoolname} !</h5>
                        <br/>
                        <Container className="profile-school-container">
                            <FaSchool className="icon-profile-school-valid"/> Member since {this.state.membership} 
                            <br/>
                            <br/>
                            <SiMinutemailer className="icon-profile-school-valid"/>{' '} {this.state.email} 
                            
                            <br/> <br/>
                            {/* <img  className="trackie-img" src={Trackie} alt="" /> */}
                        </Container>
                    </Col>
                    <Col md="7" className="settings-school-box ">
                        <h3 className='font' style={{color: "#876ac7", paddingTop:'10px'}}>Settings</h3>
                        <hr style={{borderTop: "5px dotted #876ac7"}}/>
                        <br/>
                        <Container style={{textAlign: "left"}}>
                            
                                <Label style={{fontWeight: 'bold'}}>Modify Email: </Label>
                                <InputGroup>
                                    <Input onChange={this.setNewEmail} type="email" name="email" placeholder="Enter new email" value={this.state.newEmail} required />
                                    <InputGroupAddon addonType="append" >
                                            <InputGroupText className="icon-fieldSchool">
                                                <span style={{cursor:'pointer'}} onClick={this.changeEmail}>
                                                <GrUpdate /></span>
                                            </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                
                                <br/>
                                <hr style={{borderTop: "2px dotted #d4c4fb"}}/>
                                
                                <Label style={{fontWeight: 'bold'}}>Modify Password: </Label>
                                <InputGroup>
                                    <Input onChange={this.setNewPassword} type="password" name="password" placeholder="Enter new password" value={this.state.newPwd} required />
                                </InputGroup>
                                <br/>
                                <Label style={{fontWeight: 'bold'}}>Confirm Password: </Label>
                                <InputGroup>
                                    <Input onChange={this.setConfirmPassword} type="password" name="password" placeholder="Re-enter new password" value={this.state.confirmPwd} required />
                                    <InputGroupAddon addonType="append" >
                                            <InputGroupText className="icon-fieldSchool">
                                                <span style={{cursor:'pointer'}} onClick={this.changePwd}>
                                                <GrUpdate /></span>
                                            </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>

                                <br/>
                            </Container>
                            </Col>
                </Row>
                </Container>
                
                <br/>
                <br/>
            </div>
            </>
         );
    }
}
 
export default AccountSchool;