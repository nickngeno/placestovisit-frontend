import React from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const AddPlaceModal = ({
  show,
  handleClose,
  handleFormSubmit,
  handleChange,
  isSubmitting,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Place to visit next</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type of visit</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter type of visit"
                name="type"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="describe expected experience"
                name="description"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="friends">
              <Form.Label>Friends</Form.Label>
              <Form.Control
                type="text"
                placeholder="friends to accompany"
                name="friends"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="pick date"
                name="date"
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {isSubmitting ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Saving...
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Save
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddPlaceModal;
