import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import DataShared from '../../interfaces/InterfaceDataShared';

export interface BarChartSchoolProps {
    dataHired: DataShared[],
    
}
 
export interface BarChartSchoolState {
    arrJobTitles: String[]
}
 
class BarChartSchool extends React.Component<BarChartSchoolProps, BarChartSchoolState> {
    constructor(props: BarChartSchoolProps) {
        super(props);
        this.state = { 
            arrJobTitles: []
          };
    }

    componentDidMount() {
        this.getJobTitles();
    }

    componentDidUpdate(prevProps: BarChartSchoolProps) {
        if(prevProps.dataHired !== this.props.dataHired){
            this.getJobTitles();
        }
    }

    getJobTitles = () => {

        let front: DataShared[] = this.props.dataHired.filter( arr => arr.jobtitle === "Front-End Developer" );
        let end: DataShared[] = this.props.dataHired.filter( arr => arr.jobtitle === "Back-End Developer" );
        let full: DataShared[] = this.props.dataHired.filter( arr => arr.jobtitle === "Full-Stack Developer" );
        let other: DataShared[] = this.props.dataHired.filter( arr => arr.jobtitle === "Other" );
    
    
    
        let dataBar: Object = {
            
            labels: ['Front-End', 'Back-End', 'Full-Stack', 'Other'],
            datasets: [
                {
                label: 'Job Titles',
                data: [front.length, end.length, full.length, other.length],
                // data:[1,5,2,3],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    
                ],
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderWidth: 1,
                },
            ],
        }
    
        let options = {
            indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                bar: {
                borderWidth: 2,
                },
            },
            // responsive: true,
            plugins: {
                // legend: {
                // position: 'top',
                // },
                // title: {
                // display: true,
                // text: 'Positions found',
                // },
            
                scales: {
                    xAxes: [
                    {
                        ticks: {
                        beginAtZero: true,
                        stepSize: 1
                        },
                    },
                    ],
                },
            },
          };


        return <Bar type={Bar} 
                    data={dataBar} 
                    height={200}
                    width={300}
                    options={options} 
                />

    }

    




    render() { 
        return ( 
            <>
            {this.getJobTitles()}                
            </>
         );
    }
}
 
export default BarChartSchool;