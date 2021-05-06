import * as React from 'react';
import APIURL from '../helpers/environment';
import JobApp from '../interfaces/InterfaceJobApp';
import {TiEdit} from 'react-icons/ti';
import {RiCheckboxCircleLine, RiCloseCircleLine} from 'react-icons/ri';
import {Form, FormGroup, Label, Input, Modal, ModalHeader, ModalFooter, ModalBody, Col, Row, UncontrolledTooltip} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export interface JobAppEditProps {
   token: string,
   getAllApplications: Function,
   jobapp: JobApp,
   setTextAlert: Function,
   onShowAlert: Function
}
 
export interface JobAppEditState {
    jobtitle: string, 
    company: string,
    applicationdate: string,
    jobdescription: string,
    location: string,
    status: string,
    modal: boolean,   
    testDate: Date
}
 
class JobAppEdit extends React.Component<JobAppEditProps, JobAppEditState> {
    constructor(props: JobAppEditProps) {
        super(props);
        this.state = { 
            jobtitle: this.props.jobapp.jobtitle, 
            company: this.props.jobapp.company,
            applicationdate: this.props.jobapp.applicationdate,
            jobdescription: this.props.jobapp.jobdescription,
            location: this.props.jobapp.location,
            status: this.props.jobapp.status,
            modal: false,            
            testDate: new Date()
          };
    }
 
    
    editJobapp = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        console.log("in edit new");
        fetch(`${APIURL}/jobapplication/edit/${this.props.jobapp.id}`, {
            method: 'PUT',
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
           .then((jobapp) => {
                console.log("edited jobapp: ", jobapp);
                this.toggle();
                this.props.getAllApplications();
                this.props.setTextAlert("success",`Job Application for ${this.props.jobapp.company} has been updated !`);
                this.props.onShowAlert();
                
           })
           .catch(error => { console.log(error)})
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

    //to close/open modal form 
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        console.log("modal :", this.state.modal);
    }

    getMMDDYYYY = (date: string) => {
        
        let year = date.slice(0,4);
        let month = date.slice(5,7);
        let day = date.slice(8,10);
        date = month + '/' + day + '/' + year;
        
        return date;
    }

    handleChangeDate = (date: Date) => {
        console.log(date.toISOString());
        this.setState({
            testDate: date,
            applicationdate: this.getMMDDYYYY(date.toISOString())
        })
    }


    render() { 
        return ( 
            <>
            <TiEdit  className="icon-edit" onClick={this.toggle}/>
           
            <Modal isOpen={this.state.modal} toggle={this.toggle}  backdrop={true}>
     
            <Form>
            <ModalHeader  className="modal-edit-header ">
                <h4>Something to update?</h4>
            </ModalHeader>
            <ModalBody>
                
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Date of Application:</Label>
                                <DatePicker dateFormat= "MM/dd/yyyy" placeholderText=" " selected= {this.state.testDate} onChange= {this.handleChangeDate} />
                            </FormGroup>
                            {/* <FormGroup>
                                <Label htmlFor="date" >Date of Application:</Label>
                                <Input name="date" value={this.state.applicationdate} onChange={this.setDate}>Date of Application: </Input>
                            </FormGroup> */}
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
                                    <option value="Pending">Pending</option>
                                    <option value="Interviewed">Interviewed</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Declined">Declined</option>
                                    <option value="Hired">Hired</option>
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
                <RiCheckboxCircleLine id="tooltipaddNew" className="icon-add-modal" onClick={this.editJobapp}/>
                <UncontrolledTooltip placement="top" target="tooltipaddNew">
                    Confirm
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
 
export default JobAppEdit;