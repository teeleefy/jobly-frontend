import Search from "../navigation/Search.jsx"
import Job from "./Job";
import JoblyApi from "../Api.js";
import { useState, useEffect} from "react";
import { ListGroup } from "reactstrap";
import Loading from "../navigation/Loading";


function JobsList(){
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        async function getJobsOnMount() {
          let jobs = await JoblyApi.getJobs();
          setJobs(jobs);
        }
        getJobsOnMount();
      }, []);

      async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
      }

      if(!jobs) return <Loading />;

    return(
        <>
            <Search search={search}/>
            <section className="col-md-12">
                <ListGroup>
                    {jobs.map(job => (
                    <Job job={job} key={job.id}/>
                    ))}
                </ListGroup> 
            </section>
        </>
     )
}

export default JobsList;