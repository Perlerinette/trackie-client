import React, { Component } from 'react';
import APIURL from '../helpers/environment';
import { useParams } from 'react-router-dom';

export interface LoginProps {
    logInType:string;
}
 
export interface LoginProps {
    logInType:string;
}
 
const Login: React.SFC<LoginProps> = (props) => {
    let {id} = useParams<{id: string}>();
    return ( 
        <div>
                <h3>Log in with your account {id == "jobseeker" ? "job seeker" : "school"}</h3>
                <p>Hello from Login</p>
            </div>
     );
}
 
export default Login;

