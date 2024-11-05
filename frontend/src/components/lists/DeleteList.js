import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useApi } from "../../contexts/ApiProvider";

/**
 * Renders a delete button for a list item.
 * @param {Object} props - The component props.
 * @param {string} props.list_id - The ID of the list to delete.
 * @param {Function} props.onUpdateLists - The function to call after deleting the list.
 * @returns {JSX.Element} - The delete button component.
 */
const DeleteList = ({ list_id, onUpdateLists }) => {
  const api_provider = useApi();

  async function deleteList() {
    try {
      const response = await api_provider.delete("/delete_list/" + list_id);

      if (!response.ok) {
        throw new Error("Failed to delete the list.");
      }

      onUpdateLists();
      console.log(response.body); // Assuming the response has a body, otherwise adapt this line.
    } catch (error) {
      console.error("Error deleting the list:", error);
      // Optionally: Show an error message to the user.
    }
  }

  return (
    <Button variant="danger" onClick={deleteList}>
      <Trash />
    </Button>
  );
};

export default DeleteList;
