import React, { ComponentProps } from 'react';
import APIURL from '../helpers/environment';
import {RouteComponentProps, withRouter, Link} from 'react-router-dom';
import {Col, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Button, Container, Row} from 'reactstrap';

import signup_purple from '../assets/signup_purple.png';
import NavHome from '../components/NavHome';


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
          console.log(data.school.email);
          this.props.history.push('/school/dashboard');
        });
        
}

render() { 
    return ( 
        <>
        <NavHome/>
        <br/>
        <br/>
        <Container className="login-container  ">
            <div className="vertical-center">
            <Row >
                    <Col md="8" className="col-spacing">
                    <Card className="card-school-signup">
                        <CardHeader className="login-title-school ">
                            <h1><a className="link-title-school font" href="/">TRACKIE</a></h1>
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
                            <Button  className="submitBtn-school" type="submit" block>Create your account</Button>
                        </div>
                        </Form>
                        </div>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col md="4" className="col-spacing mt-auto">
                        <img  style={{width: "150px"}} src={signup_purple} alt="" />  
                    </Col>
                </Row>
                <Row>                    
                    <Col md="8" className="col-spacing login-toggle-row " >
                        <Link to="/school/login" ><h6 className="switch-form">Already registered? Sign in.</h6></Link>
                    </Col>
                    <Col md="4"></Col>
                </Row>
            </div>
        </Container>
        </>
        );
    }
}
 
export default withRouter(SignupSchool);