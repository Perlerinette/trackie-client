 import * as React from 'react';
 import APIURL from '../helpers/environment';
 import JobApp from '../interfaces/InterfaceJobApp';
 import './MyJobApps.css';
 import { Table,  Container, Alert } from 'reactstrap';
 import {TiArrowSortedDown} from 'react-icons/ti';
 import { RiDeleteBinLine} from 'react-icons/ri';
import JobAppCreate from './JobAppCreate';
import JobAppExpand from './JobAppExpand';
import JobAppEdit from './JobAppEdit';
import JobAppDownload from './JobAppDownload';
import NavJobseeker from './NavJobseeker';

 export interface MyjobappsProps {
    token: string,
 }
  
 export interface MyjobappsState {
    jobappsData: Array<JobApp>,
    sortingStatus: boolean,
    sortingJobtitle: boolean,
    sortingDate: boolean,
    arrayJobapps: JobApp[],
    alertText: String,
    alertColor: string,
    alertVisible: boolean,
 }
  
 class Myjobapps extends React.Component<MyjobappsProps, MyjobappsState> {
     constructor(props: MyjobappsProps) {
         super(props);
         this.state = { 
            jobappsData: [],
            sortingStatus: false,
            sortingJobtitle: false,
            sortingDate: false,
            arrayJobapps: [],
            alertText: "",
            alertColor: "",
            alertVisible: false,
        };
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
                this.setState({ jobappsData: jobapps, arrayJobapps: jobapps });
                console.log('myjobapps jobappsData: ', this.state.jobappsData);                
            })
            .catch(error => { console.log(error)})
    }
 


     jobAppsMapper = (arr: JobApp[]) => {
        //  console.log("in jobappsMapper");
          return(arr.map( (jobapp, index) => {
            return(
                <>
                <tr key={index} className='jobapp-table'>
                    <td className='d-flex align-items-center justify-content-center'>
                        {/* view all info */}
                        <JobAppExpand jobapp={jobapp}/>
                    </td>
                    <td className='row-table'>{jobapp.applicationdate}</td>
                    <td className='row-table'>{jobapp.jobtitle}</td>
                    <td className='row-table'>{jobapp.status}</td>
                    <td className='row-table'>
                        
                        {/* edit job app */}
                        <JobAppEdit token={this.props.token} getAllApplications={this.getAllApplications} jobapp={jobapp} setTextAlert={this.setTextAlert} onShowAlert={this.onShowAlert}/>
                        {/* delete job app */}
                        <RiDeleteBinLine id="tooltipDel" className="icon-delete" onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => this.deleteJobapp(jobapp)}/>
                        
                    </td>
                </tr>
                </>
            )
         }))
     }

     /* DELETE */
    deleteJobapp = (jobapp: JobApp) => {
        // save data to display in alert message
        var deleteDate = jobapp.applicationdate;
        var deleteJob = jobapp.jobtitle;

        // fetch and delete from database
        fetch(`${APIURL}/jobapplication/delete/${jobapp.id}`, {
            method: 'DELETE',
                headers:new Headers ({
                    'Content-Type': 'application/json', 
                    'Authorization': this.props.token
                })
            }) 
            .then( () => {
                this.getAllApplications();
                this.setTextAlert("success", `Job Application " ${deleteJob} (${deleteDate}) " has been deleted !`);
                // display success alert
                this.onShowAlert();
            })
            .catch(error => console.log(error));
    }

     /*****************************/

     /* SORTING */

    sortByStatus = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        // set it to true
        this.setState({
            sortingStatus: true,
            sortingJobtitle: false,
            sortingDate: false,
        });

        //if true, re-arrange the array of objects based on status alphabetical order
        this.state.sortingStatus ? this.setState({
                                        arrayJobapps: this.state.jobappsData.sort( (data1, data2) => data1.status.localeCompare(data2.status))
                                    })    
        : this.setState({
                arrayJobapps: this.state.jobappsData
            }) ;

        console.log("sorting by status", this.state.sortingStatus);
    }

    sortByJobtitle = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        // set it to true
        this.setState({
            sortingJobtitle: true,
            sortingDate: false,
            sortingStatus: false
        });

        //if true, re-arrange the array of objects based on status alphabetical order
        this.state.sortingJobtitle ? this.setState({
                                        arrayJobapps: this.state.jobappsData.sort( (data1, data2) => data1.jobtitle.localeCompare(data2.jobtitle))
                                    })    
        : this.setState({
                arrayJobapps: this.state.jobappsData
            }) ;

        console.log("sorting by jobtitle", this.state.sortingStatus);
    }

    sortByDate = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        // set it to true
        this.setState({
            sortingJobtitle: false,
            sortingDate: true,
            sortingStatus: false
        });

        //if true, re-arrange the array of objects based on status alphabetical order
        this.state.sortingDate ? this.setState({
                                        arrayJobapps: this.state.jobappsData.sort( (data1, data2) => data1.applicationdate.localeCompare(data2.applicationdate))
                                    })    
        : this.setState({
                arrayJobapps: this.state.jobappsData
            }) ;

        console.log("sorting by date", this.state.sortingDate);
    }

    /* END of SORTING */

    /*****************************/

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

      /* END of ALERT MESSAGES */

    /*****************************/

     render() { 
         return ( 
             <>
             <NavJobseeker/>
            <div className="dash-wrapper">
            <br/>
            <div className="cadre-title"  style={{width: "400px"}}>
                    <h4 >{localStorage.getItem('jobseekerName')}'s </h4>
                    <h2 className='font'>- Job Applications -</h2>
                </div>
                <br/>
            <Container className="tableView ">
                <br/>
                <Alert   color={this.state.alertColor} isOpen={this.state.alertVisible}>
                    {this.state.alertText}
                </Alert  >
                <br/>
                <div className="icons-add-download-wrapper">
                    {/* create new job application */}
                    <JobAppCreate token={this.props.token} getAllApplications={this.getAllApplications} setTextAlert={this.setTextAlert} onShowAlert={this.onShowAlert} />
                    {/* Download table in .xls file */}
                    <JobAppDownload jobappTable={this.state.jobappsData}/>
                </div>
                <br/>
                <Table hover>
                    <thead>
                        <tr>
                            <th>View More</th>
                            <th>Date <TiArrowSortedDown onClick={this.sortByDate} className="icon-sort"/></th>
                            <th>Job Title <TiArrowSortedDown onClick={this.sortByJobtitle} className="icon-sort"/></th>
                            <th>Status <TiArrowSortedDown onClick={this.sortByStatus} className="icon-sort"/></th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.jobAppsMapper(this.state.arrayJobapps)}
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
  
 export default Myjobapps;