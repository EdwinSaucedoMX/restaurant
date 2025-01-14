import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import NavDoubleDropdown from './NavDoubleDropdwon';
import CartWidget from './CartWidget';
import Login from './Login';
    
import {useState} from 'react';

/* Just Testing */
function Navbar_() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar 
        sticky="top"
        bg="light" 
        expand="lg">
        <Container fluid>
            <Navbar.Brand href="#home"><img
              alt="Coffe_Time_Logo"
              src="https://static.vecteezy.com/system/resources/previews/010/160/674/original/coffee-icon-sign-symbol-design-free-png.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}Coffe Time</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav 
            
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight : '100px'}}
            navbarScroll>
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link role='button' onClick={handleShow} >Login</Nav.Link>
                
                {/* <NavDoubleDropdown title="Categories"/> */}
                {/* <NavDropdown title="Dropdown" id="navbarScrolliingDropdown">                    
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}

            <Offcanvas show={show} onHide={handleClose} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title as="h1">Login</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Login />
                </Offcanvas.Body>
                
            </Offcanvas>

            </Nav>
            <CartWidget className="cart-widget" />
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark" disabled>Search</Button>
          </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Navbar_;