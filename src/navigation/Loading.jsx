import {  Card, CardBody, CardTitle, CardText } from "reactstrap";
import './Loading.css'

function Loading(){
    return(
        <Card className="Loading">
            <CardBody>
                <CardTitle className="Loading-title">Loading ...</CardTitle>
            </CardBody>
        </Card>
    )
}

export default Loading;