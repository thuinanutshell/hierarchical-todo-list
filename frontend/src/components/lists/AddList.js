import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";

/**
 * Renders a form to add a new list.
 * @param {Object} props - The component props.
 * @param {Function} props.onUpdateLists - The function to call when a new list is added.
 * @returns {JSX.Element} - The JSX element representing the component.
 */
function AddList({ onUpdateLists }) {
  const [listName, setListName] = useState("");
  const [isNameValid, setNameValid] = useState(true);

  /**
   * Handles changes to the list name input field.
   * @param {Object} e - The event object.
   */
  const handleListNameChange = (e) => {
    setNameValid(true);
    setListName(e.target.value);
  };

  const api_provider = useApi();

  /**
   * Adds a new list to the database.
   * @param {Object} e - The event object.
   */
  async function addList(e) {
    e.preventDefault();

    if (!listName.trim()) {
      setNameValid(false);
      return;
    }

    const list = await api_provider.post("/add_list", { name: listName });
    onUpdateLists(list);
    setListName("");
  }

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={addList}>
            <Form.Group controlId="listName">
              <Form.Label></Form.Label>
              <Row>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    value={listName}
                    onChange={handleListNameChange}
                    isInvalid={!isNameValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid list name.
                  </Form.Control.Feedback>
                </Col>
                <Col md={4}>
                  <Button type="submit" variant="primary" className="w-100">
                    Add List
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddList;
