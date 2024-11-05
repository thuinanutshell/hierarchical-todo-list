import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { Button, ListGroup, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";

/**
 * Renders a dialog that allows the user to move a task to a different list.
 * @param {Object} props - The component props.
 * @param {Object} props.task - The task to be moved.
 * @param {boolean} props.open - Whether the dialog is open or not.
 * @param {Function} props.onClose - The function to call when the dialog is closed.
 * @param {Function} props.fetchLists - The function to call to fetch the updated list of tasks.
 * @returns {JSX.Element} - The MoveTask component.
 */
const MoveTask = ({ task, open, onClose, fetchLists }) => {
  const [lists, setLists] = useState([]);
  const api = useApi();

  useEffect(() => {
    const storedColumns = localStorage.getItem("columns");
    if (storedColumns) {
      const allLists = Object.values(JSON.parse(storedColumns));
      const filteredLists = allLists.filter((list) => list.id !== task.list_id); // Filter out the current list
      setLists(filteredLists);
    }
  }, [open, task.list_id]); // Added task.list_id dependency

  /**
   * Moves the task to the specified list.
   * @param {number} targetListId - The ID of the list to move the task to.
   * @returns {Promise<void>} - A Promise that resolves when the task has been moved.
   */
  const handleMoveTask = async (targetListId) => {
    try {
      const response = await api.patch(`/tasks/${task.id}/move`, {
        list_id: targetListId,
      });

      if (response.ok) {
        fetchLists();
        onClose();
      } else {
        console.error("Failed to move task");
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  return (
    <Modal show={open} onHide={onClose}>
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
