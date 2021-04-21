import React, { ComponentProps} from 'react';
import APIURL from '../helpers/environment';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Col, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Button, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { BsLockFill, BsPersonFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import login_green from '../assets/login_green.png';


export interface LoginProps extends RouteComponentProps {
    // updateToken: (token: string, tokenType: string) => void,
    updateToken: Function
    // updateEmail: string

}
 
export interface LoginState {
    firstname: string,
    email: string,
    password: string,
    isPwdVisible: boolean,
    typePwd: ComponentProps<typeof Input>['type'],
}
 



class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = { 
            firstname: "",
            email: "",
            password: "",
            isPwdVisible: false,
            typePwd: "password"
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
          localStorage.setItem('accountType', 'jobseeker');
          console.log(data);
          console.log(data.sessionJobseekerToken);
          this.props.updateToken(data.sessionJobseekerToken, "jobseeker");
        //   this.props.updateEmail(data.user.email);
          this.setState({firstname: data.jobseeker.firstname});
          console.log(data.jobseeker.email);
          this.props.history.push('/dashboard');
        });
        
}

render() { 
    return ( 
        <>
        <Col md="4" className="pr-5 mt-auto " style={{textAlign: "right"}}>
            <img  style={{width: "150px"}} src={login_green} alt="" />  
        </Col>
        <Col md="8" className="col-spacing">
            <Card className="card-jobseeker">
                <CardHeader className="login-title ">
                    {/* <Link to="/" className="text-decoration-none">
                        <NavLink ><h2 >TRACKIE</h2></NavLink>
                    </Link> */}
                    <h2><a className="link-title" href="/">TRACKIE</a></h2>
                </CardHeader>
                <CardBody>
                    <CardTitle className="login-subtitle">
                        <p >Sign into your account here.</p>
                    </CardTitle>
                    
                    <div className="login-form " >
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="icon-field"><BsPersonFill /></InputGroupText>
                                    </InputGroupAddon>
                                    <Input onChange={this.setEmail} type="email" name="email" placeholder="Email *" value={this.state.email} required />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon  addonType="prepend">
                                        <InputGroupText className="icon-field"><BsLockFill /></InputGroupText>
                                    </InputGroupAddon>
                                    <Input onChange={this.setPassword} type={this.state.typePwd} minLength={6} name="password" placeholder="Password *" value={this.state.password} required />
                                    <InputGroupAddon addonType="append" >
                                            <InputGroupText className="icon-field">
                                                <span style={{cursor:'pointer'}} onClick={this.showPwd}>
                                                {this.state.isPwdVisible ? <BsEyeSlashFill /> : <BsEyeFill />}</span>
                                            </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            <div className="align-middle text-center">
                            <Button  className="submitBtn" type="submit" block>Sign in</Button>
                            </div>
                        </Form>                    
                    </div>
                </CardBody>
            </Card>
        </Col>
        </>
        );
    }
}

export default withRouter(Login);