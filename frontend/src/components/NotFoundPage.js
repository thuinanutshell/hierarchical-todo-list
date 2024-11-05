import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Button, Container } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

/**
 * Renders a page with a 404 error message and a button to navigate to the homepage.
 * @returns {JSX.Element} JSX element containing the 404 error page.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <ExclamationTriangle size={100} className="text-primary mb-3" />
      <h1>404</h1>
      <h5>Oops! Page not found.</h5>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFoundPage;
