import React, { ComponentProps } from 'react';
import APIURL from '../helpers/environment';

import {Row, Col, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Button, InputGroup, InputGroupAddon, InputGroupText, UncontrolledTooltip} from 'reactstrap';

import signup_green from '../assets/signup_green.png';


export interface SignupProps {
    updateToken: Function,
    // updateEmail: string

}
 
export interface SignupState {
    firstname: string,
    lastname:string,
    email: string,
    password: string,
    sharedata: boolean,
    invitcode?: string
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
            invitcode: ""
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
          console.log(data);
          console.log(data.sessionJobseekerToken);
          this.props.updateToken(data.sessionJobseekerToken);
        //   this.props.updateEmail(data.jobseeker.email);
          console.log(data.jobseeker.email);
        });
        
}

render() { 
    return ( 
        <>
        
        <Col md="8" className="col-spacing">
        <Card className="card-jobseeker">
            <CardHeader className="login-title ">
                <h2><a className="link-title" href="/">TRACKIE</a></h2>
            </CardHeader>
            <CardBody>
            <CardTitle className="login-subtitle">
                <p >Sign up to start tracking your job search</p>
            </CardTitle>
            
            <div className="login-form " >
            <Form onSubmit={this.handleSubmit}>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Input onChange={this.setFirstName} type="text" name="firstname" placeholder="First name *" value={this.state.firstname} required />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Input onChange={this.setLastName} type="text" name="lastname" placeholder="Last name *" value={this.state.lastname} required/>
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Input onChange={this.setInvitcode} type="text" name="invitcode" placeholder="InviteCode " value={this.state.invitcode} />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="icon-field">
                                    <Input addon type="checkbox" id="cb" checked={this.state.sharedata} onChange={this.setCheckbox} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Share data" id="moreInfoToolTip"/>
                            <UncontrolledTooltip placement="top" target="moreInfoToolTip">
                                If checked, you agree to share some information from your job applications. Your name will remain anonymous.
                            </UncontrolledTooltip>
                        </InputGroup>   
                    </FormGroup>
                    </Col>
                </Row>
              <FormGroup>
                    <Input onChange={this.setEmail} type="email" name="email" placeholder="Email *" value={this.state.email} required />
              </FormGroup>
              <FormGroup>
                    <Input onChange={this.setPassword} type="password" minLength={6} name="password" placeholder="Password *"  required />
              </FormGroup>

              <div className="align-middle text-center">
                <Button  className="submitBtn" type="submit">Create your account</Button>
              </div>
            </Form>
            </div>
            </CardBody>
        </Card>
        </Col>
        <Col md="4" className="col-spacing mt-auto">
            <img  style={{width: "150px"}} src={signup_green} alt="" />  
        </Col>
        
        {/* <div> */}
            {/* <h6>Already registered? Sign in.</h6> */}
        {/* </div> */}
        </>
        );
    }
}
 
export default Signup;