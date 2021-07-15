import React from "react"
import {Navbar, Container, NavLink, NavDropdown, Nav, Image,Row,Col} from "react-bootstrap";
import NavigationComponent from "./NavigationComponent";

function HeaderComponent(){
    return(
        <div className={"mt-5"}>
            <a href={"/"}><Image src={"../logo.png"}/></a>
            <NavigationComponent/>
        </div>
    );
}

export default HeaderComponent