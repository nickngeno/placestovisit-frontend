import React from "react";
import { Table, Button } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";

const RenderTable = ({
  places,
  handleDelete,
  getPlace,
  searchResult,
  isLoading,
  isSearching,
}) => {
  console.log(isSearching);
  console.log(places);
  return (
    <>
      <Table responsive striped hover sz="sm">
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
          {isSearching && searchResult ? (
            searchResult.map((place, index) => (
              <tr key={place._id}>
                <td>{index + 1}</td>
                <td>{place.name}</td>
                <td>{place.type}</td>
                <td>{place.description}</td>
                <td>{place.friends.toString()}</td>
                <td>{place.date}</td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    className="btn btn-primary mr-2"
                    onClick={() => getPlace(place._id)}
                  >
                    Update
                  </Button>
                  <Button
                    className="btn btn-warning"
                    onClick={() => handleDelete(place._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) :isLoading && typeof(places) =="undefined"? (
            <tr className="beatloader">
              <td colSpan="7">
                <h5>No data found!</h5>
                {/* <BeatLoader size={15} color={"#36D7B7"} /> */}
              </td>
            </tr>
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
                  <td style={{ textAlign: "center" }}>
                    <Button
                      className="btn btn-primary mr-2"
                      onClick={() => getPlace(place._id)}
                    >
                      Update
                    </Button>
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

      {isSearching && searchResult.length === 0 && (
        <div className="no-records d-flex justify-content-center align-items-center">
          <em>No record found!</em>
        </div>
      )}
    </>
  );
};

export default RenderTable;
