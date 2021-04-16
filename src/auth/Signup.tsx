import React, { Component } from 'react';
import APIURL from '../helpers/environment';


export interface SignupProps {
    //myProp: string
}
 
export interface SignupState {
    myText: string
}
 
class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = { 
            myText: "Signup"  
          };
    }
    render() { 
        return ( 
            <>
                <h3>Register !</h3>
                <p>Hello from {this.state.myText}</p>
            </>
         );
    }
}
 
export default Signup;