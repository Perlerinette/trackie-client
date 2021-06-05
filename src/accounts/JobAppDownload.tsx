
import React from 'react';
import JobApp from '../interfaces/InterfaceJobApp';
import { BiDownload } from 'react-icons/bi';
import { UncontrolledTooltip } from 'reactstrap';
import XLSX from "xlsx";

export interface JobAppDownloadProps {
    jobappTable: JobApp[]
}
 
export interface JobAppDownloadState {
    
}
 
class JobAppDownload extends React.Component<JobAppDownloadProps, JobAppDownloadState> {
    constructor(props: JobAppDownloadProps) {
        super(props);
        this.state = { 

          };
    }

    

    downloadXls = (event: React.SyntheticEvent) => {
        event.preventDefault();

        // save specifi data: do not save "id", or "createdAt" ...
        let tableToDwnld: JobApp[] = Object.assign([], this.props.jobappTable);
        console.log("length: ", tableToDwnld.length);
        for(let i= 0; i<tableToDwnld.length; i++){
            delete tableToDwnld[i]['createdAt'];
            delete tableToDwnld[i]['updatedAt'];
            delete tableToDwnld[i]['jobseekerid'];
            delete tableToDwnld[i]['id'];
        }

        // create file and prompt to save table into .xlsx
        const ws = XLSX.utils.json_to_sheet(this.props.jobappTable);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "MyJobApplications");
        /* generate XLSX file and send to client */
        /* nameFile as YYYY-MM-DD_LastName_Jobapps.xlsx*/

        /* 1. get the date in proper format */
        const today = new Date();
        /* -format month with 2 digits*/
        const month = today.getMonth();
        let month2digits = "";
        month.toString().length === 1 ? month2digits = ["0", (month+1).toString()].join('') : month2digits = (month+1).toString();

        /* - format day with 2 digits*/
        const day = today.getDate();
        console.log(day);
        let day2digits = "";
        day.toString().length === 1? day2digits = ["0", day.toString()].join('') : day2digits = day.toString();
        
        /* - concatenate all */
        const dateFile = [today.getFullYear(), month2digits , day2digits].join('-'); // yyyy-mm-dd
        
        /* 2. build the file name */
        const nameFile: string = [dateFile , localStorage.getItem("jobseekerLastName" ) , "Jobapps.xlsx"].join('_');
        
        /* 3. ready to save */
        XLSX.writeFile(wb, nameFile);
    }


    render() { 
        return ( 
            <>
            <BiDownload id="tooltipdld" className="icons-add-download" onClick={this.downloadXls}/>
                <UncontrolledTooltip placement="top" target="tooltipdld">
                    Download all
                </UncontrolledTooltip>
            </>
         );
    }
}
 
export default JobAppDownload;