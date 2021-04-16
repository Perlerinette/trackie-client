import * as React from 'react';
import { Component } from 'react';
import Signup from './Signup';
import Login from './Login';

export interface AuthProps {
    
}
 
export interface AuthState {
    
}
 
class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
            <>

            </>
         );
    }
}
 
export default Auth;