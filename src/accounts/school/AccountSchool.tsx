import * as React from 'react';
import '../Dashboard.css';
import NavSchool from './NavSchool';

export interface AccountSchoolProps {
    schoolToken: string,
    logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface AccountSchoolState {
    
}
 
class AccountSchool extends React.Component<AccountSchoolProps, AccountSchoolState> {
    constructor(props: AccountSchoolProps) {
        super(props);
        this.state = { 

          };
    }
    render() { 
        return ( 
            <>
            <NavSchool logout={this.props.logout}/>
            <div className="dash-wrapper-school">
            <br/>
                <div className="cadre-title-school" style={{width: "250px"}}>
                    <h4 >{localStorage.getItem('schoolName')}'s </h4>
                    <h1 className='font'>- Account -</h1>
                </div>
                <br/>
            </div>
            </>
         );
    }
}
 
export default AccountSchool;