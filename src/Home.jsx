import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "./auth/UserContext";
import './Home.css'

function Home(){
    let { currentUser } = useContext(UserContext);
    function renderHomeMessage(){
        if(currentUser){
            return(
                <div>
                  <h2>Welcome Back, {currentUser.firstName || currentUser.username}!</h2>   
                </div>
            )
        }
        return (
            <div className="Home-btns">
            <Button className="justify-content-center">
                <NavLink to="/login" className="Home-btn">Login</NavLink>         
            </Button>
            <Button className="justify-content-center">
                <NavLink to="/signup" className="Home-btn">Sign Up</NavLink>
            </Button>
            </div>
        )
    }




 return(
    <>
        <Card>
        <CardBody>
          <CardTitle className="text-center">
            <h1 className="Home-title">Jobly</h1>
          </CardTitle>
          <CardText className="Home-text">
            All the jobs in one, convenient place.
          </CardText>
            {renderHomeMessage()}
        </CardBody>
      </Card>
    </>
 )
}

export default Home;