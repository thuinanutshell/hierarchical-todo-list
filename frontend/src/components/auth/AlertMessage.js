import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Alert, Button } from "react-bootstrap";

/**
 * Renders an alert message with a close button.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the alert message is open or not.
 * @param {string} props.message - The message to display in the alert.
 * @param {string} props.severity - The severity of the alert (error, warning, info, success).
 * @param {function} props.onClose - The function to call when the close button is clicked.
 * @param {Object} props.style - The style object to apply to the alert.
 * @returns {JSX.Element|null} The JSX element to render or null if the alert is not open.
 */
const AlertMessage = ({ open, message, severity, onClose, style }) => {
  if (!open) return null;

  const variantMap = {
    error: "danger",
    warning: "warning",
    info: "info",
    success: "success"
  };

  return (
    <Alert
      variant={variantMap[severity]}
      style={{ ...style }}
      dismissible
      onClose={onClose}
    >
      {message}
      <Button
        variant="outline-light"
        size="sm"
        onClick={onClose}
        aria-label="close"
        style={{ float: 'right' }}
      >
        &times;
      </Button>
    </Alert>
  );
};

export default AlertMessage;
