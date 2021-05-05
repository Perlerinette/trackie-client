import * as React from 'react';
import { Redirect } from 'react-router-dom';

export interface LogoutProps {
    logout: Function
}
 
export interface LogoutState {
    
}
 
class Logout extends React.Component<LogoutProps, LogoutState> {
    constructor(props: LogoutProps) {
        super(props);
        this.state = { 

          };
    }
    render() { 
        return ( 
            <>
            {this.props.logout()}
            <Redirect to="/" />
            </>
         );
    }
}
 
export default Logout;