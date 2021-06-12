import React from "react";
import { Form, Button, FormControl, Navbar } from "react-bootstrap";

const SearchBar = () => {
  return (
    <>
      <Navbar>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
    </>
  );
};

export default SearchBar;
