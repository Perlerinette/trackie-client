import * as React from 'react';
import { Pie } from 'react-chartjs-2';

export interface PieChartProps {
    statusOfApplications: String[]
}
 
export interface PieChartState {
    nbOfPending: number,
    nbOfInterviewed: number,
    nbOfRejected: number,
    nbOfOffers: number,
    nbOfOfferDeclined: number,
    nbOfOfferAccepted: number,
}
 
class PieChart extends React.Component<PieChartProps, PieChartState> {
    constructor(props: PieChartProps) {
        super(props);
        this.state = { 
            nbOfPending: 0,
            nbOfInterviewed: 0,
            nbOfRejected: 0,
            nbOfOffers: 0,
            nbOfOfferDeclined: 0,
            nbOfOfferAccepted: 0,
          };
    }
    
    componentDidMount() {
        this.setDataPie();
    }

    componentDidUpdate(prevProps: PieChartProps) {
        
        if(prevProps.statusOfApplications !== this.props.statusOfApplications){
            this.setDataPie();
        }
    }
    

    // countOccurrences = (arr: Array<String>, val:string) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    pending: number = this.props.statusOfApplications.filter( arr => arr === 'Pending').length;
    interviewed: number = this.props.statusOfApplications.filter( arr => arr === 'Interviewed').length;
    rejected: number = this.props.statusOfApplications.filter( arr => arr === 'Rejected').length;
    offers: number = this.props.statusOfApplications.filter( arr => arr === 'Offer').length;
    declined: number = this.props.statusOfApplications.filter( arr => arr === 'Declined').length;
    accepted: number = this.props.statusOfApplications.filter( arr => arr === 'Hired').length;
    // pending: number  = this.countOccurrences(this.props.statusOfApplications, "Pending");
    // interviewed: number  = this.countOccurrences(this.props.statusOfApplications, "Interviewed");
    // rejected: number  = this.countOccurrences(this.props.statusOfApplications, "Rejected");
    // offers: number  = this.countOccurrences(this.props.statusOfApplications, "Offer");
    // declined: number  = this.countOccurrences(this.props.statusOfApplications, "Declined");
    // accepted: number  = this.countOccurrences(this.props.statusOfApplications, "Hired");
    
    //Pie Chart
        
    setDataPie = () => {
        let dataPie: Object = {
            
            labels: ['Pending', 'Interviewed', 'Rejected', 'Offers', 'Hired', 'Declined'],
            datasets: [
                {
                    label: 'Status of job applications',
                    data: [this.pending, this.interviewed, this.rejected, this.offers, this.accepted, this.declined],
                    // data:[0,0,0,0,0,0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                    ],
                    borderWidth: 1,
                },
            ],
        }

        let options = {
            legend: {
                display: true,
                position: 'right',
                labels: {
                boxWidth: 5
                }
            },
            maintainAspectRatio: false,
            responsive: false,
            
        }

        return <Pie type={Pie} 
                    data={dataPie} 
                    height={300}
                    width={400}
                    options={options} 
                />
    }

    render() { 
        return ( 
            <>
            {this.setDataPie()}
            </>
            
         );
    }
}
 
export default PieChart;