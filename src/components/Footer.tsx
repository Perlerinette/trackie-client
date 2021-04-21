import * as React from 'react';
import './Footer.css';

export interface FooterProps {
    
}
 
export interface FooterState {
   
}
 
class Footer extends React.Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);
        this.state = { 
             
        };
    }

    // const nowDate: date = new Date().getFullYear();

    // const startDate: string = "2021";

    render() { 
        return ( 
            <div className="footer-wrapper">
            {/* &copy; {startDate}  {nowDate} - Laurine Leung */}
            &copy; 2021 - Laurine Leung
            </div>
        );
    }
}
 
export default Footer;