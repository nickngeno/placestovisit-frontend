import React from "react";
import { Table, Button } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";

const RenderTable = ({ places, handleDelete, getPlace, isLoading }) => {
  return (
    <>
      <Table responsive striped hover>
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
          { places.length === 0 && (
            <div className="d-flex justify-content-center align-items-center w-100">
              <em>no records found!</em>
            </div>
          )}
          {places.length === 0 && isLoading ? (
            <div className="beatloader">
              <BeatLoader size={15} color={"#36D7B7"} />
            </div>
          ) : (
            places.map((place, index) => {
              return (
                <tr key={place._id}>
                  <td>{index + 1}</td>
                  <td>{place.name}</td>
                  <td>{place.type}</td>
                  <td>{place.description}</td>
                  <td>{place.friends.toString()}</td>
                  <td>{place.date}</td>
                  <td>
                    <Button
                      className="btn btn-primary"
                      onClick={() => getPlace(place._id)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="btn btn-warning"
                      onClick={() => handleDelete(place._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </>
  );
};

export default RenderTable;
