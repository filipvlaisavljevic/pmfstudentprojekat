import React from "react"
import {Container, Nav, Navbar,Form,FormControl,Button} from "react-bootstrap";

function NavigationComponent({sesija}){
    return(
        <Navbar bg="light" expand="lg" className={"mt-3"}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!sesija ? <Nav.Link href="/login">Loguj se</Nav.Link> : <div></div>}
                        {!sesija ? <Nav.Link href="/register">Registruj se</Nav.Link> : <div></div>}
                        { sesija ? <Nav.Link href="/profil">Profil</Nav.Link> : <div></div> }
                        { sesija ? <Nav.Link href="/objava">Objava</Nav.Link> : <div></div> }
                        { sesija ? <Nav.Link href="/pretraga">Pretraga</Nav.Link> : <div></div> }
                        { sesija ? <Nav.Link href="/chat">Chat</Nav.Link> : <div></div> }
                    </Nav>

                    {/*Pretraživanje*/}
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Pronađi prijatelje"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="primary">Pretraži</Button>
                    </Form>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationComponent