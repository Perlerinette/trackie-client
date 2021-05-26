import * as React from 'react';
import JobApp from '../interfaces/InterfaceJobApp';
import './MyJobApps.css';
import {BiExpand, BiMapPin } from 'react-icons/bi';
import {FormGroup, Label, Input, Modal,ModalFooter, ModalBody, Col, Row, UncontrolledTooltip, CardSubtitle, CardTitle, Container,} from 'reactstrap';
import { BsCheckCircle } from 'react-icons/bs';

export interface JobAppExpandProps {
    jobapp: JobApp
}
 
export interface JobAppExpandState {
    modal:boolean
}
 
class JobAppExpand extends React.Component<JobAppExpandProps, JobAppExpandState> {
    constructor(props: JobAppExpandProps) {
        super(props);
        this.state = { 
            modal: false  };
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        // console.log("modal :", this.state.modal);
        console.log("jobapp: ", this.props.jobapp);
    }

    render() { 
        return (
            <>
                    <BiExpand id="tooltipOpen" className="icon-open" onClick={this.toggle}/>
                        <UncontrolledTooltip placement="top" target="tooltipOpen">
                            Open
                        </UncontrolledTooltip>

                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <Container className="ml-auto mr-auto mt-3 text-center">
                            <Row>
                                <Col>
                                <h5>{this.props.jobapp.applicationdate}</h5>
                                </Col>
                                <Col>
                                {this.props.jobapp.status === 'Rejected'? 
                            <>
                                <h5 style={{color:'red'}}> {this.props.jobapp.status} 😒 </h5>
                            </>
                            :
                                <h5>Status: {this.props.jobapp.status} 😃</h5>
                            }
                                </Col>
                            </Row>
                        </Container>
                        <ModalBody style={{textAlign: "center"}}>
                            <CardTitle>
                                <h4 style={{backgroundColor:'#dafbc6', color: '#637259'}}>{this.props.jobapp.jobtitle}</h4>
                            </CardTitle>
                            <CardSubtitle>
                                 <h5>at {this.props.jobapp.company}</h5>
                            </CardSubtitle>
                            <br/>
                            <CardSubtitle>
                             <h6><BiMapPin/> {this.props.jobapp.location}</h6>
                            </CardSubtitle>
                            <br/>
                            <FormGroup>
                                <Label htmlFor="description"><h6>About this position:</h6></Label>
                                <Input name="description" type="textarea" style={{height: "250px", borderColor: "#dafbc6", border: "2px solid #dafbc6"}} columns={4} value={this.props.jobapp.jobdescription === ''? "-- nothing specified --" : this.props.jobapp.jobdescription} readOnly/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter  className="ml-auto mr-auto">
                            <BsCheckCircle className="icon-ok-modal" onClick={this.toggle}/>
                            {/* <Button onClick={this.toggle}>close</Button> */}
                        </ModalFooter>
                        </Modal>
                        <br/>
                        <br/>
            </>
         );
    }
}
 
export default JobAppExpand;