import * as React from 'react';

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
            <>
            {/* &copy; {startDate}  {nowDate} - Laurine Leung */}
            &copy; 2021 - Laurine Leung
            </>
        );
    }
}
 
export default Footer;