import * as React from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { GrCopy } from 'react-icons/gr';
import { RiAddCircleLine, RiCloseCircleLine } from 'react-icons/ri';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledTooltip } from 'reactstrap';
import APIURL from '../../helpers/environment';

export interface CohortCreateProps {
    schoolToken: string,
    getAllCohorts: Function,
    setTextAlert: Function,
    onShowAlert: Function
}
 
export interface CohortCreateState {
    modal: boolean,
    modalcode: boolean,
    namecohort: string,
    newcode: string,
    tooltipOpen: boolean
}
 
class CohortCreate extends React.Component<CohortCreateProps, CohortCreateState> {
    constructor(props: CohortCreateProps) {
        super(props);
        this.state = { 
            modal: false,
            modalcode: false,
            namecohort: "",
            newcode: "",
            tooltipOpen:false
          };
    }

    /* FETCH -> CREATE NEW COHORT  */
    addNew = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        console.log("in create new");
        fetch(`${APIURL}/cohort/create`, {
            method: 'POST',
            body: JSON.stringify({                
                cohort: this.state.namecohort
            }),
            headers:new Headers ({
                'Content-Type': 'application/json', 
                'Authorization': this.props.schoolToken
            })
           }) 
           .then( (res) => res.json())
           .then((data) => {
                console.log("created new cohort: ", data);
                this.setState({ newcode: data.cohort.invitcode})
                this.toggle();
                this.resetInputs();
                this.props.getAllCohorts();
                this.props.setTextAlert("success",`Successfully created cohort "${data.cohort.cohort}" !`);
                this.props.onShowAlert();
                this.toggleCode();
                
           })
           .catch(error => { console.log(error)})
   }

   /* Clear entry after fetching*/
    resetInputs = () => {
        this.setState({
            namecohort: ""
        })
    }

    /* To close/open modal form  */
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    /* To close/open modal form  */
    toggleCode = () => {
        this.setState(prevState => ({
            modalcode: !prevState.modalcode
        }));
    }

    /* SAVE ENTRY for fetch*/
    setName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            namecohort: e.currentTarget.value
        })
    }


    /* COPY CODE*/
    copyCode = (code: string) =>{
        navigator.clipboard.writeText(code);
        this.onTimer();
    }

    onTimer = ()=>{
        this.setState({tooltipOpen: !this.state.tooltipOpen},()=>{
          window.setTimeout(()=>{
            this.setState({tooltipOpen: !this.state.tooltipOpen})
          },1000)
        });
    }


    render() { 
        return ( 
            <>
            <BiAddToQueue id="tooladd" className="icon-cohort-add" onClick={this.toggle}/>
            <UncontrolledTooltip placement="top" target="tooladd">
                Add new
            </UncontrolledTooltip>

            <Modal isOpen={this.state.modal} toggle={this.toggle}  backdrop={true}>
            <Form>
            <ModalHeader className="modal-cohort-create-header font">
                <h2 style={{textTransform: "uppercase"}}>Create a new cohort</h2>
            </ModalHeader>
            <ModalBody style={{textAlign: "center"}}>
                <FormGroup>
                    <Label htmlFor="name" >Cohort name:</Label>
                    <Input name="cohort" value={this.state.namecohort} onChange={this.setName}/>
                </FormGroup>
            </ModalBody>
            <ModalFooter className="modal-cohort-create-header">
                <RiAddCircleLine id="tooltipaddNew" className="icon-cohort-add-modal" onClick={this.addNew}/>
                <UncontrolledTooltip placement="top" target="tooltipaddNew">
                    Add new
                </UncontrolledTooltip>
                <RiCloseCircleLine id="tooltipcancel" className="icon-cohort-cancel-modal" onClick={this.toggle}/>
                <UncontrolledTooltip placement="top" target="tooltipcancel">
                    Cancel
                </UncontrolledTooltip>
            </ModalFooter>
            </Form>
            </Modal>

            {/* MODAL -> SHOW NEW CODE */}
            <Modal isOpen={this.state.modalcode} toggle={this.toggleCode} >
                <ModalHeader  className="modal-cohort-code-header font" cssModule={{'modal-title': 'w-100 text-center'}} toggle={this.toggleCode}>
                    
                    <h2 style={{textTransform: "uppercase"}}>Code to share</h2>
                </ModalHeader>

                <ModalBody >
                    <h6 style={{textAlign: "center"}}>Share this code with alumni of this cohort, and start tracking their job hunt progress.</h6>
                <Input className="modal-code "  type="textarea" value={this.state.newcode} disabled/>
                </ModalBody>

                <ModalFooter className="ml-auto mr-auto">
                    <Button 
                        className="btn-cohort-code font" style={{fontSize: "20px"}}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.copyCode(this.state.newcode)}
                    >
                            Copy code <GrCopy style={{marginLeft: "3px"}}/>
                    </Button>

                </ModalFooter>
            </Modal>

            </>
         );
    }
}
 
export default CohortCreate;