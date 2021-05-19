import React, { ComponentProps}  from 'react';
import APIURL from '../helpers/environment';
import './Auth.css';
import {RouteComponentProps, withRouter, Link} from 'react-router-dom';
import {Row, Col, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Button, InputGroup, InputGroupAddon, InputGroupText, UncontrolledTooltip, Container} from 'reactstrap';

import signup_green from '../assets/signup_green.png';
import NavHome from '../components/NavHome';
import { BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';


export interface SignupProps extends RouteComponentProps{
    updateToken: Function,
    // updateEmail: string

}
 
export interface SignupState {
    firstname: string,
    lastname:string,
    email: string,
    password: string,
    sharedata: boolean,
    invitcode?: string,
    isPwdVisible: boolean,
    typePwd: ComponentProps<typeof Input>['type'],
}
 


class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = { 
            firstname: "",
            lastname:"",
            email: "",
            password: "",
            sharedata: false,
            invitcode: "",
            isPwdVisible: false,
            typePwd: "password"
        };
}

setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        password: e.currentTarget.value
    })
}

showPwd = () => {
    this.setState({
        isPwdVisible: !(this.state.isPwdVisible)
    });
    this.state.isPwdVisible ? this.setState({typePwd: "password"}) : this.setState({typePwd: "text"});
    console.log("ispwdvisible", this.state.isPwdVisible);
}

setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        email: e.currentTarget.value
    })
}

setFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        firstname: e.currentTarget.value
    })
}

setLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        lastname: e.currentTarget.value
    })
}

setInvitcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        invitcode: e.currentTarget.value
    })
}


setCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.checked){
        this.setState({
            sharedata: true
        })
    } else {
        this.setState({
            sharedata: false
        })
    }
}


handleSubmit = (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state.email, this.state.password);
    
    fetch(`${APIURL}/jobseeker/create`, {
        method: "POST",
        body: JSON.stringify({
            jobseeker:{
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email, 
                password: this.state.password ,
                sharedata: this.state.sharedata,
                invitcode: this.state.invitcode
            }
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('accountType', 'jobseeker');
          console.log(data);
          console.log(data.sessionJobseekerToken);
          this.props.updateToken(data.sessionJobseekerToken, "jobseeker");
        //   this.props.updateEmail(data.jobseeker.email);
          localStorage.setItem('jobseekerName', data.jobseeker.firstname);
          console.log(data.jobseeker.email);
          this.props.history.push('/mydashboard');
        });
        
}

render() { 
    return ( 
        <>
        <NavHome menu={false}/>
        <br/>
        <br/>
        <Container className="login-container  ">
            <div className="vertical-center">
            <Row className="first-row-signup" >
                <Col xs="8" sm="8" md="8" lg="8" className="col-spacing pr-0 " style={{marginRight: "auto"}}>
                <Card className="card-jobseeker-signup" >
                    <CardHeader className="login-title ">
                        <h1><a className="link-title font" href="/">TRACKIE</a></h1>
                    </CardHeader>
                    <CardBody>
                    <CardTitle className="login-subtitle font">
                        <p >Sign up to start tracking your job search</p>
                    </CardTitle>
                    
                    <div >
                    <Form onSubmit={this.handleSubmit}>
                        <Row form >
                            <Col xs="6" sm="6" md="6" lg="6">
                            <FormGroup>
                                <Input className="form-inputs" onChange={this.setFirstName} type="text" name="firstname" placeholder="First name *" value={this.state.firstname} required />
                            </FormGroup>
                            </Col>
                            <Col xs="6" sm="6" md="6" lg="6">
                            <FormGroup>
                                <Input className="form-inputs" onChange={this.setLastName} type="text" name="lastname" placeholder="Last name *" value={this.state.lastname} required/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col xs="6" sm="6" md="6" lg="6">
                            <FormGroup>
                                <Input className="form-inputs" onChange={this.setInvitcode} type="text" name="invitcode" placeholder="InviteCode " value={this.state.invitcode} />
                            </FormGroup>
                            </Col>
                            <Col xs="6" sm="6" md="6" lg="6">
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="icon-field">
                                            <Input addon type="checkbox" id="cb" checked={this.state.sharedata} onChange={this.setCheckbox} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="form-inputs" placeholder="Share data" id="moreInfoToolTip"/>
                                    <UncontrolledTooltip placement="top" target="moreInfoToolTip">
                                        If checked, you agree to share some information from your job applications. Your name will remain anonymous.
                                    </UncontrolledTooltip>
                                </InputGroup>   
                            </FormGroup>
                            </Col>
                        </Row>
                    <FormGroup>
                        <Input className="form-inputs" onChange={this.setEmail} type="email" name="email" placeholder="Email *" value={this.state.email} required />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>                            
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
                        <Button  className="submit-login-signup font" type="submit" block>Create your account</Button>
                    </div> 
                    <div>
                        <p style={{marginBottom: "0px", fontSize: "14px", color: "#637259", fontStyle:"italic"}}>* required fields</p>
                    </div>
                    </Form>
                    </div>
                    </CardBody>
                </Card>
                </Col>
                <Col xs="4" sm="4" md="4" lg="4"  className="pl-0 mt-auto" >
                    <img  className="img-signup-green" src={signup_green} alt="" />  
                </Col>
                </Row>
                <Row className="mt-2">                    
                    <Col xs="8" sm="8" md="8" lg="8" className=" signup-toggle-row " >
                        <Link to="/login" >
                            <h6 className="switch-form font">Already registered? Sign in.</h6>
                        </Link>
                    </Col>
                    <Col xs="4" sm="4" md="4" lg="4"></Col>
                </Row>
            </div>
        </Container>
        </>
        );
    }
}
 
export default withRouter(Signup);