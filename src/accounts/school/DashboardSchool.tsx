import * as React from 'react';
import '../Dashboard.css';
import NavSchool from './NavSchool';

export interface DashboardSchoolProps {
    schoolToken: string,
    logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface DashboardSchoolState {
    
}
 
class DashboardSchool extends React.Component<DashboardSchoolProps, DashboardSchoolState> {
    constructor(props: DashboardSchoolProps) {
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
                    <h1 className='font'>- Dashboard -</h1>
                </div>
                <br/>
            </div>
            </>
         );
    }
}
 
export default DashboardSchool;