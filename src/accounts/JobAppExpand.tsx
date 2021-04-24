import * as React from 'react';
import JobApp from '../interfaces/Interfaces';
import { BiAddToQueue, BiExpand } from 'react-icons/bi';
import {RiAddCircleLine, RiCloseCircleLine} from 'react-icons/ri';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalFooter, ModalBody, Col, Row, UncontrolledTooltip,  CardText, CardSubtitle, CardTitle,} from 'reactstrap';

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
        console.log("modal :", this.state.modal);
    }

    render() { 
        return (
            <>
                    <BiExpand id="tooltipOpen" className="icon-open" onClick={this.toggle}/>
                        <UncontrolledTooltip placement="top" target="tooltipOpen">
                            Open
                        </UncontrolledTooltip>

                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader style={{textAlign: "center"}}>
                            <Row >
                            <Col md="6" className="text-align-left">
                            {this.props.jobapp.applicationdate}
                            </Col>
                            <Col md="6" className="text-align-right">
                            {this.props.jobapp.status} 
                            </Col>
                            </Row>
                        </ModalHeader>
                        <ModalBody style={{textAlign: "center"}}>
                            <CardTitle>
                                {this.props.jobapp.jobtitle}
                            </CardTitle>
                            <CardSubtitle>
                                 {this.props.jobapp.company}
                            </CardSubtitle>
                            <CardSubtitle>
                            {this.props.jobapp.location}
                            </CardSubtitle>
                            <CardText>
                                Description: {this.props.jobapp.jobdescription === ''? "none" : this.props.jobapp.jobdescription}
                            </CardText>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggle}>close</Button>
                        </ModalFooter>
                        </Modal>
            </>
         );
    }
}
 
export default JobAppExpand;