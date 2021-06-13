import React from "react";
import { Form, Button, FormControl, Navbar } from "react-bootstrap";

const SearchBar = ({input, handleInputChange,handleSearch}) => {
  return (
    <div>
      <Navbar className="pl-0">
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            name ="input"
            value={input}
            onChange={handleInputChange}
          />
          <Button variant="outline-primary" type="submit" disabled={(input==="") ? "disabled" : ""} onClick={handleSearch}>Search</Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default SearchBar;
