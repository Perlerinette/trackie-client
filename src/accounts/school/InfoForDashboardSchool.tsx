import * as React from 'react';
import { Button, Col, Container,  Row, Table, UncontrolledTooltip } from 'reactstrap';
import APIURL from '../../helpers/environment';
import DataShared from '../../interfaces/InterfaceDataShared';
import '../Dashboard.css';
import { GrCopy, GrWorkshop } from 'react-icons/gr';
import PieChartSchool from './PieChartSchool';
import { TiArrowRight, TiArrowSortedDown } from 'react-icons/ti';
import { BiMapPin } from 'react-icons/bi';
import BarChartSchool from './BarChartSchool';
import { FaUserGraduate } from 'react-icons/fa';



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
    nbOfRemoteJobs: number,
    popularJob: string
    dataHired: DataShared[],
    arrayDataHired: DataShared[],
    sortingCompany: boolean,
    sortingLocation: boolean
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
            nbOfRemoteJobs: 0,
            popularJob: "",
            dataHired: [],
            arrayDataHired: [],
            sortingCompany: false,
            sortingLocation: false
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


    /* FETCH: GET DATA for a specific cohort */
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
                // console.log("cohort info: ", cohort);
                this.parseDataCohort(cohort);
                this.setState({ 
                    nbAppSent: cohort.length
                });
                
           })
           .catch(error => { console.log(error)})
   }

   /* PARSE DATA */
   //calculate the number of people who shared their data with the school
   // build a new array only with data from successful application (hired)
   parseDataCohort = (cohort: DataShared[]) => {
    let jobseekerArray: number[] = cohort.map( (data) => data.jobseekerid );
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

    let remoteHired: number = dataHired.filter( arr => arr.location.toLowerCase() === "remote").length;

    let front: number = dataHired.filter( arr => arr.jobtitle === "Front-End Developer").length;
    let back: number = dataHired.filter( arr => arr.jobtitle === "Back-End Developer").length;
    let full: number = dataHired.filter( arr => arr.jobtitle === "Full-Stack Developer").length;
    let other: number = dataHired.filter( arr => arr.jobtitle === "Other").length;

    let arrCount: number[] = [front, back, full, other ];
    let arrTitle: string[] = ["Front-End", "Back-End", "Full-Stack", "Other"];
    let index = this.indexOfMax(arrCount);

    this.setState({ 
        nbOfJobseekers: jobseekerArray.length,
        nbOfHired: dataHired.length,
        nbOfRemoteJobs: remoteHired,
        popularJob: arrTitle[index],
        dataHired: dataHired,
        arrayDataHired: dataHired //to be able to sort or not
    });

    console.log("dataHired: ", this.state.dataHired)
   }

   indexOfMax = (arr: Number[]) => {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}
  

   /*FETCH: GET code associated to a specific cohort */
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

    // display tooltip 1s and turn off
    onTimer = ()=>{
        this.setState({tooltipOpen: !this.state.tooltipOpen},()=>{
          window.setTimeout(()=>{
            this.setState({tooltipOpen: !this.state.tooltipOpen})
          },1000)
        });
    }


    /* Create the table with companies that hired alumin and their location*/
    dataHiredMapper = (arr: DataShared[]) => {
        // console.log("in datahiredMapper");
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
    
    /* SORTING */
    sortByCompany = (event: React.MouseEvent<SVGElement, MouseEvent>) => { 
        // set the corresponding variable to true
        this.setState({
            sortingCompany: true,
            sortingLocation: false
        })
        //if true, re-arrange the array of objects based on status alphabetical order
        this.state.sortingCompany ? 
        this.setState({
            // return sorted array
            arrayDataHired: this.state.dataHired.sort( (data1, data2) => data1.company.localeCompare(data2.company) )
        })
        :
        this.setState({
            // return normal array
            arrayDataHired: this.state.dataHired
        })
        console.log("sorting by company");
    }

    sortByLocation = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        // set the corresponding variable to true
        this.setState({
            sortingCompany: false,
            sortingLocation: true
        })
        //if true, re-arrange the array of objects based on status alphabetical order
        this.state.sortingLocation ? 
        this.setState({
            // return sorted array
            arrayDataHired: this.state.dataHired.sort( (data1, data2) => data1.location.localeCompare(data2.location) )
        })
        :
        this.setState({
            // return normal array
            arrayDataHired: this.state.dataHired
        })

        console.log("sorting by location");        
    }


    render() { 
        return ( 
            <>
            <hr />
            {this.getCodeCohort}
            {this.getInfoCohort}
            <Container style={{marginBottom: "15px"}}>
                <Row>
                    <Col className='d-flex align-items-center justify-content-end'>
                        <FaUserGraduate size={80} className="icon-cohort-view"/>
                    </Col>
                    <Col>
                        
                            <h1 className="display-cohort-title" >Cohort {this.props.cohortToDisplay} </h1>
                        
                    </Col>
                    <Col style={{ textAlign:"left", marginTop: "auto", marginBottom: "auto"}} >
                        
                            {this.state.code !== ""? <>
                                <h6 style={{color: "#4e3d73"}}>Associated code:</h6>
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
                </Container >
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
                        <h4 className='text-center font'>Some Stats </h4>
                        <hr/>
                        <br/>
                    
                        <h5 style={{marginBottom:"15px"}}><span style={{color: "#876AC7", fontSize: "25px"}}>{this.state.nbOfJobseekers}</span> alumini are sharing their data </h5> 
                        <h5 style={{marginBottom:"15px"}}><span style={{color: "#876AC7", fontSize: "25px"}}>{this.state.nbAppSent}</span> job applications have been sent </h5> 
                        <h5 style={{marginBottom:"15px"}}><span style={{color: "#876AC7", fontSize: "25px"}}>{this.state.nbOfHired} </span>alumini already hired!</h5> 
                        <h5 style={{marginLeft: "15px"}}><TiArrowRight size={30}/><span style={{color: "white", fontSize: "25px"}}>{this.state.nbOfRemoteJobs} </span> remote position</h5> 
                        <h5 style={{marginLeft: "15px"}}><TiArrowRight size={30}/><span style={{color: "white", fontSize: "25px"}}>{this.state.nbOfHired-this.state.nbOfRemoteJobs} </span> in-office position</h5> 
                        <h5 style={{marginLeft: "15px"}}><TiArrowRight size={30}/><span style={{color: "white", fontSize: "20px"}}>{this.state.popularJob} </span> is the most popular position</h5> 
                    
                    
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
                            <br/>
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