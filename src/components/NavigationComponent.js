import React, {useState} from "react"
import {Container, Nav, Navbar,Form,FormControl,Button,NavDropdown} from "react-bootstrap";
import axios from "axios";
import {useForm} from "react-hook-form";
import {Redirect} from "react-router-dom";

function NavigationComponent({sesija,unistiSesiju,korisnik}){

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const[redirect,setRedirect] = useState(false);
    const[kveri,setKveri] = useState("");
    const onSubmit = data => postaviSearch(data.example);

    function odlogujKorisnika(){
        axios.post("https://dwsproject.herokuapp.com/logoutUser").then(
            (response) =>{
                console.log(response.data.success)
                window.location.href = "/login";
                unistiSesiju();
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    function postaviSearch(data){
        setKveri(data);
        setRedirect(true);
    }

    return(
        <Container>
            <Navbar bg="light" expand="lg" className={"mt-3"}>
                <Container>
                    {redirect ? <div><Redirect to={"/pretraga/"+kveri}/></div> : null}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {!sesija ? <Nav.Link href="/login">Loguj se</Nav.Link> : <div></div>}
                            {!sesija ? <Nav.Link href="/register">Registruj se</Nav.Link> : <div></div>}
                            { sesija ? <NavDropdown title="Moj profil">
                                <NavDropdown.Item href={"/mojprofil/"+korisnik.id}>Profil</NavDropdown.Item>
                                <NavDropdown.Item href="/profil/edit">Postavke</NavDropdown.Item>
                            </NavDropdown> : <div></div> }
                            { sesija ? <Nav.Link href="/chat">Chat</Nav.Link> : <div></div> }
                            { sesija ? <Nav.Link onClick={() => odlogujKorisnika()}>Logout</Nav.Link> : <div></div>}
                        </Nav>
                        {/*Pretra??ivanje*/}
                        <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
                            <FormControl
                                type="search"
                                placeholder="Prona??i prijatelje"
                                className="mr-2"
                                aria-label="Search"
                                {...register("example")}
                            />
                            <Button variant="primary" type={"submit"}>Pretra??i</Button>
                        </Form>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
}

export default NavigationComponent