import * as React from 'react';
import APIURL from '../helpers/environment';


export interface AccountProps {
   token: string
}
 
export interface AccountState {
    
}
 
class Account extends React.Component<AccountProps, AccountState> {
    constructor(props: AccountProps) {
        super(props);
        this.state = { 

          };
    }




    render() { 
        return ( 
            <>
           <div className="dash-wrapper">
                <br/>
                <div className="cadre-title"  style={{width: "250px"}}>
                    <h4 >{localStorage.getItem('jobseekerName')}'s </h4>
                    <h2 >- Account -</h2>
                </div>
           </div>
            </>
         );
    } 
}
 
export default Account;