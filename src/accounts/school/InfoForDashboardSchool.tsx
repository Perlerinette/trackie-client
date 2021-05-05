import * as React from 'react';
import { Button, Col, Container, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row, Table, UncontrolledTooltip } from 'reactstrap';
import APIURL from '../../helpers/environment';
import DataShared from '../../interfaces/InterfaceDataShared';
import '../Dashboard.css';
import { GrCopy, GrWorkshop } from 'react-icons/gr';
import {IoStatsChartSharp} from 'react-icons/io5';
import PieChartSchool from './PieChartSchool';
import { TiArrowSortedDown } from 'react-icons/ti';
import { BiMapPin } from 'react-icons/bi';
import BarChartSchool from './BarChartSchool';


export interface InfoForDashboardSchoolProps {
    schoolToken: string,
    cohortToDisplay: string
}
 
export interface InfoForDashboardSchoolState {
    code: string,
    tooltipOpen: boolean,
    nbOfJobseekers: number,
    nbAppSent: number,
    nbOfHired: number,
    dataHired: DataShared[]
}
 
class InfoForDashboardSchool extends React.Component<InfoForDashboardSchoolProps, InfoForDashboardSchoolState> {
    constructor(props: InfoForDashboardSchoolProps) {
        super(props);
        this.state = { 
            code: "",
            tooltipOpen: false,
            nbOfJobseekers: 0,
            nbAppSent: 0,
            nbOfHired: 0,
            dataHired: []
          };
    }

    componentDidMount() {
        this.getInfoCohort();
        this.getCodeCohort();
    }

    componentDidUpdate(prevProps: InfoForDashboardSchoolProps, prevState: InfoForDashboardSchoolState) {
        if(prevProps.cohortToDisplay !== this.props.cohortToDisplay) {
            this.getInfoCohort();
            this.getCodeCohort();
        }
    }

    getInfoCohort = () => {
        // console.log("in info cohort");
        fetch(`${APIURL}/cohort/getData/${this.props.cohortToDisplay}`, {
            method: 'GET',
            headers:new Headers ({
                'Content-Type': 'application/json', 
                'Authorization': this.props.schoolToken
            })
           }) 
           .then( (res) => res.json())
           .then((cohort: DataShared[]) => {
                console.log("cohort info: ", cohort);
                this.getNbJobseeker(cohort);
                this.setState({ 
                    nbAppSent: cohort.length
                });
                
           })
           .catch(error => { console.log(error)})
   }

   //calculate the number of people who shared their data withe the school
   getNbJobseeker = (cohort: DataShared[]) => {
    let jobseekerArray: string[] = cohort.map( (data) => data.jobseekerid );
    jobseekerArray = jobseekerArray.filter((element,i) => i === jobseekerArray.indexOf(element));

    // grab info for hired only applications
    let dataHired: DataShared[] = [];
    for(let i =0; i < jobseekerArray.length; i++){
        for(let j=0; j< cohort.length; j++){
            if(cohort[j].jobseekerid === jobseekerArray[i] && cohort[j].status === "Hired"){
                dataHired.push(cohort[j]);
                
            }
        }
    }

    // console.log(jobseekerArray);
    this.setState({ 
        nbOfJobseekers: jobseekerArray.length,
        nbOfHired: dataHired.length,
        dataHired: dataHired
    });

    console.log("dataHired: ", this.state.dataHired)
   }




   getCodeCohort = () => {        
    // console.log("in getCode");
    fetch(`${APIURL}/cohort/getCode/${this.props.cohortToDisplay}`, {
        method: 'GET',
        headers:new Headers ({
            'Content-Type': 'application/json', 
            'Authorization': this.props.schoolToken
        })
       }) 
       .then( (res) => res.json())
       .then((code) => {
            // console.log("code: ", code[0].invitcode);
            this.setState({code: code[0].invitcode})
            
       })
       .catch(error => { console.log(error)})
    }

    /* COPY CODE */
    copyCode = (code: string) =>{
        navigator.clipboard.writeText(this.state.code);
        this.onTimer();
    }

    onTimer = ()=>{
        this.setState({tooltipOpen: !this.state.tooltipOpen},()=>{
          window.setTimeout(()=>{
            this.setState({tooltipOpen: !this.state.tooltipOpen})
          },1000)
        });
    }


    
    dataHiredMapper = (arr: DataShared[]) => {
        console.log("in datahiredMapper");
        return(arr.map( (data, index) => {
            return(
                <>
                <tr key={index}>
                    <td >
                    {data.company}
                    </td>
                    <td>
                    {data.location}
                    </td>
                </tr>
                </>
            )
        }))
    }
    
   
    sortByCompany = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        console.log("sorting by company");
    }

    sortByLocation = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        console.log("sorting by location");
    }


    render() { 
        return ( 
            <>
            <hr />
            {this.getCodeCohort}
            {this.getInfoCohort}
            <Container>
                <Row>
                    <Col>
                    <h1 className="display-cohort-title" >Cohort {this.props.cohortToDisplay} </h1>
                    
                    </Col>
                    <Col style={{ textAlign:"right", marginTop: "auto", marginBottom: "auto"}} >
                        {this.state.code !== ""? <>
                            <h6>Associated code:</h6>
                            <Button 
                            id="toolcopy" 
                            className="btn-copyCode" 
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.copyCode(this.state.code)}>
                                {this.state.code} <GrCopy/>
                            </Button>
                            <UncontrolledTooltip placement="top" target="toolcopy" isOpen={this.state.tooltipOpen}>
                                Copied to clipboard!
                            </UncontrolledTooltip>
                        </> : 
                        <></> }
                    </Col>
                </Row>
                </Container>
                <br/>
                {this.state.nbAppSent === 0 ?
                <Container className="text-center">
                <h5>No alumini started to log job applications yet..</h5>
                </Container>
                :
                <>
                <Container>
                <Row >
                    <Col md='7' >
                        <hr/>
                        <h4 className='text-center font'>Some Stats <IoStatsChartSharp size={20} /></h4>
                        <hr/>
                        <br/>
                    
                        <h5 ><span style={{color: "#876AC7"}}>{this.state.nbOfJobseekers}</span> alumini are sharing their data </h5> 
                        <h5 ><span style={{color: "#876AC7"}}>{this.state.nbAppSent}</span> job applications have been sent </h5> 
                        <h5 ><span style={{color: "#876AC7"}}>{this.state.nbOfHired} </span>alumini already hired!</h5> 
                    
                    
                    </Col>
                    <Col md='5' className="text-center ">
                        <hr/>
                        <h4 className='font'>Status of alumini</h4>
                        <hr/>
                        <br/>
                        <div className='d-flex justify-content-center'>
                            { this.state.nbOfJobseekers > 0 ?
                                <PieChartSchool nbOfJobseekers={this.state.nbOfJobseekers} nbOfHired={this.state.nbOfHired} />
                                 : <></>} 
                        </div>
                        
                    </Col>
                </Row>
                </Container>
                <br/>
                <Container >
                <Row>
                    <Col md='6' >
                        <hr/>
                        <h4 className='text-center font'>Where do they work now? </h4>
                        <hr/>
                        <br/>
                    
                        <Table hover className="table-hired">
                            <thead>
                                <tr>
                                    <th><GrWorkshop/> {' '} Company <TiArrowSortedDown onClick={this.sortByCompany} className="icon-hired-sort"/></th>
                                    <th><BiMapPin/>{' '}Location <TiArrowSortedDown onClick={this.sortByLocation} className="icon-hired-sort"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.dataHiredMapper(this.state.dataHired)}
                            </tbody>
                        </Table>
                        <br/>
                    </Col>
                    <Col md='6' >
                        <hr/>
                        <h4 className='text-center font'>What do they do now? </h4>
                        <hr/>
                        <br/>
                        <BarChartSchool dataHired={this.state.dataHired}/>
                        <br/>
                    </Col>
                </Row>
                </Container>
                </>                
                 }
            
            <br/>
            <br/>

            </>
         );
    }
}
 
export default InfoForDashboardSchool;