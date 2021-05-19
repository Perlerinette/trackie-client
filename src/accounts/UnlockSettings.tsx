import React, {ComponentProps} from 'react';
import APIURL from '../helpers/environment';
import {Col, Row, Form, FormGroup, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Container } from 'reactstrap';
import {RiKey2Fill} from 'react-icons/ri';
import {  BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';


export interface UnlockSettingsProps {
    token: string,
   setTextAlert: Function,
   onShowAlert: Function,
   overlayOff: Function
}
 
export interface UnlockSettingsState {
    password: string,    
    isPwdVisible: boolean,
    typePwd: ComponentProps<typeof Input>['type'],
    selectClass: string
}
 
class UnlockSettings extends React.Component<UnlockSettingsProps, UnlockSettingsState> {
    constructor(props: UnlockSettingsProps) {
        super(props);
        this.state = { 
            password: "",
            isPwdVisible: false,
            typePwd: "password",            
            selectClass: "overlay",
          };
    }

    handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        fetch(`${APIURL}/jobseeker/comparePwd`, {
            method: "POST",
            body: JSON.stringify({
                jobseeker:{ 
                    password: this.state.password
                }
            }),
            headers: new Headers({
              "Content-Type": "application/json",
              'Authorization': this.props.token
            }),
          })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                  return response.json();
                } else {                    
                    this.props.setTextAlert("danger",`Wrong password...try again to unlock this account.`);
                    this.props.onShowAlert();
                    throw new Error('Something went wrong ...');
                }
              })
            .then((data) => {            
              console.log(data);
              this.props.overlayOff(); // to remove the overlay and unlock the settings
              this.props.setTextAlert("success",`Account unlocked!`);
              this.props.onShowAlert();
            })
            .catch(error => { console.log(error);})
            
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

    render() { 
        return ( 
            <Container lg="12" className={this.state.selectClass} >
            <RiKey2Fill className="icon-key" />
            <br/>
            <h2 className="text-identity font">Confirm your identity to access the settings</h2>
            <br/>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Row>
                        <Col xs="12" sm="12" md="6">
                            <InputGroup className="pwd-input" >
                                <Input  className="form-inputs" onChange={this.setPassword} type={this.state.typePwd} minLength={6} name="password" placeholder="Enter your Password *" value={this.state.password} required />
                                <InputGroupAddon addonType="append" >
                                    <InputGroupText className="icon-field">
                                        <span style={{cursor:'pointer'}} onClick={this.showPwd}>
                                        {this.state.isPwdVisible ? <BsEyeSlashFill className="icons-login-signup"/> : <BsEyeFill className="icons-login-signup"/>}</span>
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                        <Col xs="12" sm="12" md="6"> 
                            <Button  className="submit-login-signup btn-unlock font" type="submit" block >Unlock</Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form> 
            </Container>
         );
    }
}
 
export default UnlockSettings;