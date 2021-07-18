import React from "react"
import {Navbar, Container, NavLink, NavDropdown, Nav, Image,Row,Col} from "react-bootstrap";
import NavigationComponent from "./NavigationComponent";

function HeaderComponent({sesija,unistiSesiju,korisnik}){
    return(
        <div className={"mt-5"}>
            <a href={"/"}><Image src={"../logo.png"}/></a>
            <NavigationComponent sesija={sesija} unistiSesiju={() => unistiSesiju()} korisnik={korisnik}/>
        </div>
    );
}

export default HeaderComponent