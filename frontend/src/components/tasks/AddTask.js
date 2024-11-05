import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";

/**
 * Renders a form to add a new task to a list.
 * @param {Object} props - The component props.
 * @param {Function} props.onUpdateLists - The function to call when a new task is added.
 * @param {string} props.listID - The ID of the list to which the task will be added.
 * @returns {JSX.Element} - The JSX element for the AddTaskForm component.
 */
function AddTaskForm({ onUpdateLists, listID }) {
  const [taskName, setTaskName] = useState("");
  const [isNameValid, setNameValid] = useState(true);

  /**
   * Updates the task name state when the input value changes.
   * @param {Object} e - The event object.
   */
  const handleTaskNameChange = (e) => {
    setNameValid(true);
    setTaskName(e.target.value);
  };

  const api_provider = useApi();

  /**
   * Sends a POST request to add a new task to the list.
   */
  async function addTask() {
    if (!taskName.trim()) {
      setNameValid(false); // Set the validation state to false
      return;
    }

    try {
      const new_task = await api_provider.post("/add_task", {
        name: taskName,
        id: listID,
      });

      if (new_task.ok) {
        // Check if the response is ok
        console.log("Task added successfully:", new_task);
        setTaskName(""); // Reset the task name
        onUpdateLists(); // Update the lists
      } else {
        console.error("Failed to add task:", new_task);
        // Handle specific error response or show generic error message
      }
    } catch (error) {
      console.error("Error while adding task:", error.message);
      // You might want to inform the user that something went wrong.
    }
  }

  /**
   * Handles the form submit event.
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="taskName">
              <Form.Label></Form.Label>
              <Row>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    value={taskName}
                    onChange={handleTaskNameChange}
                    isInvalid={!isNameValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid task name.
                  </Form.Control.Feedback>
                </Col>
                <Col md={4}>
                  <Button type="submit" variant="primary" className="w-100">
                    Add Task
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

export default AddTaskForm;
