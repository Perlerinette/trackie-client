import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavHeader from './NavHeader';
import Footer from './Footer';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Home from './Home';
import Myjobapps from '../accounts/MyJobApps';
import Dashboard from '../accounts/Dashboard';


export interface MainProps {
    
}

export interface MainState {
    
}

class Main extends React.Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = { 

        };
    }
    render() { 
    
        return (
            <React.Fragment>
            <NavHeader />
            <Router>
                <Switch>
                    <Route exact path="/" component={() => <Home/>} />
                    <Route exact path="/login/:id" component={() => <Login logInType="jobseeker"/> } />
                    <Route exact path="/school/login" component={() => <Login logInType ='school' /> } />
                    <Route exact path="/signup" component={() => <Signup /> } />
                    <Route exact path="/myjobapplications" component={() => <Myjobapps /> } />
                    <Route exact path="/dashboard" component={() => <Dashboard /> } />
                </Switch>
            </Router>
            <Footer />
        </React.Fragment>
         );
    }
}
 
export default Main;