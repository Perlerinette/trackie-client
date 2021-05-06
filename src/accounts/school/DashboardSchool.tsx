import * as React from 'react';
import { GiGraduateCap } from 'react-icons/gi';
import { Button,Container, Row } from 'reactstrap';
import APIURL from '../../helpers/environment';
import Cohort from '../../interfaces/InterfaceCohort';
import './DashboardSchool.css';
import NavSchool from './NavSchool';
import InfoForDashboardSchool from './InfoForDashboardSchool';
import {FaRegHandPointRight} from 'react-icons/fa';

export interface DashboardSchoolProps {
    schoolToken: string,
    logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface DashboardSchoolState {
    cohorts: Cohort[],
    cohortToDisplay: string,
    btnCohortClicked: boolean
}
 
class DashboardSchool extends React.Component<DashboardSchoolProps, DashboardSchoolState> {
    constructor(props: DashboardSchoolProps) {
        super(props);
        this.state = { 
            cohorts: [],
            cohortToDisplay: "",
            btnCohortClicked: false
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
                console.log('cohorts: ', cohorts);
                this.setState({
                    cohorts: cohorts
                })

            })
            .catch(error => { console.log(error)})
    }

    // Button effect on hover
    // hoverBtnCohort= (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    //     (e.target as HTMLInputElement).style.color = "white";
    //     (e.target as HTMLInputElement).style.backgroundColor = "#4E3D73";
        
    // }
    // Button effect on mouse leave
    // leaveBtnCohort = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    //     (e.target as HTMLInputElement).style.color = "white";
    //     (e.target as HTMLInputElement).style.backgroundColor = "#876ac7";
    // }

    //  Create buttons for cohorts in file
    cohortsMapper = () => {
        return(this.state.cohorts.map((cohort, index) => {
            return(

                <>
                <Button 
                size="lg"
                className="mr-2 btn-cohort" 
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.displayCohort(cohort)}
                > 
                    {cohort.cohort}
                </Button> 
                
                </>

            )
        }))
    }

    // Display information related to the cohort clicked
    displayCohort = (cohort: Cohort) => {
        console.log("in display");
        this.setState({ 
            btnCohortClicked: true, 
            cohortToDisplay: cohort.cohort});                   
    }


    render() { 
        return ( 
            <>
            <NavSchool logout={this.props.logout}/>
            <div className="dash-wrapper-school">
                <br/>
                <div className="cadre-title-school" style={{width: "250px"}}>
                    <h4 >{localStorage.getItem('schoolName')}'s </h4>
                    <h1 className='font'>- Dashboard -</h1>
                </div>
                <br/>
                <br/>

                {this.state.cohorts.length === 0 ? 
                <Container style={{ textAlign: "center", paddingTop: "100px"}} >
                    <h3>To start tracking your alumini's job journey, go to the tab "My Cohorts" to create a new cohort </h3> 
                </Container>
                :
                <>
                {/* Display buttons for cohorts */}
                <Container >
                    <Row className="d-flex justify-content-center">
                        <GiGraduateCap size={30}/> 
                        <h4 className='font ml-1'>Cohorts</h4>
                    </Row>
                    <Row className="d-flex justify-content-center">
                    {this.cohortsMapper()}
                    </Row>
                </Container>
                    <br/>
                    <br/>
                {/* Display info related to button clicked */}
                
                {this.state.btnCohortClicked?
                    <>
                    <InfoForDashboardSchool schoolToken={this.props.schoolToken} cohortToDisplay={this.state.cohortToDisplay} />
                    
                    </> : 
                    <div style={{height: "300px"}}>
                        <h6 className="click-tip"> <FaRegHandPointRight size={30}/> click on a cohort to follow your alumini's journey..</h6>
                    </div>
                }
                
                <br/>
                <br/>
                </>
                }
                

            <br/>
            <br/>
            </div>
            </>
            
         );
    }
}
 
export default DashboardSchool;