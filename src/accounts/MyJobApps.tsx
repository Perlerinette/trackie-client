 import * as React from 'react';
 import APIURL from '../helpers/environment';

 export interface MyjobappsProps {
    token: string,
 }
  
 export interface MyjobappsState {
     
 }
  
 class Myjobapps extends React.Component<MyjobappsProps, MyjobappsState> {
     constructor(props: MyjobappsProps) {
         super(props);
         this.state = { 

           };
     }


     


     jobAppsMapper = () => {
         return 
     }



     render() { 
         return ( 
             <>
            <div className="dash-wrapper">
            <br/>
                <div className="cadre-title"  style={{width: "400px"}}>
                    <h4 >{localStorage.getItem('jobseekerName')}'s </h4>
                    <h2 >- Job Applications -</h2>
                </div>
            </div>
             </>
          );
     }
 }
  
 export default Myjobapps;