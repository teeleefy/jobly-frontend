import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
import './Company.css'


function Company({company}){
    return(
        <>
            <Card className="Company-card">
                <CardBody>
                <CardText>
                <NavLink className="Company-name" to={`/companies/${company.handle}`} key={company.handle}>
                        {company.name}
                        
                    </NavLink>
                    <p>{company.description}</p>
                </CardText>
                </CardBody>
            </Card>
        </>
     )
}

export default Company;