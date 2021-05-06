import * as React from 'react';
import APIURL from '../helpers/environment';
import { Container, Col, Row} from 'reactstrap';
import {GiSandsOfTime} from 'react-icons/gi';
import JobApp from '../interfaces/InterfaceJobApp';
import './Dashboard.css';
import NavJobseeker from './NavJobseeker';
import './NavJobseeker.css';
import PieChart from './PieChart';
import BarChart from './BarChart';

export interface DashboardProps {
    token: string
}
 
export interface DashboardState {
    jobappsData: Array<JobApp>,
    datesOfApplications: Array<string>,
    numberOfApplications: number,
    statusOfApplications: Array<string>,
}

 
class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = { 
            jobappsData: [],
            datesOfApplications: [],
            numberOfApplications: 0,
            statusOfApplications: []
            
        }
    }


    componentDidMount() {
        this.getAllApplications();  
    }
  
  

    getAllApplications = () => {
        fetch(`${APIURL}/jobapplication/getAll`, {
            method: 'GET',
                headers:new Headers ({
                    'Content-Type': 'application/json', 
                    'Authorization': this.props.token
                })
            }) 
            .then( (res) => res.json())
            .then((jobapps) => {
                this.setState({ jobappsData: jobapps });
                console.log('dashboard jobappsData: ', this.state.jobappsData);
                this.parseData();

            })
            .catch(error => { console.log(error)})
    }


    parseData = () => {
        let dates: string[] = this.state.jobappsData.map(( (data) => data.applicationdate ));
        let status: string[] = this.state.jobappsData.map(( (data) => data.status ));
  
        this.setState({
            datesOfApplications: dates,
            statusOfApplications: status,
            numberOfApplications: this.state.jobappsData.length
        });

    }

   

    // Calculate the duration of the job hunt
    calculateDuration = () => {
        var date: Date = new Date(this.state.datesOfApplications[0]);
        console.log(date);
        // convert array of strings into array of dates
        var convertedDates = this.state.datesOfApplications.map( d => new Date(d));
        // console.log(convertedDates);

        // sort array of dates by oldest to newest dates
        const sortedDates = convertedDates.sort( (a, b) => a.getTime() - b.getTime() );

        // calculate days between oldest date in array and today
        const duration = this.dayDiff(sortedDates[0], new Date());
        console.log("Duration: ", duration);
        return duration;
    }

    dayDiff = (date1:Date, date2:Date) => {

        var diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24)) - 1; 
        
        return diffDays;
    }
    


    render() { 
        return ( 
            <>
            <NavJobseeker />
            <div className="dash-wrapper">
                <br/>
                <div className="cadre-title" style={{width: "250px"}}>
                    <h4 >{localStorage.getItem('jobseekerName')}'s </h4>
                    <h2 className='font'>- Dashboard -</h2>
                </div>
                <br/>

                {this.state.numberOfApplications === 0 ? 
                <Container style={{height: "100vh", textAlign: "center", paddingTop: "100px"}} >
                <h4>To start logging your job applications, go to the tab "My applications" </h4> 
                </Container>
                :
                <>
                <Container className="mt-4">
                    <Row>
                        <Col style={{textAlign:"right"}} md="4"> 
                            <GiSandsOfTime size={30}/>
                        </Col>
                        <Col md="8">
                            <h5>Your job hunt started <span style={{color: "#637259", fontSize: "larger"}}> {this.calculateDuration()} </span>days ago...</h5>
                        </Col>       
                    </Row>
                </Container>
                
                <br/>
                <br/>
                <Container >
                    <Row >
                        <Col md='6' className="text-center ">
                        <hr/>
                        <h4 className='font'>{this.state.numberOfApplications} job applications sent!</h4>
                        <hr/>
                        <br/>
                        <div className='d-flex justify-content-center'>
                            { this.state.statusOfApplications.length > 0 ?
                                <PieChart statusOfApplications={this.state.statusOfApplications} />
                                : <></>}  
                        </div>
                        </Col>
                        
                        <Col md='6' className="text-center">
                        <hr/>
                        <h4 className='font'>Monthly Activity</h4>
                        <hr/>
                        <div >
                            { this.state.datesOfApplications.length > 0 ?
                                <BarChart datesOfApplications={this.state.datesOfApplications} />
                                : <></>}  
                        </div>
                        </Col>
                    </Row>            
                </Container>            
                        
                  <br/>
                  <br/>
                </>
                 }

            
            <br/>
            </div>
            </>
         );
    }
}
 
export default Dashboard;