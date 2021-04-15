import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupJobseeker from '../auth/SignupJobseeker';


const Main = () => {

    return(
        <React.Fragment>
            <Router>

                <Switch>
                    <Route exact path="/signupJS" component={ SignupJobseeker } />
                </Switch>

            </Router>
        </React.Fragment>
    )

}

export default Main;