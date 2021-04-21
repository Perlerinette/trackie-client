import React, { ComponentProps} from 'react';
import APIURL from '../helpers/environment';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Col, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Button, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { BsLockFill, BsPersonFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import login_purple from '../assets/login_purple.png';


export interface LoginSchoolProps extends RouteComponentProps{
    updateToken: Function,
    // updateEmail: string

}
 
export interface LoginSchoolState {
    email: string,
    password: string,
    isPwdVisible: boolean,
    typePwd: ComponentProps<typeof Input>['type']
}
 



class LoginSchool extends React.Component<LoginSchoolProps, LoginSchoolState> {
    constructor(props: LoginSchoolProps) {
        super(props);
        this.state = { 
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
    
    fetch(`${APIURL}/school/login`, {
        method: "POST",
        body: JSON.stringify({
            school:{
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
          console.log("accountType set");
          console.log(data);
          console.log(data.sessionSchoolToken);
          this.props.updateToken(data.sessionSchoolToken, "school");
        //   this.props.updateEmail(data.school.email);
          console.log(data.school.email);
          console.log("school login fetch DONE");
          this.props.history.push('/school/dashboard');
        });
    
}

render() { 
    return ( 
        <>
        <Col md="4" className="pr-5 mt-auto col-spacing" style={{textAlign: "right"}}>
            <img  style={{width: "150px"}} src={login_purple} alt="" />  
        </Col>
        <Col md="8" className="col-spacing">
            <Card className="card-school">
                <CardHeader className="login-title-school ">
                    {/* <Link to="/" className="text-decoration-none">
                        <NavLink ><h2 >TRACKIE</h2></NavLink>
                    </Link> */}
                    <h2 ><a className="link-title-school" href="/">TRACKIE</a></h2>
                </CardHeader>
                <CardBody>
                    <CardTitle className="login-subtitle">
                        <p >Sign into your school account here.</p>
                    </CardTitle>
                    
                    <div className="login-form " >
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="icon-fieldSchool"><BsPersonFill /></InputGroupText>
                                    </InputGroupAddon>
                                    <Input onChange={this.setEmail} type="email" name="email" placeholder="Email *" value={this.state.email} required />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon  addonType="prepend">
                                        <InputGroupText className="icon-fieldSchool"><BsLockFill /></InputGroupText>
                                    </InputGroupAddon>
                                    <Input onChange={this.setPassword} type={this.state.typePwd} minLength={6} name="password" placeholder="Password *" value={this.state.password} required />
                                    <InputGroupAddon addonType="append" >
                                            <InputGroupText className="icon-fieldSchool">
                                                <span style={{cursor:'pointer'}} onClick={this.showPwd}>
                                                {this.state.isPwdVisible ? <BsEyeSlashFill /> : <BsEyeFill />}</span>
                                            </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            <div className="align-middle text-center">
                            <Button  className="submitBtn-school" type="submit" block>Sign in</Button>
                            </div>
                        </Form>                    
                    </div>
                </CardBody>
            </Card>
        </Col>
        <Col md="2"></Col>
        </>
        );
    }
}

export default withRouter(LoginSchool);