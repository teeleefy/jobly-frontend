import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './Signup.css'

function SignupForm({signup}){
    const INITIAL_STATE = { username: "", password: "", firstName: "", lastName: "", email:""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();
    /** Send { name, description, recipe, serve } to parent
     *    & clear form. */
  
    async function handleSubmit(evt){
        evt.preventDefault();
        // console.log(formData);
        let result = await signup(formData);
        if(result.success){
            setFormData(INITIAL_STATE);
            navigate('/');
        } else{
            setFormErrors(result.errors);
        }
    };


    const handleChange = evt => {
        const { name, value }= evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value
        }));
      };

    return(
        <>
            
            <Form className="Signup-Form" onSubmit={handleSubmit}>
            <h1 className="Signup-h1">Sign up</h1>
            <FormGroup>
                <Label for="username" >
                    <b>Username</b>
                </Label>
                <Input
                id="username"
                name="username"
                value={formData.username}
                type="text"
                onChange={ handleChange }
                />
            </FormGroup>
            <FormGroup>
                <Label for="password">
                    <b>Password</b>
                </Label>
                <Input
                id="password"
                name="password"
                value={formData.password}
                type="password"
                onChange={ handleChange }
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
                onChange={ handleChange }
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
                onChange={ handleChange }
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">
                    <b>Email</b>
                </Label>
                <Input
                id="email"
                name="email"
                placeholder=""
                type="email"
                onChange={ handleChange }
                />
                </FormGroup>

                {formErrors.length
                    ? formErrors.map(error => <Alert color="danger">{error}</Alert>)
                    : null
                }

                <Button className="btn" type="submit">Submit</Button>
            </Form>
        </>
     )
}

export default SignupForm;