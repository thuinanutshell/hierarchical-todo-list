import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";

/**
 * EditList component for editing a list's name.
 * 
 * This component renders a button to open a modal for editing a list's name.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.list_id - The ID of the list to edit.
 * @param {string} props.currentName - The current name of the list.
 * @param {Function} props.onUpdateLists - The function to call after editing the list.
 * @returns {JSX.Element} - The EditList component.
 */
const EditList = ({ list_id, currentName, onUpdateLists }) => {
  // State to manage the modal visibility
  const [showModal, setShowModal] = useState(false);
  // State to manage the edited list name
  const [editedName, setEditedName] = useState(currentName);

  // ApiProvider context for making API requests
  const api_provider = useApi();

  /**
   * Handles the change in the list name input field.
   * 
   * @param {Object} e - The event object.
   */
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  /**
   * Handles the confirmation of the list name edit.
   * 
   * This function makes an API request to update the list name and calls the onUpdateLists function
   * to update the list of lists after editing.
   */
  const handleConfirmEdit = async () => {
    try {
      // Make API request to update the list name
      const response = await api_provider.put("/edit_list/" + list_id, { name: editedName });

      if (!response.ok) {
        throw new Error("Failed to edit the list.");
      }

      // Call the onUpdateLists function to update the list of lists
      onUpdateLists();
      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error editing the list:", error);
      // Optionally: Show an error message to the user.
    }
  };

  return (
    <>
      <Button variant="warning" onClick={() => setShowModal(true)}>
        Edit
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formListName">
              <Form.Label>List Name</Form.Label>
              <Form.Control
                type="text"
                value={editedName}
                onChange={handleNameChange}
                placeholder="Enter new list name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmEdit}
            disabled={!editedName.trim()}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditList;