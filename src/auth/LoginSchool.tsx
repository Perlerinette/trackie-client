import React, { ComponentProps} from 'react';
import APIURL from '../helpers/environment';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {Col, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Button, InputGroup, InputGroupAddon, InputGroupText, Row, Container, Alert} from 'reactstrap';
import { BsLockFill, BsPersonFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import login_purple from '../assets/login_purple.png';
import NavHome from '../components/NavHome';


export interface LoginSchoolProps extends RouteComponentProps{
    updateToken: Function,
    // updateEmail: string

}
 
export interface LoginSchoolState {
    email: string,
    password: string,
    isPwdVisible: boolean,
    typePwd: ComponentProps<typeof Input>['type'],
    alertText: String,
    alertColor: string,
    alertVisible: boolean,
}
 



class LoginSchool extends React.Component<LoginSchoolProps, LoginSchoolState> {
    constructor(props: LoginSchoolProps) {
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
            if(!data.ok){
                if(data.error === "Login failed") {
                    this.setTextAlert("danger", `Incorrect password!`);
                    this.onShowAlert();
                }
                if(data.error === "School does not exist") {
                    this.setTextAlert("danger", `Email " ${this.state.email}" does not exist!`);
                    this.onShowAlert();
                }
            } else{  
                localStorage.setItem('accountType', 'school');
                console.log(data);
                console.log(data.sessionSchoolToken);
                this.props.updateToken(data.sessionSchoolToken, "school");
                    //   this.props.updateEmail(data.school.email);
                localStorage.setItem('schoolName', data.school.schoolname);
                console.log(data.school.email);
                this.props.history.push('/school/dashboard');
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
        <Container className="login-container  ">
            <div className="vertical-center">
            <Row className="first-row-login-school">
                <Col  xs="4" sm="4" md="4" lg="4" className="pr-0 mt-auto " style={{textAlign: "right"}}>
                    <img  className="img-login-purple" src={login_purple} alt="" />  
                </Col>
                <Col xs="8" sm="8" md="8" lg="8" className="col-spacing-login-school ">
                    <Card className="card-school-login">
                        <CardHeader className="login-title-school ">
                            {/* <Link to="/" className="text-decoration-none">
                                <NavLink ><h2 >TRACKIE</h2></NavLink>
                            </Link> */}
                            <h1 ><a className="link-title-school font" href="/">TRACKIE</a></h1>
                        </CardHeader>
                        <CardBody>
                            <CardTitle className="login-subtitle font">
                                <p >Sign into your school account here.</p>
                            </CardTitle>
                            
                            <div>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="icon-fieldSchool"><BsPersonFill className="icons-login-signup"/></InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="form-inputs" onChange={this.setEmail} type="email" name="email" placeholder="Email *" value={this.state.email} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon  addonType="prepend">
                                                <InputGroupText className="icon-fieldSchool"><BsLockFill className="icons-login-signup"/></InputGroupText>
                                            </InputGroupAddon>
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
                                    <Button  className="submit-login-signup-school font" type="submit" block>Sign in</Button>
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
                    <Col xs="8" sm="8" md="8" lg="8" className="col-spacing-login-school login-toggle-row " >
                        <Link to="/school/signup" >
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

export default withRouter(LoginSchool);