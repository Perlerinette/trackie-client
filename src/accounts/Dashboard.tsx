import * as React from 'react';
import './Dashboard.css';
import NavJobseeker from './NavJobseeker';

export interface DashboardProps {
    token: string,
    logout: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}
 
export interface DashboardState {
    
}
 
class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = { 

          };
    }
    render() { 
        return ( 
            <>
            <NavJobseeker logout={this.props.logout}/>
            <div className="dash-wrapper">
            <h2>Dashboard</h2>
            </div>
            </>
         );
    }
}
 
export default Dashboard;