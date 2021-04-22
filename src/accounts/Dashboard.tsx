import * as React from 'react';
import APIURL from '../helpers/environment';
import './Dashboard.css';

export interface DashboardProps {
    token: string
}
 
export interface DashboardState {
    jobappsData: Array<JobApps>,
    datesOfApplications: Array<string>,
    numberOfApplications: number,
    statusOfApplications: Array<string>,
    nbOfPending: number,
    nbOfShorlisted: number,
    nbOfInterviewed: number,
    nbOfRejected: number,
    nbOfOffers: number,
    nbOfOfferDeclined: number,
    nbOfOfferAccepted: number
}

interface JobApps{
    id: number,
    jobtitle: string,
    company: string,
    applicationdate: string,
    location: string,
    status: string,
    jobseekerid: number,
    createdAt: string,
    updateAt: string
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
            nbOfShorlisted: 0,
            nbOfInterviewed: 0,
            nbOfRejected: 0,
            nbOfOffers: 0,
            nbOfOfferDeclined: 0,
            nbOfOfferAccepted: 0
          };
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
            nbOfPending: this.countOccurrences(this.state.statusOfApplications, "pending"),
            nbOfShorlisted: this.countOccurrences(this.state.statusOfApplications, "shortlisted"),
            nbOfInterviewed: this.countOccurrences(this.state.statusOfApplications, "interviewed"),
            nbOfRejected: this.countOccurrences(this.state.statusOfApplications, "rejected"),
            nbOfOffers: this.countOccurrences(this.state.statusOfApplications, "offer"),
            nbOfOfferDeclined: this.countOccurrences(this.state.statusOfApplications, "declined"),
            nbOfOfferAccepted: this.countOccurrences(this.state.statusOfApplications, "accepted"),
        })
        console.log("Pending: ", this.state.nbOfPending , "Shortlisted: ", this.state.nbOfShorlisted, "Interviewed: ", this.state.nbOfInterviewed, "Rejected: ", this.state.nbOfRejected, "Offers: ", this.state.nbOfOffers, "Accepted: ", this.state.nbOfOfferAccepted, "Declined: ", this.state.nbOfOfferDeclined);
    }

    


    render() { 
        return ( 
            <>
            <div className="dash-wrapper">
            <h4 style={{textAlign:"center"}}>{localStorage.getItem('jobseekerName')}'s </h4>
            <h2 style={{textAlign:"center"}}>Dashboard</h2>
            </div>
            </>
         );
    }
}
 
export default Dashboard;