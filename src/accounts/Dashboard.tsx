import * as React from 'react';
import APIURL from '../helpers/environment';
import { Container, Col, Row, Card, CardTitle, CardHeader, CardBody } from 'reactstrap';
import { Line, Bar, Pie } from "react-chartjs-2";
import {GiSandsOfTime} from 'react-icons/gi';
import JobApp from '../interfaces/Interfaces';
import './Dashboard.css';

export interface DashboardProps {
    token: string
}
 
export interface DashboardState {
    jobappsData: Array<JobApp>,
    datesOfApplications: Array<string>,
    numberOfApplications: number,
    statusOfApplications: Array<string>,
    nbOfPending: number,
    nbOfInterviewed: number,
    nbOfRejected: number,
    nbOfOffers: number,
    nbOfOfferDeclined: number,
    nbOfOfferAccepted: number
}


 
class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = { 
            jobappsData: [],
            datesOfApplications: [],
            numberOfApplications: 0,
            statusOfApplications: [],
            nbOfPending: 0,
            nbOfInterviewed: 0,
            nbOfRejected: 0,
            nbOfOffers: 0,
            nbOfOfferDeclined: 0,
            nbOfOfferAccepted: 0
            
        }
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
                this.getStatusAndCount();
                
            })
            .catch(error => { console.log(error)})
    }

    componentDidMount() {
        this.getAllApplications();
        
    }

    parseData = () => {
        this.setState({
            datesOfApplications: this.state.jobappsData.map(( (data) => data.applicationdate )),
            statusOfApplications: this.state.jobappsData.map(( (data) => data.status )),
            numberOfApplications: this.state.jobappsData.length
        })
        console.log("dates: ", this.state.datesOfApplications);
        console.log("status: ", this.state.statusOfApplications);
        console.log("count: ", this.state.numberOfApplications);
    }

    countOccurrences = (arr: Array<String>, val:string) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    getStatusAndCount = () => {
        this.setState({
            nbOfPending: this.countOccurrences(this.state.statusOfApplications, "Pending"),
            nbOfInterviewed: this.countOccurrences(this.state.statusOfApplications, "Interviewed"),
            nbOfRejected: this.countOccurrences(this.state.statusOfApplications, "Rejected"),
            nbOfOffers: this.countOccurrences(this.state.statusOfApplications, "Offer"),
            nbOfOfferDeclined: this.countOccurrences(this.state.statusOfApplications, "Declined"),
            nbOfOfferAccepted: this.countOccurrences(this.state.statusOfApplications, "Hired"),
        })
        console.log("Pending: ", this.state.nbOfPending , "Interviewed: ", this.state.nbOfInterviewed, "Rejected: ", this.state.nbOfRejected, "Offers: ", this.state.nbOfOffers, "Hired: ", this.state.nbOfOfferAccepted, "Declined: ", this.state.nbOfOfferDeclined);
    }
                
        // var count: Object = this.state.statusOfApplications.reduce( (arr: Object, curr: any) => {
        //     if( typeof arr[curr] === 'undefined') {arr[curr] = 1}
        //     else { arr[curr]++ }
        //     return arr;
        // }, {} );
        
        //  counts = (arr: any[]) =>Ss.state.statusOfApplications));

        /*
        ["pending", "rejected", "interviewed", "interviewed", "pending", "pending"]  => { "pending": 3, "rejected": 1, "interviewed": 2 }  
        ["pending", "rejected", "interveiwed"] [3, 1, 2]
        */
    

    calculateDuration = () => {
        var date: Date = new Date(this.state.datesOfApplications[0]);
        console.log(date);
        // convert array of strings into array of dates
        var convertedDates = this.state.datesOfApplications.map( d => new Date(d));
        console.log(convertedDates);

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

    //create new array of dates and count per month:
    monthlyCount = () =>{
        var convertedDates = this.state.datesOfApplications.map( d => new Date(d));
        const year = new Date
    }

    // Line chart
    dataLine: Object = {
        labels: ['Jan', 'Feb', 'Mar', 'Avr', 'May', '6'],
        datasets: [
          {
            label: '# of job applications',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(99, 114, 89)',
            borderColor: 'rgba(99, 114, 89, 0.2)',
          },
        ],
      }

      optionsLine = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        maintainAspectRatio: false,
      }

    //Pie Chart
    dataPie: Object = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
    }





    render() { 
        return ( 
            <>
            <div className="dash-wrapper">
                <br/>
                <div className="cadre-title" style={{width: "250px"}}>
                    <h4 >{localStorage.getItem('jobseekerName')}'s </h4>
                    <h2 >- Dashboard -</h2>
                </div>
                <br/>
                <Container >
                    <Row>
                        <Col style={{textAlign:"right"}} md="3"> 
                            <GiSandsOfTime size={30}/>
                        </Col>
                        <Col md="9">
                            <h4>Your job hunt started <span style={{color: "#637259", fontSize: "larger"}}> {this.calculateDuration()} </span>days ago...Hang in there!</h4>
                        </Col>       
                    </Row>
                </Container>
                <Container>
                    <Row>
                        
                        <Card body className="text-center ">
                            <CardTitle tag="h5">Number of monthly applications</CardTitle>
                            {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                            <Container>
                                <Line type={Line} data={this.dataLine} options={this.optionsLine} />
                            </Container>
                        </Card>
                    </Row>
                    <br/>
                    <Row>
                    <Col>
                        <Card body className="text-center card-pie-chart">
                            <CardTitle tag="h5">Applications Status</CardTitle>
                            {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                            <Container>
                            <Pie type={Pie} data={this.dataPie} className="chart-pie"/>
                            </Container>
                        </Card>
                        </Col>
                    </Row>
                </Container>



            <br/>
            </div>
            </>
         );
    }
}
 
export default Dashboard;