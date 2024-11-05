import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Button, ListGroup, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";

/**
 * MoveTask component for moving a task to a different list.
 * 
 * This component renders a modal with a list of available lists to move the task to.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Whether the modal is visible or not.
 * @param {Function} props.onClose - The function to call to close the modal.
 * @param {Object[]} props.lists - An array of list objects.
 * @param {string} props.taskID - The ID of the task to move.
 * @param {Function} props.onUpdateLists - The function to call when the task is moved.
 * @returns {JSX.Element} - The MoveTask component.
 */
const MoveTask = ({ show, onClose, lists, taskID, onUpdateLists }) => {
  // ApiProvider context for making API requests
  const api_provider = useApi();

  /**
   * Handles the task move to a different list.
   * 
   * This function makes an API request to move the task and calls the onUpdateLists function
   * to update the list of tasks after moving.
   * 
   * @param {string} listID - The ID of the list to move the task to.
   */
  const handleMoveTask = async (listID) => {
    try {
      // Make API request to move the task
      const response = await api_provider.put("/move_task/" + taskID, { list_id: listID });

      if (!response.ok) {
        throw new Error("Failed to move the task.");
      }

      // Call the onUpdateLists function to update the list of tasks
      onUpdateLists();
      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error moving the task:", error);
      // Optionally: Show an error message to the user.
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Move Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {lists.map((list) => (
            <OverlayTrigger
              key={list.id}
              placement="top"
              overlay={<Tooltip id={`tooltip-${list.id}`}>{list.name}</Tooltip>}
            >
              <ListGroup.Item action onClick={() => handleMoveTask(list.id)}>
                {list.name}
              </ListGroup.Item>
            </OverlayTrigger>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoveTask;
