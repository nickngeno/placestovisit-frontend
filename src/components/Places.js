import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import AddPlaceModal from  '../components/modals/AddPlaceModal'
import UpdatePlaceModal from "./modals/UpdatePlaceModal";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [showAddmodal, setShowAddmodal] = useState(false);
  const [showUpdatemodal, setShowUpdatemodal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [addformvalues, setAddformvalues] = useState({
    _id: "",
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
    setShowAddmodal(false)
  }

  const handleFormSubmit = (e) =>{
    e.preventDefault()
    setIsSubmitting(true)
    axios.post("http://localhost:3000/places/add", addformvalues)
    .then(response => {
      // console.log(response)
      if(response.status ===200) getPlaces()
      setAddformvalues({
        
        name: "",
        type:"",
        description: "",
        friends: [],
        date: ""
      })
      setShowAddmodal(false)
      setIsSubmitting(false)
    })
    .catch(error => {
      console.log(error)
    })
    
  }

  const handleFormUpdate = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    axios.put("http://localhost:3000/places/update/" + addformvalues._id, addformvalues)
    .then(response => {
      // console.log(response)
      if(response.status ===200) getPlaces()
      setAddformvalues({
        _id:"",
        name: "",
        type:"",
        description: "",
        friends: [],
        date: ""
      })
      setShowUpdatemodal(false)
      setIsSubmitting(false)
    })
    .catch(error => {
      console.log(error)
    })
    

  }
  const handleChange =(e) => {
    const value= e.target.value
    setAddformvalues({...addformvalues, [e.target.name]: value})
    console.log(addformvalues)
  }

  const getPlace = (id) => {
    console.log(id)
    axios("http://localhost:3000/places/findbyid/" +id)
    .then(response => {
      const result= response.data
      if(response.status === 200) setAddformvalues({...addformvalues, ...result})
      setShowUpdatemodal(true)
    })
    .catch(error =>{
      console.log(error)
    })
  }

  const handleDelete = (id) =>{
    var result = window.confirm("Are you sure you want to delete this post?");
    if (result) {
      axios.delete("http://localhost:3000/places/delete/" +id)
      .then(response => {
        if(response.status === 200)
        getPlaces()
      })
      .catch(error =>{
        console.log(error)
      })
  }
}

  return (
    <>
     <Button className="mt-5 mb-3" onClick={() => setShowAddmodal(true)} >Add place</Button>
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
                  <Button className="btn btn-primary" onClick ={() => getPlace(place._id)}>Update</Button>
                </td>
                <td>
                  <Button className="btn btn-warning"  onClick={() =>handleDelete(place._id)}>Delete</Button>
                </td>
              </tr>
            ); 
          }) }
        </tbody>
      </Table>
      <AddPlaceModal show={showAddmodal} handleClose={handleClose} handleFormSubmit={handleFormSubmit} handleChange={handleChange} isSubmitting= {isSubmitting} />
      <UpdatePlaceModal show={showUpdatemodal} handleClose={handleClose} handleFormUpdate={handleFormUpdate} handleChange={handleChange} isSubmitting={isSubmitting} addformvalues = {addformvalues}  />
    </>
  );
};

export default Places;
