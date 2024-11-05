import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";

/**
 * AddTaskForm component for adding a new task to a list.
 * 
 * This component renders a form to add a new task and handles the form submission.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onUpdateLists - The function to call when a new task is added.
 * @param {string} props.listID - The ID of the list to which the task will be added.
 * @returns {JSX.Element} - The AddTaskForm component.
 */
function AddTaskForm({ onUpdateLists, listID }) {
  // State to manage the task name input
  const [taskName, setTaskName] = useState("");
  // State to manage the validity of the task name input
  const [isNameValid, setNameValid] = useState(true);

  /**
   * Handles changes to the task name input field.
   * 
   * @param {Object} e - The event object.
   */
  const handleTaskNameChange = (e) => {
    setNameValid(true);
    setTaskName(e.target.value);
  };

  // ApiProvider context for making API requests
  const api_provider = useApi();

  /**
   * Adds a new task to the list.
   * 
   * This function makes an API request to add the new task and calls the onUpdateLists function
   * to update the list of tasks after adding.
   */
  async function addTask() {
    // Validate task name
    if (!taskName.trim()) {
      setNameValid(false); // Set the validation state to false
      return;
    }

    try {
      // Make API request to add the new task
      const new_task = await api_provider.post("/add_task", {
        name: taskName,
        id: listID,
      });

      if (new_task.ok) {
        // Check if the response is ok
        onUpdateLists(); // Call the onUpdateLists function to update the list of tasks
        setTaskName(""); // Reset the task name input
      } else {
        // Handle error response
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("An error occurred while adding the task:", error);
      // Optionally: Show an error message to the user.
    }
  }

  return (
    <Container>
      {/* Form layout and components */}
      <Row className="justify-content-md-center">
        <Col md="4">
          <Form onSubmit={(e) => { e.preventDefault(); addTask(); }}>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={taskName}
                onChange={handleTaskNameChange}
                placeholder="Enter task name"
                isInvalid={!isNameValid}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid task name.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTaskForm;
