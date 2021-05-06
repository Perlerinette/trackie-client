
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

        // create file and prompt to save table into .xls
        const ws = XLSX.utils.json_to_sheet(this.props.jobappTable);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "MyJobApplications");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "jobapps.xlsx");
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