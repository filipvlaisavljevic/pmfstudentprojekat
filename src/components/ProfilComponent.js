import React, {useEffect, useState} from "react"
import {Container, Row, Col, Image, Button, Card,ListGroup,OverlayTrigger,Tooltip} from "react-bootstrap";
import SugestijaComponent from "./SugestijaComponent";
import ObjavaComponent from "./ObjavaComponent";
import {Link} from "react-router-dom";
import {CaretDownFill, CaretRightFill, CircleFill, HandThumbsUpFill} from "react-bootstrap-icons";
import {PencilSquare} from "react-bootstrap-icons";
import FullObjavaComponent from "./FullObjavaComponent";
import axios from "axios";
import MiniLoadingComponent from "./MiniLoadingComponent";
import ObjaviPostComponent from "./ObjaviPostComponent";

axios.defaults.withCredentials = true;

function ProfilComponent({korisnik,unistiSesiju}){

    const[predlozeni,setPredlozeni] = useState([]);
    const[promjena,setPromjena] = useState(false);
    const[objave,setObjave] = useState([]);
    const[loading,setLoading] = useState(true);
    const[user,setUser] = useState(korisnik);

    function handler(){
        setPromjena(!promjena);
    }

    function azurirajKorisnika(){
        setLoading(true);
        axios.get("https://dwsproject.herokuapp.com/getMyProfileInformation").then(
            (response) =>{
                setUser(response.data);
                setLoading(false);
            }
        ).catch((error) => {
            switch (error.response.status) {
                case 403:
                    unistiSesiju();
                default:
                    unistiSesiju()
                    setLoading(false)
            }
        });
    }

    useEffect(() => {
        azurirajKorisnika()
    },[promjena])

    function getPredlozeni(){
        axios.get("https://dwsproject.herokuapp.com/recommendations").then(
            (response) =>{
                setPredlozeni(response.data);
            },
            (error) =>{
                console.log(error)
            }
        ).catch((error) => {
            switch (error.response.status) {
                case 403:
                    unistiSesiju();
                default:
                    console.log(error)
            }
        });
    }

    function getObjave(){
        axios.get("https://dwsproject.herokuapp.com/getMyPosts").then(
            (response) =>{
                setObjave(response.data);
                setLoading(false);
            },
            (error) =>{
                console.log(error)
            }
        ).catch((error) => {
            switch (error.response.status) {
                case 403:
                    unistiSesiju();
                default:
                    console.log(error)
            }
        });
    }



    useEffect(() =>{
        getPredlozeni()
    },[])

    useEffect(() =>{
        getPredlozeni()
    },[promjena])

    useEffect(() =>{
        getObjave()
    },[]);

    useEffect(() =>{
        getObjave()
    },[promjena])

    const renderAktivan = (props) => (
        <Tooltip id="button-tooltip-2" {...props}>
            Aktivan
        </Tooltip>
    );

    const renderNeaktivan = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Neaktivan
        </Tooltip>
    );

    return(
        <div>
            <Container>
                <Row className={"mb-4"}>
                    <Col md={8} className="lijevi-dio">
                        <div className="mt-5 banner mb-4">
                            <Row>
                                <Col md="auto">
                                    <Image src={user.picture}
                                           className='profilna-slika d-none d-lg-block' fluid/>
                                </Col>
                                <Col md="auto" className={"mt-1"}>
                                    <Row>
                                        <Col>
                                            <span className='font-podaci'>
                                                {user.active ?
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderAktivan()}
                                                    >
                                                        <CircleFill className={"aktivan"} size={12}/>
                                                    </OverlayTrigger>
                                                    :
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderNeaktivan()}
                                                    >
                                                        <CircleFill className={"neaktivan"} size={12}/>
                                                    </OverlayTrigger>}
                                                <b> {user.first_name} {user.last_name}</b></span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span className='font-nick'>@{user.username}</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1 mt-1">
                                        <Col md="auto">
                                            <span>Pratitelji: <b><a href={"/followers/"+user.id} className={"followeri"}>{user.number_of_followers}</a></b></span>
                                        </Col>
                                        <Col md="auto">
                                            <span>Pratim: <b><a href={"/following/"+user.id} className={"followeri"}>{user.number_of_people_i_follow}</a></b></span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <ObjaviPostComponent handler={() => handler()}/>
                        <div className={"scrollbar2 w-100 containerm"} id={"style-2"}>
                            <div className="force-overflow">
                            {objave.length > 0 ? objave.map((objava) =>(
                                <FullObjavaComponent objava={objava} handler={() => handler()} unistiSesiju={() => unistiSesiju()}
                                sesija={korisnik}/>
                            ))
                            :
                                <div className={"banner pt-2 pb-2 mb-4"}>
                                    <CaretRightFill/> Nemate objavljenih objava.
                                </div>
                            //    Testiram discord bota. :)
                            }
                            </div>
                        </div>
                    </Col>

                    <Col md={4} className="desni-dio">
                        <div className={"mt-5 banner pt-2 pb-2 mb-4"}>
                            <CaretDownFill/> Dodajte i nove studente
                        </div>
                        {loading ? <div className={"text-center"}>
                                        <MiniLoadingComponent/>
                                    </div> :
                            <div className="scrollbar w-100" id="style-1">
                                <div className="force-overflow">
                                    {predlozeni.map((predlozen)=>(
                                        <SugestijaComponent predlozen={predlozen} handler={() => handler()} unistiSesiju={() => unistiSesiju()}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default ProfilComponent;