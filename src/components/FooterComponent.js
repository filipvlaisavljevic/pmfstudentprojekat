import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

function FooterComponent(){
    return(
        <Navbar bg="light" expand="lg" className={"mt-3"}>
                <Nav className="mx-auto">
                    <Nav.Link>
                        Sva prava zadržana © DWS 2021
                    </Nav.Link>
                </Nav>
        </Navbar>
    );
}

export default FooterComponent;