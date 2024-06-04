import Job from "../../jobs/Job";
import Search from "../Search"
import React from "react";
import { Link, useParams } from "react-router-dom";
import "./CompaniesList.css";
import {
  ListGroup
} from "reactstrap";


function CompanyJobs({jobs}){
    let { name } = useParams();
    
    let companyJobs = jobs.filter(job => job.companyHandle === name);

    return(
    <>
        <Search/> 
        <section className="col-md-6">
                <ListGroup>
                    {companyJobs.map(job => (<Job job={job}/>))}
                </ListGroup>
        </section>
    </>
     )
}

export default CompanyJobs;
