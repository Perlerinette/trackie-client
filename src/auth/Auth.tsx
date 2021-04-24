import * as React from 'react';
import './Auth.css';
import Navbar from '../components/NavHome';
import Signup from './Signup';
import Login from './Login';
import SignupSchool from './SignupSchool';
import LoginSchool from './LoginSchool';
import {Container, Col, Row} from 'reactstrap';

export interface AuthProps {
    updateToken: Function,
    accountType: string
}
 
export interface AuthState {
    displayLogin: boolean
}
 



class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = { 
            displayLogin: true
          };
    }


    toggle = () => {
        this.setState({
            displayLogin: !(this.state.displayLogin)
        });
    }
          

    render() { 
        return ( 
            <>
            <Navbar/>
            {console.log("AccountType ", this.props.accountType)}
            {this.props.accountType === "jobseeker" ? 
            
            <Container className="login-container  ">
                <div className="vertical-center">
                <Row >
                    {/* {this.displayComponents} */}
                    {this.state.displayLogin ? <Login updateToken = {this.props.updateToken}/> : 
                            <Signup updateToken = {this.props.updateToken}/> }
                </Row>
                <Row   >
                    {/* <Col className="col-spacing"></Col> */}
                    <Col className="col-spacing login-toggle-row" >
                    {this.state.displayLogin ? <a id="switch-form" onClick={this.toggle}  >Don't have an account? Sign up.</a> : 
                    <a id="switch-form" onClick={this.toggle}>Already registered? Sign in.</a>}
                    </Col>
                    {/* <Col className="col-spacing"></Col> */}
                </Row>
                </div>
            </Container>
            :
            <Container className="login-container  ">
                <div className="vertical-center">
                <Row >
                    {/* {this.displayComponents} */}
                    {this.state.displayLogin ? <LoginSchool updateToken = {this.props.updateToken}/> : 
                            <SignupSchool updateToken = {this.props.updateToken}/> }
                </Row>
                <Row   >
                    <Col className="col-spacing login-toggle-row" >
                    {this.state.displayLogin ? <a id="switch-form-school" onClick={this.toggle}  >Don't have an account? Sign up.</a> : 
                    <a id="switch-form-school" onClick={this.toggle}>Already registered? Sign in.</a>}
                    </Col>
                </Row>
                </div>
            </Container>
            } 
            </>
         );
    }
}
 
export default Auth;