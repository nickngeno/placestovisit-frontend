import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import AddPlaceModal from  '../components/modals/AddPlaceModal'

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [show, setShow] = useState(false);
  const [addformvalues, setAddformvalues] = useState({
    name: "",
    type:"",
    description: "",
    friends: [],
    date: ""
  })

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = () => {
    axios("http://localhost:3000/places/list")
      .then((response) => {
        // console.log(response.data)
        setPlaces(response.data.places);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setShow(false)
  }

  const handleFormSubmit = (e) =>{
    e.preventDefault()
    console.log(addformvalues)
    setShow(false)
    
  }
  const handleChange =(e) => {
    const value= e.target.value
    setAddformvalues({...addformvalues, [e.target.name]: value})
    console.log(addformvalues)

  }

  return (
    <>
     <Button className="mt-5 mb-3" onClick={() => setShow(true)} >Add place</Button>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Friends</th>
            <th>Date</th>
            <th colSpan="2" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          { places.map((place, index) => {
            return (
              <tr key={place._id}>
                <td>{index +1}</td>
                <td>{place.name}</td>
                <td>{place.type}</td>
                <td>{place.description}</td>
                <td>{place.friends.toString()}</td>
                <td>{place.date}</td>
                <td>
                  <Button className="btn btn-primary">Update</Button>
                </td>
                <td>
                  <Button className="btn btn-warning">Delete</Button>
                </td>
              </tr>
            ); 
          }) }
        </tbody>
      </Table>
      <AddPlaceModal show={show} handleClose={handleClose} handleFormSubmit={handleFormSubmit} handleChange={handleChange} />
    </>
  );
};

export default Places;
