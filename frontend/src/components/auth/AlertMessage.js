import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Alert, Button } from "react-bootstrap";

/**
 * AlertMessage Component
 * 
 * This component displays a dismissible alert message using React Bootstrap.
 * 
 * @param {Object} props - The properties object.
 * @param {boolean} props.open - Determines if the alert should be displayed.
 * @param {string} props.message - The message to display in the alert.
 * @param {string} props.severity - The severity of the alert ('error', 'warning', 'info', 'success').
 * @param {function} props.onClose - The function to call when the alert is dismissed.
 * @param {Object} [props.style] - Optional additional styles to apply to the alert.
 * 
 * @returns {JSX.Element|null} The Alert component or null if not open.
 */
const AlertMessage = ({ open, message, severity, onClose, style }) => {
  // If the alert is not open, return null to render nothing
  if (!open) return null;

  // Map severity levels to Bootstrap alert variants
  const variantMap = {
    error: "danger",
    warning: "warning",
    info: "info",
    success: "success"
  };

  return (
    <Alert
      variant={variantMap[severity]} // Set the alert variant based on severity
      style={{ ...style }} // Apply additional styles if provided
      dismissible // Make the alert dismissible
      onClose={onClose} // Set the onClose handler
    >
      {message} {/* Display the alert message */}
      <Button
        variant="outline-light" // Set the button variant
        size="sm" // Set the button size
        onClick={onClose} // Set the onClick handler to close the alert
        aria-label="close" // Accessibility label for the button
        style={{ float: 'right' }} // Float the button to the right
      >
        &times; {/* Display the close icon */}
      </Button>
    </Alert>
  );
};

export default AlertMessage;
