import {useContext, useEffect} from 'react';
import UserContext from "../auth/UserContext";
import {
    Card,
    CardBody,
    CardText,
    ListGroupItem,
    Button
  } from "reactstrap";
  import {useState} from 'react';
import './Job.css'

function Job({job}){
    const { apply, alreadyApplied } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateApplyButton(){
        setApplied(alreadyApplied(job.id));
    },[applied])

    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await apply(job.id);
        if(result.success){
           setApplied(true); 
        }
    };

    function renderButton(){
        let btn= applied ? (<Button className="Job-btn">Applied</Button>) : (<Button onClick={handleSubmit} className="Job-btn Job-apply">Apply</Button>);
        return btn;
    }

    return(
        <>
            <Card className="Job-card">
                <ListGroupItem>
                <CardBody>
                <CardText className="Job-text">
                    <p className="Job-name">{job.title}</p> 
                    <p className="Job-company">{job.companyName}</p>
                    <p>Salary: {job.salary ? `$${job.salary}` : "N/A"}</p>
                    <p>Equity: {job.equity || 0}</p>
                </CardText>
                    {renderButton()}
                </CardBody>
                </ListGroupItem>
            </Card>
        </>
     )
}

export default Job;