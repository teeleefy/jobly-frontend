import Job from "../jobs/Job";
import Search from "../navigation/Search"
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {ListGroup} from "reactstrap";
import JoblyApi from "../Api.js";
import Company from "./Company";
import "./CompanyJobs.css";

function CompanyJobs(){
    let { handle } = useParams();
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState(null);

    useEffect(function getCompanyAndJobs(){
        async function getCompany() {
          let company = await JoblyApi.getCompany(handle);
          setCompany(company);
          setJobs(company.jobs);
          console.log(jobs);
        }
        getCompany();
      }, [handle]);
    // let companyJobs = jobs.filter(job => job.companyHandle === name);
    if(company){
    return(
    <>
    
        <Search/> 
        <section className="col-md-12">
                <ListGroup>
                    <div className="CompanyJobs-company"><Company company={company} key={company.handle}/></div>
                    {jobs.map(job => (<Job job={job} key={job.id}/>))}
                </ListGroup>
        </section>
    </>
     )}
     else{return (<h1>Loading...</h1>)}
}

export default CompanyJobs;
