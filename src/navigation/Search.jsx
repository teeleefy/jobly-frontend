import { Form, FormGroup, Input, Button } from "reactstrap";
import {useState} from 'react';
import './Search.css'


function Search({search}){
    //needed variables
    const [searchTerm, setSearchTerm] = useState("");

    //handleChange, updating form fields
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
      }

    //handleSubmit
    function handleSubmit(evt) {
        // take care of accidentally trying to search for just spaces
        evt.preventDefault();
        console.log('Clicked')
        search(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
      }

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="form">
                    <Input
                    id="searchBar"
                    name="search"
                    placeholder="Enter search term..."
                    value={searchTerm}
                    onChange={handleChange}
                    type="text"
                    />
                </FormGroup>
                <Button className="btn" type="submit">Search</Button>
            </Form>
        </>
     )
}

export default Search;