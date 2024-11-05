import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";

/**
 * Renders a form to add a new list.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onUpdateLists - The function to call when a new list is added.
 * @returns {JSX.Element} - The JSX element representing the component.
 */
function AddList({ onUpdateLists }) {
  // State to manage the list name input
  const [listName, setListName] = useState("");
  // State to manage the validity of the list name input
  const [isNameValid, setNameValid] = useState(true);

  /**
   * Handles changes to the list name input field.
   * 
   * @param {Object} e - The event object.
   */
  const handleListNameChange = (e) => {
    setNameValid(true);
    setListName(e.target.value);
  };

  // ApiProvider context for making API requests
  const api_provider = useApi();

  /**
   * Adds a new list to the database.
   * 
   * @param {Object} e - The event object.
   */
  async function addList(e) {
    e.preventDefault();

    // Validate list name
    if (listName.trim() === "") {
      setNameValid(false);
      return;
    }

    try {
      // Make API request to add the new list
      const response = await api_provider.post("/lists", { name: listName });
      if (response.ok) {
        // Call the onUpdateLists function to update the list of lists
        onUpdateLists();
        // Reset the list name input
        setListName("");
      } else {
        // Handle error response
        console.error("Failed to add list");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred while adding the list:", error);
    }
  }

  return (
    <Container>
      {/* Form layout and components */}
      <Row className="justify-content-md-center">
        <Col md="4">
          <h2>Add New List</h2>
          <Form onSubmit={addList}>
            <Form.Group controlId="formListName">
              <Form.Label>List Name</Form.Label>
              <Form.Control
                type="text"
                value={listName}
                onChange={handleListNameChange}
                placeholder="Enter list name"
                isInvalid={!isNameValid}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid list name.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add List
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddList;
