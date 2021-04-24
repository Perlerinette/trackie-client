import * as React from 'react';
import APIURL from '../helpers/environment';
import JobApp from '../interfaces/Interfaces';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalFooter, ModalBody, Col} from 'reactstrap';

export interface JobAppEditProps {
   token: string,
   jobappsData: Array<JobApp>,
}

export interface JobAppEditState {
    jobtitle: string, 
    company: string,
    applicationdate: string,
    jobdescription: string,
    location: string,
    status: string,
    isOpen: boolean
   
}
 
class JobAppEdit extends React.Component<JobAppEditProps, JobAppEditState> {
    constructor(props: JobAppEditProps) {
        super(props);
        this.state = { 
            jobtitle: "", 
            company: "",
            applicationdate: "",
            jobdescription: "",
            location: "",
            status: "",
            isOpen: true
          };
    }

    
    createNew = () => {
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
                this.resetInputs();
             
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

    jobAppsMapper = () => {
        return 
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

    //to close modal form in case we change our mind
    toggle = () => {
        this.setState({
            isOpen: !(this.state.isOpen)
        });
    }


    render() { 
        return ( 
            <>
           <div className="dash-wrapper">
           <br/>
            <Modal isOpen={true} toggle={this.toggle}>
            <ModalHeader>
                <h4>Applied somewhere?</h4>
                <p>Log your job applications here.</p>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={this.createNew}>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="date" />
                            <Input name="date" value={this.state.applicationdate} onChange={this.setDate}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='jobtitle' />
                            <Input type="select" name='jobtitle' value={this.state.jobtitle} onChange={this.setJobTitle}>
                                <option value="front">Front-End Developer</option>
                                <option value="end">Back-End Developer</option>
                                <option value="full">Full-Stack Developer</option>
                                <option value="other">Other</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="location" />
                            <Input name="location" value={this.state.location} onChange={this.setLocation}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='status' />
                            <Input type="select" name='status' value={this.state.status} onChange={this.setStatus}>
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
                            <Label htmlFor="description">Description</Label>
                            <Input name="description" value={this.state.jobdescription} onChange={this.setDescription}/>
                        </FormGroup>
                    </Col>
                    </Form>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" onClick={this.toggle}>Update!</Button>
            </ModalFooter>
                  
            </Modal>

           </div>
            </>
         );
    }
}
 
export default JobAppEdit;