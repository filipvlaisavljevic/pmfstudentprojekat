import React, {useEffect} from "react";
import {Col, Image, Row, Button, Container, Card} from "react-bootstrap";
import {Grid, HandThumbsUpFill, PersonPlus} from "react-bootstrap-icons";
import {PersonPlusFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;

function RezultatComponent({predlozen,handler,unistiSesiju}){

    function zapratiKorisnika(data){
        axios.post("https://dwsproject.herokuapp.com/follow",{
            id: data
        }).then(
            (response) =>{
                Swal.fire({
                    title: 'Super!',
                    text: 'Zapratili ste korisnika ' + predlozen.first_name + " " + predlozen.last_name,
                    icon: 'success',
                    confirmButtonText: 'Nastavi dalje'
                })
                handler();
            },
            (error) =>{
                console.log(error)
            }
        ).catch((error) => {
            console.log(error)
            switch (error.response.status) {
                case 403:
                    unistiSesiju();
                default:
                    console.log(error)
            }
        });
    }

    return(
        <div>
            <Card className={"mb-3"}>
                <Card.Img variant="top" src={predlozen.picture} className={"d-none d-lg-block recommended-slika"}
                />
                <Card.Body>
                    <Card.Text className={"follow"}>
                        <Row>
                            <div className={"ml-1"}>
                                <span className={"text2"}>  {predlozen.first_name} {predlozen.last_name}</span>
                            </div>
                        </Row>
                        <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>
                                <a href={"/profil/"+predlozen.me_id}>@{predlozen.username}</a>
                            </span>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default RezultatComponent