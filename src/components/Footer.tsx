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
            <div className="footer-wrapper font">
            {/* &copy; {startDate}  {nowDate} - Laurine Leung */}
            <h4 className="footer-text" >Trackie application created by Laurine Leung</h4>
            <h4 className="footer-text" >Copyright &copy; 2021 </h4>
            </div>
        );
    }
}
 
export default Footer;