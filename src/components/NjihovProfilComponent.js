import React, {useEffect, useState} from "react"
import  {useParams
} from "react-router-dom";
import MiniLoadingComponent from "./MiniLoadingComponent";
import axios from "axios";
import {Col, Container, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {CaretDownFill, CircleFill} from "react-bootstrap-icons";
import ObjaviPostComponent from "./ObjaviPostComponent";
import FullObjavaComponent from "./FullObjavaComponent";
import SugestijaComponent from "./SugestijaComponent";

axios.defaults.withCredentials = true;

function NjihovProfilComponent({unistiSesiju}){

    const[loading,setLoading] = useState(true);
    const[korisnik,setKorisnik] = useState([]);
    const[promjena,setPromjena] = useState(false);
    const[predlozeni,setPredlozeni] = useState([]);

    function handler(){
        setPromjena(!promjena);
    }

    let { id } = useParams();

    function fetchKorisnik(){
        axios.post("https://dwsproject.herokuapp.com/getProfileById",
            {
                id:id
            }).then(
            (response) =>{
                setKorisnik(response.data)
                setLoading(false);
            },
            (error) =>{
                console.log(error)
            }
        ).catch((error) => {
            switch (error.response.status) {
                case 403:
                    unistiSesiju();
                    setLoading(false);
                default:
                    console.log(error)
            }
        });
    }

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

    const renderAktivan = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Aktivan
        </Tooltip>
    );

    const renderNeaktivan = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Neaktivan
        </Tooltip>
    );

    useEffect(() =>{
        fetchKorisnik()
    },[])

    useEffect(() =>{
        fetchKorisnik()
    },[promjena])

    useEffect(() =>{
        getPredlozeni()
    },[])

    useEffect(() =>{
        getPredlozeni()
    },[promjena])

    if(loading)
        return <MiniLoadingComponent/>
    return(
        <div>
            <Container>
                <Row className={"mb-4"}>
                    <Col sm={8} style={{paddingLeft: 0}}>
                        <div className="mt-5 banner mb-4">
                            <Row>
                                <Col md="auto">
                                    <Image src={korisnik.picture}
                                           className='profilna-slika d-none d-lg-block' fluid/>
                                </Col>
                                <Col md="auto" className={"mt-1"}>
                                    <Row>
                                        <Col>
                                            <span className='font-podaci'>
                                                {korisnik.active ?
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
                                                <b> {korisnik.first_name} {korisnik.last_name}</b></span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span className='font-nick'>@{korisnik.username}</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1 mt-1">
                                        <Col md="auto">
                                            <span>Pratitelji: <b><a href={"#"} className={"followeri"}>{korisnik.number_of_followers}</a></b></span>
                                        </Col>
                                        <Col md="auto">
                                            <span>Pratim: <b><a href={"#"} className={"followeri"}>{korisnik.number_of_people_i_follow}</a></b></span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div className={"scrollbar2 w-100 containerm"} id={"style-2"}>
                            <div className="force-overflow">
                                {/*{korisnik.posts.map((objava) =>(
                                    <FullObjavaComponent objava={objava} handler={() => handler()}/>
                                ))}*/}
                                {console.info(korisnik)}
                            </div>
                        </div>
                    </Col>

                    <Col sm={4} style={{paddingRight: 0}}>
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
    );
}

export default NjihovProfilComponent