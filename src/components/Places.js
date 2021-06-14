import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import AddPlaceModal from "../components/modals/AddPlaceModal";
import UpdatePlaceModal from "./modals/UpdatePlaceModal";
import RenderTable from "../components/RenderTable";
import SearchBar from "./SearchBar";
// import { css } from '@emotion/react'

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [showAddmodal, setShowAddmodal] = useState(false);
  const [showUpdatemodal, setShowUpdatemodal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [addformvalues, setAddformvalues] = useState({
    _id: "",
    name: "",
    type: "",
    description: "",
    friends: [],
    date: "",
  });

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = () => {
    axios("https://places-merncrud.herokuapp.com/places/list")
      .then((response) => {
        setPlaces(response.data.places);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    if (true) setShowAddmodal(false) || setShowUpdatemodal(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post("https://places-merncrud.herokuapp.com/places/add", addformvalues)
      .then((response) => {
        // console.log(response)
        if (response.status === 200) getPlaces();
        setAddformvalues({
          name: "",
          type: "",
          description: "",
          friends: [],
          date: "",
        });
        setShowAddmodal(false);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormUpdate = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .put(
        "https://places-merncrud.herokuapp.com/places/update/" +
          addformvalues._id,
        addformvalues
      )
      .then((response) => {
        // console.log(response)
        if (response.status === 200) getPlaces();
        setAddformvalues({
          _id: "",
          name: "",
          type: "",
          description: "",
          friends: [],
          date: "",
        });
        setShowUpdatemodal(false);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setAddformvalues({ ...addformvalues, [e.target.name]: value });
  };

  const getPlace = (id) => {
    axios("https://places-merncrud.herokuapp.com/places/findbyid/" + id)
      .then((response) => {
        const result = response.data;
        if (response.status === 200)
          setAddformvalues({ ...addformvalues, ...result });
        setShowUpdatemodal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    var result = window.confirm("Are you sure you want to delete this post?");
    if (result) {
      axios
        .delete("https://places-merncrud.herokuapp.com/places/delete/" + id)
        .then((response) => {
          if (response.status === 200) getPlaces();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (input !== "") setIsSearching(true);
    else setIsSearching(false);
  };
  useEffect(() => {
    const searchInput = () => {
      const myfilter = places.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResult(myfilter);
    };
    searchInput();
  }, [input, places]);

  return (
    <>
      <Button className="mt-3 mb-3" onClick={() => setShowAddmodal(true)}>
        Add place
      </Button>
      <SearchBar handleInputChange={handleInputChange} input={input} />
      <RenderTable
        places={places}
        handleDelete={handleDelete}
        getPlace={getPlace}
        handleClose={handleClose}
        isLoading={isLoading}
        isSearching={isSearching}
        searchResult={searchResult}
      />
      <AddPlaceModal
        show={showAddmodal}
        handleClose={handleClose}
        handleFormSubmit={handleFormSubmit}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
      />
      <UpdatePlaceModal
        show={showUpdatemodal}
        handleClose={handleClose}
        handleFormUpdate={handleFormUpdate}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
        addformvalues={addformvalues}
      />
    </>
  );
};

export default Places;
