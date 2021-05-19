import React, { ComponentProps} from 'react';
import APIURL from '../helpers/environment';
import './Auth.css';
import {RouteComponentProps, withRouter, Link} from 'react-router-dom';
import {Col, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Button, InputGroup, InputGroupAddon, InputGroupText, Row, Container, Alert} from 'reactstrap';
import { BsLockFill, BsPersonFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import login_green from '../assets/login_green.png';
import NavHome from '../components/NavHome';


export interface LoginProps extends RouteComponentProps {
    // updateToken: (token: string, tokenType: string) => void,
    updateToken: Function
    // updateEmail: string

}
 
export interface LoginState {
    email: string,
    password: string,
    isPwdVisible: boolean,
    typePwd: ComponentProps<typeof Input>['type'],
    alertText: String,
    alertColor: string,
    alertVisible: boolean,
}
 



class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            isPwdVisible: false,
            typePwd: "password",
            alertText: "",
            alertColor: "",
            alertVisible: false
        };
}


setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        password: e.currentTarget.value
    })
}

setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        email: e.currentTarget.value
    })
}

showPwd = () => {
    this.setState({
        isPwdVisible: !(this.state.isPwdVisible)
    });
    this.state.isPwdVisible ? this.setState({typePwd: "password"}) : this.setState({typePwd: "text"});
    console.log("ispwdvisible", this.state.isPwdVisible);
}


handleSubmit = (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.email, this.state.password);
    
    fetch(`${APIURL}/jobseeker/login`, {
        method: "POST",
        body: JSON.stringify({
            jobseeker:{
                email: this.state.email, 
                password: this.state.password
            }
        }),
        headers: new Headers({
          "Content-Type": "application/json"
        }),
      })
        .then((response) => response.json())
        .then((data) => {   
            if(!data.ok){
                if(data.error === "Login failed") {
                    this.setTextAlert("danger", `Incorrect password!`);
                    this.onShowAlert();
                }
                if(data.error === "Job seeker does not exist") {
                    this.setTextAlert("danger", `Email " ${this.state.email}" does not exist!`);
                    this.onShowAlert();
                }
            } else{                  
                localStorage.setItem('accountType', 'jobseeker');
                console.log(data);
                console.log(data.sessionJobseekerToken);
                this.props.updateToken(data.sessionJobseekerToken, "jobseeker");
                //   this.props.updateEmail(data.user.email);
                localStorage.setItem('jobseekerName', data.jobseeker.firstname);
                localStorage.setItem('jobseekerLastName', data.jobseeker.lastname);
                console.log(data.jobseeker.email);
                this.props.history.push('/mydashboard');
            }
        })
        .catch((err) => console.log("error: ", err));
        
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

      /* END of ALERT MESSAGES */

 

render() { 
    return ( 
        <>
        <NavHome menu={false}/>
        <Container className="login-container ">
            <div className="vertical-center">
            <Row className="first-row-login">
                <Col xs="4" sm="4" md="4" lg="4" className="pr-0 mt-auto " style={{textAlign: "right"}}>
                    <img className="img-login-green" src={login_green} alt="" />  
                </Col>
                <Col xs="8" sm="8" md="8" lg="8" className="col-spacing-login ">
                    <Card className="card-jobseeker-login">
                        <CardHeader className="login-title ">
                            {/* <Link to="/" className="text-decoration-none">
                                <NavLink ><h2 >TRACKIE</h2></NavLink>
                            </Link> */}
                            <h1><a className="link-title font" href="/">TRACKIE</a></h1>
                        </CardHeader>
                        <CardBody>
                            <CardTitle className="login-subtitle font">
                                <p >Sign into your account here.</p>
                            </CardTitle>
                            
                            <div >
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="icon-field"><BsPersonFill className="icons-login-signup" /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="form-inputs" onChange={this.setEmail} type="email" name="email" placeholder="Email *" value={this.state.email} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon  addonType="prepend">
                                                <InputGroupText className="icon-field"><BsLockFill className="icons-login-signup" /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="form-inputs" onChange={this.setPassword} type={this.state.typePwd} minLength={6} name="password" placeholder="Password *" value={this.state.password} required />
                                            <InputGroupAddon addonType="append" >
                                                    <InputGroupText className="icon-field">
                                                        <span style={{cursor:'pointer'}} onClick={this.showPwd}>
                                                        {this.state.isPwdVisible ? <BsEyeSlashFill className="icons-login-signup"/> : <BsEyeFill className="icons-login-signup"/>}</span>
                                                    </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>

                                    <div className="align-middle text-center">
                                    <Button  className="submit-login-signup font" type="submit" block>Sign in</Button>
                                    </div>
                                    <div>
                                        <p style={{marginBottom: "0px", fontSize: "14px", color: "#637259", fontStyle:"italic"}}>* required fields</p>
                                        <Alert   color={this.state.alertColor} isOpen={this.state.alertVisible}>
                                            {this.state.alertText}
                                        </Alert  >
                                    </div>
                                </Form>                    
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs="4" sm="4" md="4" lg="4"></Col>
                    <Col xs="8" sm="8" md="8" lg="8" className="col-spacing-login login-toggle-row " >
                        <Link to="/signup" >
                            <h6 className="switch-form font">Don't have an account? Sign up.</h6>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Container>

        </>
        );
    }
}

export default withRouter(Login);