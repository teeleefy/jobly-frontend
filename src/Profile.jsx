import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import UserContext from "./auth/UserContext";
import JoblyApi from "./Api.js";
import { useNavigate } from "react-router-dom";
import './Profile.css'

function Profile({update}){
    const { currentUser, token } = useContext(UserContext);
    const [formMessages, setFormMessages] = useState([]);
    const [updateSuccess, setUpdateSuccess] =useState();

    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
      });
  
    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await update(formData);
        if(result.success){
        //    alert("Saved Changes!") 
           setFormMessages(['Profile Updated!'])
           setUpdateSuccess(true);
        }
        else{
            setFormMessages(result.errors);
            setUpdateSuccess(false);
        }
    };
  
    /** Update local state w/curr state of input elem */
  
    const handleChange = evt => {
      const { name, value }= evt.target;
      setFormData(fData => ({
        ...fData,
        [name]: value
      }));
    };





    return(
        <>
            <Form className="Profile-Form" >
            <h1 className="Profile-h1">Profile</h1>
            <FormGroup>
                <Label for="username" >
                    <b>Username</b>
                </Label>
                <Input
                id="username"
                name="username"
                placeholder={currentUser.username}
                type="text"
                readOnly={true}
                />
            </FormGroup>
            <FormGroup>
                <Label for="firstName">
                    <b>First Name</b>
                </Label>
                <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                type="text"
                onChange={handleChange}
                />
                </FormGroup>
            <FormGroup>
                <Label for="lastName">
                    <b>Last Name</b>
                </Label>
                <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                type="text"
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">
                    <b>Email</b>
                </Label>
                <Input
                id="email"
                name="email"
                value={formData.email}
                type="email"
                onChange={handleChange}
                />
                </FormGroup>

                {formMessages.length
                    ? formMessages.map(msg => <Alert color={updateSuccess ? "success": "danger"}>{msg}</Alert>)
                    : null
                }


                <Button className="btn" onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    )}
    
export default Profile;