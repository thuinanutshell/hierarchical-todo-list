import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from "react";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Navbar component that displays the app title, user welcome message, and authentication buttons.
 * @returns {JSX.Element} JSX element containing the Navbar component.
 */
const NavBar = () => {
  const { username, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Function that handles the logout process by calling the logout function and navigating to the login page.
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-2">
      <Container>
        <Row className="w-100 align-items-center">
          <Col className="d-flex justify-content-start">
            <LinkContainer to="/">
              <Navbar.Brand>Hierarchical To-do List</Navbar.Brand>
            </LinkContainer>
          </Col>
          <Col className="d-flex justify-content-center">
            {isLoggedIn && (
              <Nav.Item className="d-flex align-items-center">
                <span className="navbar-text">Welcome! {username}</span>
              </Nav.Item>
            )}
          </Col>
          <Col className="d-flex justify-content-end">
            {isLoggedIn ? (
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Button variant="outline-light" style={{ marginRight: '5px' }}>
                    Login
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="outline-light" style={{ marginLeft: '5px' }}>
                    Register
                  </Button>
                </LinkContainer>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;