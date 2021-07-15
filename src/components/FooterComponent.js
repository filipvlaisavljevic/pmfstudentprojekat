import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

function FooterComponent(){
    return(
        <Navbar bg="light" expand="lg" className={"mt-3"}>
            <Container>
                <Nav className="mx-auto">
                    <Nav.Link>
                        Sva prava zadržana © DWS 2021
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default FooterComponent;