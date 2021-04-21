import * as React from 'react';
import './Dashboard.css';
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
                <h2>Dashboard School</h2>
            </div>
            </>
         );
    }
}
 
export default DashboardSchool;