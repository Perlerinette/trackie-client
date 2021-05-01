import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Footer from './Footer';
import Home from './Home';
import DashboardSchool from '../accounts/school/DashboardSchool';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import Myjobapps from '../accounts/MyJobApps';
import Account from '../accounts/Account';
import Logout from '../auth/Logout';
import Dashboard from '../accounts/Dashboard';
import SignupSchool from '../auth/SignupSchool';
import LoginSchool from '../auth/LoginSchool';
import CohortsSchool from '../accounts/school/CohortsSchool';
import AccountSchool from '../accounts/school/AccountSchool';


export interface MainProps {

}

export interface MainState {
    sessionJobseekerToken: string,
    sessionSchoolToken: string,
    accountType: string
    
}

class Main extends React.Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = { 
            sessionJobseekerToken: localStorage.getItem('jobseekerToken') || "",
            sessionSchoolToken: "",
            accountType: ""
        };
    }


    /* TOKEN RELATED*/
    updateToken = (newToken: string, tokenType: string) => {
        console.log("in updateToken");
        console.log("accountType ", this.state.accountType);
        if(tokenType === "jobseeker"){
            localStorage.setItem('jobseekerToken', newToken);
            this.setState({
                sessionJobseekerToken: newToken
            });
            // console.log("sessionJobseekerToken", this.state.sessionJobseekerToken);
        }
        else if(tokenType === "school"){
            localStorage.setItem('schoolToken', newToken);
            this.setState({
                sessionSchoolToken: newToken
            });
            // console.log("sessionSchoolToken", this.state.sessionSchoolToken);
        }
    }



    componentDidMount() {
        if(localStorage.getItem('jobseekerToken') || localStorage.getItem('jobseekerToken') !== null){
            // console.log(localStorage.getItem('jobseekerToken'));
            this.setState({
                sessionJobseekerToken: localStorage.getItem('jobseekerToken')!,
                sessionSchoolToken:"",
                accountType: "jobseeker"
            })
        } else if(localStorage.getItem('schoolToken') || localStorage.getItem('schoolToken') !== null){
            // console.log(localStorage.getItem('schoolToken'));
                this.setState({
                    sessionSchoolToken: localStorage.getItem('schoolToken')!,
                    sessionJobseekerToken: "",
                    accountType: "school"
                })
        } else{
            this.setState({
                sessionSchoolToken: "",
                sessionJobseekerToken: "",
                accountType: ""
            })
        }
    }

    logout = () => {
        localStorage.clear();
        this.setState({
            sessionJobseekerToken: "",
            sessionSchoolToken: "",
            accountType:""
        });
        
    }
    
      /* END of TOKEN RELATED*/

    render() { 
        
        return (
            
            <React.Fragment>
            <Router>
                <Switch>                    
                    <Route exact path="/" component={() => <Home/>} />
                    {/* <Route exact path="/dashboard"  > {this.state.sessionJobseekerToken ? <NavJobseeker token={this.state.sessionJobseekerToken} logout={this.logout}/> : <Redirect to="/" />} </Route> */}
                    {/* <Route exact path="/login"> <Auth updateToken = {this.updateToken} accountType={"jobseeker"} />  </Route>
                    <Route exact path="/signup"> <Auth updateToken = {this.updateToken} accountType={"jobseeker"} />  </Route> */}
                    <Route exact path="/login"> <Login updateToken = {this.updateToken}  />  </Route>
                    <Route exact path="/signup"> <Signup updateToken = {this.updateToken} />  </Route> */

                    <Route exact path="/myjobapplications"  > {this.state.sessionJobseekerToken ? <Myjobapps token={this.state.sessionJobseekerToken} /> : <Redirect to="/" />} </Route>
                    <Route exact path="/myaccount"  > {this.state.sessionJobseekerToken ? <Account token={this.state.sessionJobseekerToken} /> : <Redirect to="/" />} </Route>
                    <Route exact path="/mydashboard"  > {this.state.sessionJobseekerToken ? <Dashboard token={this.state.sessionJobseekerToken} /> : <Redirect to="/" />} </Route>
                    <Route exact path="/logout"><Logout logout={this.logout}/></Route>

                    <Route exact path="/school/dashboard"  > {this.state.sessionSchoolToken ? <DashboardSchool schoolToken={this.state.sessionSchoolToken} logout={this.logout}/> : <Redirect to="/" /> } </Route>
                    <Route exact path="/school/cohorts"  > {this.state.sessionSchoolToken ? <CohortsSchool schoolToken={this.state.sessionSchoolToken} logout={this.logout}/> : <Redirect to="/" /> } </Route>
                    <Route exact path="/school/account"  > {this.state.sessionSchoolToken ? <AccountSchool schoolToken={this.state.sessionSchoolToken} logout={this.logout}/> : <Redirect to="/" /> } </Route>
                    <Route exact path="/school/login"> <LoginSchool updateToken = {this.updateToken} />  </Route>
                    <Route exact path="/school/signup"> <SignupSchool updateToken = {this.updateToken} />  </Route>
                    <Route exact path="/school/logout"><Logout logout={this.logout}/></Route>
                                       
                </Switch>
            </Router>
            <Footer />
        </React.Fragment>
         );
    }
}
 
export default Main;