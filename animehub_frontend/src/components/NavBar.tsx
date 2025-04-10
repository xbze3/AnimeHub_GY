import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../component_css/NavBar.css";

function NavBar() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home" id="nav_brand">
                    AnimeHub
                </Navbar.Brand>
                <Nav className="me-auto">{/* Left aligned links */}</Nav>
                <Nav className="ms-auto">
                    {token && username ? (
                        <Nav.Link disabled style={{ color: "white" }}>
                            Welcome {username}
                        </Nav.Link>
                    ) : (
                        <Nav.Link as={Link} to={`/signup`}>
                            Login / Sign Up
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
