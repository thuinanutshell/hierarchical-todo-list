import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useApi } from "../../contexts/ApiProvider";

const EditList = ({ columnId, initialName, onUpdateLists }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState(initialName);
  const [isNameValid, setNameValid] = useState(true);
  const api_provider = useApi();

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleConfirmEdit = async () => {
    if (!editedName.trim()) {
      setNameValid(false);
      return;
    }
    try {
      const response = await api_provider.patch("/update_list_name", {
        id: columnId,
        name: editedName,
      });
      if (response.ok) {
        console.log("Successfully updated column name.");
        onUpdateLists();
      } else {
        console.error("Failed to update column name.");
      }
    } catch (error) {
      console.error("Error updating column name:", error);
    }
    handleCloseEditDialog();
  };

  return (
    <>
      <Button variant="link" onClick={handleOpenEditDialog}>
        <FaPencilAlt />
      </Button>
      <Modal show={isEditDialogOpen} onHide={handleCloseEditDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Edit list name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editedName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={editedName}
              onChange={(e) => {
                setNameValid(true);
                setEditedName(e.target.value);
              }}
              isInvalid={!isNameValid}
            />
            <Form.Control.Feedback type="invalid">
              List name cannot be empty
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditDialog}>
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