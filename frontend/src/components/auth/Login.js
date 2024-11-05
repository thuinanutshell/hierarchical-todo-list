import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiProvider";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "./AlertMessage";

/**
 * Login Component
 * 
 * This component renders a login form and handles user authentication.
 * 
 * @returns {JSX.Element} The Login component.
 */
const Login = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  // State to manage alert messages
  const [alert, setAlert] = useState({
    key: Date.now(),
    open: false,
    message: "",
    severity: "error",
  });

  // Hooks for navigation and API context
  const navigate = useNavigate();
  const api = useApi();
  const { login } = useContext(AuthContext);

  /**
   * Handle input change
   * 
   * This function updates the form data state when the user types in the input fields.
   * 
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const triggerAlert = (message, severity = "error") => {
    setAlert({
      key: Date.now(),
      open: true,
      message,
      severity,
    });
  };

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
      {/* Form layout and components */}
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
