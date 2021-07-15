import React from "react"
import {Container, Nav, Navbar,Form,FormControl,Button} from "react-bootstrap";

function NavigationComponent(){
    return(
        <Navbar bg="light" expand="lg" className={"mt-3"}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/login">Loguj se</Nav.Link>
                        <Nav.Link href="#">Registruj se</Nav.Link>
                    </Nav>

                    {/*Pretraživanje*/}
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Pronađi prijatelje"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Pretraži</Button>
                    </Form>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationComponent