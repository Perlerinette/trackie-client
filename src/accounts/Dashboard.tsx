import * as React from 'react';

export interface DashboardProps {
    
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
            <h2>Dashboard</h2>
            </>
         );
    }
}
 
export default Dashboard;