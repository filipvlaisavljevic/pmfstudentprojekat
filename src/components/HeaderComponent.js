import React from "react"
import {Navbar, Container, NavLink, NavDropdown, Nav, Image,Row,Col} from "react-bootstrap";
import NavigationComponent from "./NavigationComponent";

function HeaderComponent(){
    return(
        <div className={"mt-5"}>
            <Image src={"../logo.png"}/>
            <NavigationComponent/>
        </div>
    );
}

export default HeaderComponent