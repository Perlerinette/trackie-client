import React, {ComponentProps} from 'react';
import APIURL from '../helpers/environment';
import {Col, Row, Form, FormGroup, Button, Input, Label, InputGroup, InputGroupAddon, InputGroupText, Container } from 'reactstrap';
import {RiKey2Fill} from 'react-icons/ri';
import { BsLockFill, BsPersonFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { CenterFocusStrong } from '@material-ui/icons';


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
            <Container className={this.state.selectClass} >
            <RiKey2Fill size={80}/>
            <br/>
            <h3>Confirm your identity to access the settings</h3>
            <br/>
            <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Row>
                        <Col md="6">
                        <InputGroup style={{marginLeft: "auto", width: "250px"}}>
                            <Input onChange={this.setPassword} type={this.state.typePwd} minLength={6} name="password" placeholder="Enter your Password" value={this.state.password} required />
                            <InputGroupAddon addonType="append" >
                                    <InputGroupText className="icon-field">
                                        <span style={{cursor:'pointer'}} onClick={this.showPwd}>
                                        {this.state.isPwdVisible ? <BsEyeSlashFill /> : <BsEyeFill />}</span>
                                    </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                    <Col md="6"> <Button  className="submit-login-signup" type="submit" block style={{width: "250px"}}>Unlock</Button></Col>
                    </Row>
                    </FormGroup>

                </Form> 
                </Container>
         );
    }
}
 
export default UnlockSettings;