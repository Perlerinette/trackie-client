 import * as React from 'react';
 import APIURL from '../helpers/environment';

 export interface MyjobappsProps {
    token: string
 }
  
 export interface MyjobappsState {
     
 }
  
 class Myjobapps extends React.Component<MyjobappsProps, MyjobappsState> {
     constructor(props: MyjobappsProps) {
         super(props);
         this.state = { 

           };
     }

     



     render() { 
         return ( 
             <>
            <div className="dash-wrapper">
            <h4 style={{textAlign:"center"}}>{localStorage.getItem('jobseekerName')}'s </h4>
            <h2 style={{textAlign:"center"}}>Job Applications</h2>
            </div>
             </>
          );
     }
 }
  
 export default Myjobapps;