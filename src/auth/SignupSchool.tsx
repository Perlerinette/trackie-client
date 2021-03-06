import React, { ComponentProps } from 'react';
import APIURL from '../helpers/environment';
import {RouteComponentProps, withRouter, Link} from 'react-router-dom';
import {Col, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Button, Container, Row, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

import signup_purple from '../assets/signup_purple.png';
import NavHome from '../components/NavHome';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';


export interface SignupSchoolProps extends RouteComponentProps{
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
          localStorage.setItem('accountType', 'school');
          console.log(data);
          console.log(data.sessionSchoolToken);
          this.props.updateToken(data.sessionSchoolToken, "school");
        //   this.props.updateEmail(data.school.email);
          localStorage.setItem('schoolName', data.school.schoolname);
          console.log(data.school.email);
          this.props.history.push('/school/dashboard');
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
            <Row className="first-row-signup">
                    <Col xs="8" sm="8" md="8" lg="8" className="col-spacing pr-0 " style={{marginRight: "auto"}}>
                    <Card className="card-school-signup">
                        <CardHeader className="login-title-school ">
                            <h1><a className="link-title-school font" href="/">TRACKIE</a></h1>
                        </CardHeader>
                        <CardBody>
                        <CardTitle className="login-subtitle font">
                            <p >Sign up to follow alumni</p>
                        </CardTitle>
                        
                        <div >
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input className="form-inputs" onChange={this.setSchoolname} type="text" name="email" placeholder="School name *" value={this.state.schoolname} required />
                        </FormGroup>
                        <FormGroup>
                                <Input className="form-inputs" onChange={this.setEmail} type="email" name="email" placeholder="Email *" value={this.state.email} required />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>                                
                                <Input className="form-inputs" onChange={this.setPassword} type={this.state.typePwd} minLength={6} name="password" placeholder="Password *" value={this.state.password} required />
                                <InputGroupAddon addonType="append" >
                                        <InputGroupText className="icon-fieldSchool">
                                            <span style={{cursor:'pointer'}} onClick={this.showPwd}>
                                            {this.state.isPwdVisible ? <BsEyeSlashFill className="icons-login-signup"/> : <BsEyeFill className="icons-login-signup"/>}</span>
                                        </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>

                        <div className="align-middle text-center">
                            <Button  className="submit-login-signup-school font" type="submit" block>Create your account</Button>
                        </div>
                        <div>
                            <p style={{marginBottom: "0px", fontSize: "14px", color: "#637259", fontStyle:"italic"}}>* required fields</p>
                        </div>
                        </Form>
                        </div>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col xs="4" sm="4" md="4" lg="4"  className="pl-0 mt-auto">
                        <img className="img-signup-purple" src={signup_purple} alt="" />  
                    </Col>
                </Row>
                <Row className="mt-2">                    
                    <Col xs="8" sm="8" md="8" lg="8" className="col-spacing signup-toggle-row " >
                        <Link to="/school/login" >
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
 
export default withRouter(SignupSchool);