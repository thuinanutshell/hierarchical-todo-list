import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";
import AlertMessage from "./AlertMessage";

/**
 * Register component for user registration.
 * @returns {JSX.Element} JSX element containing the registration form.
 */
const Register = () => {
  /**
   * State variables for form data and alert message.
   */
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({
    key: Date.now(),
    open: false,
    message: "",
    severity: "error",
  });

  /**
   * ApiProvider context for making API requests.
   */
  const api = useApi();

  /**
   * Event handler for input change.
   * @param {Object} e - Event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Function to trigger alert message.
   * @param {string} message - Alert message.
   */
  const triggerAlert = (message, severity = "error") => {
    setAlert({
      key: Date.now(),
      open: true,
      message,
      severity,
    });
  };

  /**
   * Event handler for form submission.
   * @param {Object} e - Event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here, e.g., API call
    try {
      const response = await api.post("/register", formData);
      if (response.ok) {
        triggerAlert("Registration successful!", "success");
      } else {
        triggerAlert("Registration failed. Please try again.");
      }
    } catch (error) {
      triggerAlert("An error occurred. Please try again.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="p-4 mt-3 border rounded">
            <h1 className="text-center">Register</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username" className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 mt-3">
                Register
              </Button>
            </Form>
            {alert.open && (
              <AlertMessage
                key={alert.key}
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                onClose={() => setAlert({ ...alert, open: false })}
                style={{ width: "100%", marginTop: "20px" }}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
