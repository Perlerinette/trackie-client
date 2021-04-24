import * as React from 'react';
import APIURL from '../helpers/environment';
import JobApp from '../interfaces/Interfaces';
import { BiAddToQueue } from 'react-icons/bi';
import {RiAddCircleLine, RiCloseCircleLine} from 'react-icons/ri';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalFooter, ModalBody, Col, Row, UncontrolledTooltip} from 'reactstrap';

export interface JobAppCreateProps {
   token: string,
   getAllApplications: Function
}
 
export interface JobAppCreateState {
    jobtitle: string, 
    company: string,
    applicationdate: string,
    jobdescription: string,
    location: string,
    status: string,
    modal: boolean
   
}
 
class JobAppCreate extends React.Component<JobAppCreateProps, JobAppCreateState> {
    constructor(props: JobAppCreateProps) {
        super(props);
        this.state = { 
            jobtitle: "", 
            company: "",
            applicationdate: "",
            jobdescription: "",
            location: "",
            status: "",
            modal: false
          };
    }

    
    createNew = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        console.log("in create new");
        fetch(`${APIURL}/jobapplication/create`, {
            method: 'POST',
            body: JSON.stringify({
                jobapp:{
                    jobtitle: this.state.jobtitle, 
                    company: this.state.company,
                    applicationdate:this.state.applicationdate,
                    jobdescription: this.state.jobdescription,
                    location: this.state.location,
                    status: this.state.status
                }
        }),
            headers:new Headers ({
                'Content-Type': 'application/json', 
                'Authorization': this.props.token
            })
           }) 
           .then( (res) => res.json())
           .then((jobapps) => {
                console.log("created new jobapp: ", jobapps);
                this.toggle();
                this.resetInputs();
                this.props.getAllApplications();
                
           })
           .catch(error => { console.log(error)})
   }

   resetInputs = () => {
       this.setState({
            jobtitle: "",
            company: "",
            applicationdate: "",
            jobdescription: "",
            location: "",
            status: ""
       })
   }


    setDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            jobdescription: e.currentTarget.value
        })
    }

    setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            applicationdate: e.currentTarget.value
        })
    }

    setJobTitle = (e: React.ChangeEvent<HTMLInputElement> ) => {
        this.setState({
            jobtitle: e.currentTarget.value
        })
    }

    setStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    setLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            location: e.currentTarget.value
        })
    }

    setCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            company: e.currentTarget.value
        })
    }

    //to close modal form in case we change our mind
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        console.log("modal :", this.state.modal);
    }


    render() { 
        return ( 
            <>
         {/* <div className="dash-wrapper">  */}
            <BiAddToQueue id="tooltipadd" className="icons-add-download" onClick={this.toggle}/>
            <UncontrolledTooltip placement="top" target="tooltipadd">
                Log new
            </UncontrolledTooltip>
           
            <Modal isOpen={this.state.modal} toggle={this.toggle}  backdrop={true}>
     
            <Form>
            <ModalHeader toggle={this.toggle} className="modal-create-header ">
                <h4>Applied somewhere?</h4>
                <p>Log your job applications here.</p>
            </ModalHeader>
            <ModalBody>
                
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label htmlFor="date" >Date of Application:</Label>
                                <Input name="date" value={this.state.applicationdate} onChange={this.setDate}>Date of Application: </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='jobtitle' >Job Title:</Label>
                                <Input type="select" name='jobtitle' value={this.state.jobtitle} onChange={this.setJobTitle}>
                                    <option value=""></option>
                                    <option value="Front-End Developer">Front-End Developer</option>
                                    <option value="Back-End Developer">Back-End Developer</option>
                                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                                    <option value="Other">Other</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="company" >Company Name:</Label>
                                <Input name="company" value={this.state.company} onChange={this.setCompany}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="location" >Location:</Label>
                                <Input name="location" value={this.state.location} onChange={this.setLocation}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='status' >Status:</Label>
                                <Input type="select" name='status' value={this.state.status} onChange={this.setStatus}>
                                    <option value=""></option>
                                    <option value="pending">Pending</option>
                                    <option value="interviewed">Interviewed</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Declined">Declined</option>
                                    <option value="Accepted">Hired</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label htmlFor="description">Description:</Label>
                                <Input name="description" type="textarea" style={{height: "370px"}} columns={10} value={this.state.jobdescription} onChange={this.setDescription}/>
                            </FormGroup>
                        </Col>
                    </Row>
                
            </ModalBody>
            <ModalFooter className="modal-create-header">
                <RiAddCircleLine id="tooltipaddNew" className="icon-add-modal" onClick={this.createNew}/>
                <UncontrolledTooltip placement="top" target="tooltipaddNew">
                    Add new
                </UncontrolledTooltip>
                <RiCloseCircleLine id="tooltipcancel" className="icon-cancel-modal" onClick={this.toggle}/>
                <UncontrolledTooltip placement="top" target="tooltipcancel">
                    Cancel
                </UncontrolledTooltip>
            </ModalFooter>
            </Form>
            </Modal>
           
            </>
         );
    }
}
 
export default JobAppCreate;