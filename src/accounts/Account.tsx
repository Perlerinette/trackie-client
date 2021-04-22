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
           <h4 style={{textAlign:"center"}}>{localStorage.getItem('jobseekerName')}'s </h4>
           <h2 style={{textAlign:"center"}}>Account</h2>
           
           </div>
            </>
         );
    }
}
 
export default Account;