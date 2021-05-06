interface JobApp{
    id?: number,
    jobtitle: string,
    company: string,
    applicationdate: string,
    jobdescription: string,
    location: string,
    status: string,
    jobseekerid?: number,
    createdAt?: string,
    updatedAt?: string
}

export default JobApp;
