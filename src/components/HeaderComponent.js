import React from "react"
import {Navbar, Container, NavLink, NavDropdown, Nav, Image,Row,Col} from "react-bootstrap";
import NavigationComponent from "./NavigationComponent";

function HeaderComponent({sesija,unistiSesiju,korisnik}){
    return(
        <Row className={"mt-5"}>
            <a href={"/"}><Image src={"../logo.png"} className={"logo"}/></a>
            <NavigationComponent sesija={sesija} unistiSesiju={() => unistiSesiju()} korisnik={korisnik}/>
        </Row>
    );
}

export default HeaderComponent