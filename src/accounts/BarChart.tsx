import * as React from 'react';
import { Bar } from 'react-chartjs-2';

export interface PieChartProps {
    datesOfApplications: String[]
}
 
export interface PieChartState {
    
}
 
class BarChart extends React.Component<PieChartProps, PieChartState> {
    constructor(props: PieChartProps) {
        super(props);
        this.state = { 
          };
    }
    
    janCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "01").length;
    febCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "02").length;
    marCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "03").length;
    aprCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "04").length;
    mayCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "05").length;
    junCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "06").length;
    julCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "07").length;
    augCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "08").length;
    sepCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "09").length;
    octCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "10").length;
    novCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "11").length;
    decCount = this.props.datesOfApplications.filter( arr => arr.slice(0,2) === "12").length;


    //Bar Chart
        
    dataBar: Object = {
        
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        datasets: [
            {
            label: '# job applications / month',
            data:[this.janCount, this.febCount, this.marCount, this.aprCount, this.mayCount, this.junCount, this.julCount, this.augCount, this.sepCount, this.octCount, this.novCount, this.decCount],
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
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)',
            // ],
            borderWidth: 1,
            },
        ],
    }

    options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1
              },
            },
          ],
        },
      };

    render() { 
        return ( 
            <>            
            <Bar type={Bar} 
                data={this.dataBar} 
                height={200}
                width={300}
                options={this.options} 
            />
            </>
         );
    }
}
 
export default BarChart;