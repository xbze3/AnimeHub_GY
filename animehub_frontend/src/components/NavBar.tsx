import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../component_css/NavBar.css";

function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home" id="nav_brand">
                    AnimeHub
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Products</Nav.Link>
                    {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
