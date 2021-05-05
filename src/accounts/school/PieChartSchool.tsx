import * as React from 'react';
import { Pie } from 'react-chartjs-2';

export interface PieChartSchoolProps {
    nbOfJobseekers: number,
    nbOfHired: number
}
 
export interface PieChartSchoolState {
    hired: number,
    searching: number
}
 
class PieChartSchool extends React.Component<PieChartSchoolProps, PieChartSchoolState> {
    constructor(props: PieChartSchoolProps) {
        super(props);
        this.state = { 
            hired: 0,
            searching: 0
          };
    }


    componentDidMount() {
        this.setDataPie();
    }

    componentDidUpdate(prevProps: PieChartSchoolProps, prevState: PieChartSchoolState) {
        
        if(prevProps.nbOfJobseekers !== this.props.nbOfJobseekers){
            this.setDataPie();
        }
    }


    setDataPie = () => {

        //Pie chart
        let dataPie: Object = {
                
            labels: ['Searching', 'Hired'],
            datasets: [
                {
                label: "Status of alumini 's job hunt",            
                data: [(this.props.nbOfJobseekers-this.props.nbOfHired), this.props.nbOfHired],
                // data: [2, 3] ,
                backgroundColor: [
                    'rgba(255, 128, 128, 1)',
                    'rgba(255, 255, 179, 1)',
                    
                ],
                hoverBackgroundColor: [
                    'rgba(255, 128, 128, 0.5)',
                    'rgba(255, 255, 179, 0.5)',
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
 
export default PieChartSchool;