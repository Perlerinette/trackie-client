import React, { ComponentProps } from 'react';
import APIURL from '../helpers/environment';

import {Col, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Button} from 'reactstrap';

import signup_purple from '../assets/signup_purple.png';


export interface SignupSchoolProps {
    updateToken: Function,
    // updateEmail: string

}
 
export interface SignupSchoolState {
    schoolname:string,
    email: string,
    password: string,
    isPwdVisible: boolean,
    typePwd: ComponentProps<typeof Input>['type']
}
 


class SignupSchool extends React.Component<SignupSchoolProps, SignupSchoolState> {
    constructor(props: SignupSchoolProps) {
        super(props);
        this.state = { 
            schoolname:"",
            email: "",
            password: "",
            isPwdVisible: false,
            typePwd: "password"
        };
}

setSchoolname = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        schoolname: e.currentTarget.value
    })
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
    this.state.isPwdVisible ? this.setState({typePwd: "password"}) : this.setState({typePwd: "text"})
}


handleSubmit = (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state.email, this.state.password);
    
    fetch(`${APIURL}/school/create`, {
        method: "POST",
        body: JSON.stringify({
            school:{
                schoolname: this.state.schoolname,
                email: this.state.email, 
                password: this.state.password
            }
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(data.sessionSchoolToken);
          this.props.updateToken(data.sessionSchoolToken);
        //   this.props.updateEmail(data.school.email);
          console.log(data.school.email);
        });
        
}

render() { 
    return ( 
        <>
        <Col md="8" className="col-spacing">
        <Card className="card-school">
            <CardHeader className="login-title-school ">
                <h2 ><a className="link-title-school" href="/">TRACKIE</a></h2>
            </CardHeader>
            <CardBody>
            <CardTitle className="login-subtitle">
                <p >Sign up to follow your alumini</p>
            </CardTitle>
            
            <div className="login-form " >
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input onChange={this.setSchoolname} type="text" name="email" placeholder="School name *" value={this.state.schoolname} required />
              </FormGroup>
              <FormGroup>
                    <Input onChange={this.setEmail} type="email" name="email" placeholder="Email *" value={this.state.email} required />
              </FormGroup>
              <FormGroup>
                    <Input onChange={this.setPassword} type={this.state.typePwd} minLength={6} name="password" placeholder="Password *" value={this.state.password} required />
              </FormGroup>

              <div className="align-middle text-center">
                <Button  className="submitBtn-school" type="submit">Create your account</Button>
              </div>
            </Form>
            </div>
            </CardBody>
        </Card>
        </Col>
        <Col md="4" className="col-spacing mt-auto">
            <img  style={{width: "150px"}} src={signup_purple} alt="" />  
        </Col>
        
        {/* <div> */}
            {/* <h6>Already registered? Sign in.</h6> */}
        {/* </div> */}
        </>
        );
    }
}
 
export default SignupSchool;