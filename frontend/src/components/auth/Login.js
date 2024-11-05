import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiProvider";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "./AlertMessage";

/**
 * Login component that allows users to log in to the application.
 * @returns {JSX.Element} Login form component.
 */
const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    key: Date.now(),
    open: false,
    message: "",
    severity: "error",
  });

  const navigate = useNavigate();
  const api = useApi();
  const { login } = useContext(AuthContext); // Removed isLoggedIn

  /**
   * Handles changes to the form data.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Triggers an alert message.
   * @param {string} message - The message to display in the alert.
   * @param {string} severity - The severity of the alert (error, warning, info, success).
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
   * Handles form submission.
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData);
      if (response.ok) {
        login(response.data);
        navigate("/");
      } else {
        triggerAlert("Login failed. Please check your credentials.");
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
            <h2 className="text-center">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="login" className="mt-3">
                <Form.Label>Login</Form.Label>
                <Form.Control
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  autoFocus
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
              <Button type="submit" variant="primary" className="w-100 mt-3">
                Login
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

export default Login;
