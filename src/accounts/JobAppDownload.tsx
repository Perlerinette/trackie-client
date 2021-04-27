
import React from 'react';
import { BiDownload } from 'react-icons/bi';
import { UncontrolledTooltip } from 'reactstrap';
import XLSX from "xlsx";
import JobApp from '../interfaces/InterfaceJobApp';

export interface JobAppDownloadProps {
    jobappTable: Array<Object>
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