import * as React from 'react';
import APIURL from '../../helpers/environment';
import './DashboardSchool.css';
import './CohortsSchool.css';
import NavSchool from './NavSchool';
import Cohort from '../../interfaces/InterfaceCohort';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Alert, Button, Container, Table, UncontrolledTooltip } from 'reactstrap';
import { GrCopy } from 'react-icons/gr';
import CohortCreate from './CohortCreate';

export interface CohortsSchoolProps {
    schoolToken: string,
    logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface CohortsSchoolState {
    alertText: String,
    alertColor: string,
    alertVisible: boolean,
    arrayCohorts: Cohort[],    
    tooltipOpen: boolean,
}
 
class CohortsSchool extends React.Component<CohortsSchoolProps, CohortsSchoolState> {
    constructor(props: CohortsSchoolProps) {
        super(props);
        this.state = { 
            alertText: "",
            alertColor: "",
            alertVisible: false,
            arrayCohorts: [],            
            tooltipOpen: false 
          };
    }

    componentDidMount() {
        this.getAllCohorts();     
    }

     getAllCohorts = () => {
        fetch(`${APIURL}/cohort/getCohort`, {
            method: 'GET',
                headers:new Headers ({
                    'Content-Type': 'application/json', 
                    'Authorization': this.props.schoolToken
                })
            }) 
            .then( (res) => res.json())
            .then((cohorts) => {                
                this.setState({ arrayCohorts: cohorts })
                console.log(this.state.arrayCohorts);
            })
            .catch(error => { console.log(error)})
    }


    cohortsMapper = (arr: Cohort[]) => {
        console.log("in cohortMapper");
        return(arr.map( (cohort, index) => {
            return(
                <>
                <tr key={index} className='cohort-table'>
                    <td className='row-cohort-table'>{cohort.cohort}</td>
                    <td className='row-cohort-table'>
                        {/* {cohort.invitcode} */}
                        <Button id="toolcopy" className="btn-cohort-code" onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.copyCode(cohort.invitcode)}>
                        {cohort.invitcode} <GrCopy/>
                        </Button>
                        <UncontrolledTooltip placement="top" target="toolcopy" isOpen={this.state.tooltipOpen}>
                            Copied to clipboard!
                        </UncontrolledTooltip>
                                    
                    </td>
                    <td className='row-cohort-table'>
                        {/* delete job app */}
                        <RiDeleteBinLine className="icon-school-delete" onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => this.deleteCohort(cohort)}/>
                        
                    </td>
                </tr>
                </>
            )
        }))
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



     /* DELETE */
     deleteCohort = (cohort: Cohort) => {
        // save data to display in alert message
        var deleteCohort = cohort.cohort;

        // fetch and delete from database
        fetch(`${APIURL}/cohort/delete/${cohort.id}`, {
            method: 'DELETE',
                headers:new Headers ({
                    'Content-Type': 'application/json', 
                    'Authorization': this.props.schoolToken
                })
            }) 
            .then( () => {
                this.getAllCohorts();
                this.setTextAlert("success", `Cohort " ${deleteCohort} " has been deleted !`);
                // display success alert
                this.onShowAlert();
            })
            .catch(error => console.log(error));
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



    render() { 
        return ( 
            <>
            <NavSchool logout={this.props.logout}/>
            <div className="dash-wrapper-school">
            <br/>
                <div className="cadre-title-school" style={{width: "250px"}}>
                    <h4 >{localStorage.getItem('schoolName')}'s </h4>
                    <h1 className='font'>- Cohorts -</h1>
                </div>
                <br/>

                <Container className="tableView ">
                <br/>
                <div className="icon-cohort-add-wrapper">
                    {/* create new job application */}
                    <CohortCreate schoolToken={this.props.schoolToken} getAllCohorts={this.getAllCohorts} setTextAlert={this.setTextAlert} onShowAlert={this.onShowAlert} />
                </div>
                <br/>
                <Alert   color={this.state.alertColor} isOpen={this.state.alertVisible}>
                    {this.state.alertText}
                </Alert  >
                
                <br/>
                <Table hover >
                    <thead>
                        <tr>
                            <th>Cohort</th>
                            <th>Associated code</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.cohortsMapper(this.state.arrayCohorts)}
                    </tbody>
                </Table>
                <br/>
            </Container>
            

            <br/>
            <br/>
            </div>
            </>
         );
    }
}
 
export default CohortsSchool;