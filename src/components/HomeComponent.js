import React, {useEffect, useState} from "react"
import {Row,Col,Container} from "react-bootstrap";
import {CaretDownFill, CaretRightFill} from 'react-bootstrap-icons';
import ObjavaComponent from "./ObjavaComponent";
import SugestijaComponent from "./SugestijaComponent";
import ObjaviPostComponent from "./ObjaviPostComponent";
import axios from "axios";
import MiniLoadingComponent from "./MiniLoadingComponent";
import { checkText } from 'smile2emoji'
import YouTube from "react-youtube";

axios.defaults.withCredentials = true;

function HomeComponent({unistiSesiju,sesija}){

    const[predlozeni,setPredlozeni] = useState([]);
    const[promjena,setPromjena] = useState(false);
    const[feed,setFeed] = useState([]);
    const[loading,setLoading] = useState(true);

    function handler(){
        setPromjena(!promjena);
    }

    function getPredlozeni(){
        axios.get("https://dwsproject.herokuapp.com/recommendations").then(
            (response) =>{
                setPredlozeni(response.data);
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

    function getFeed(){
        axios.get("https://dwsproject.herokuapp.com/getFeed").then(
            (response) =>{
                setFeed(response.data);
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
        getFeed()
    },[])

    useEffect(() =>{
        getFeed()
    },[promjena])

    useEffect(() =>{
        getPredlozeni()
    },[promjena])

    useEffect(() =>{
        getPredlozeni()
    },[])


    return(
        <div>
            <Container>
                <Row className={"mb-4"}>
                    <Col md={8} className="lijevi-dio">
                        <div className={"mt-5 banner pt-2 pb-2 mb-4"}>
                            <CaretDownFill/> Nedavne objave ostalih studenata
                        </div>
                        <ObjaviPostComponent handler={() => handler()}/>
                        {loading ? <div className={"text-center"}>
                                <MiniLoadingComponent/>
                            </div> :
                            <div className="scrollbar2 w-100 containerm" id="style-1">
                                <div className="force-overflow">
                                    {feed.length > 0 ? feed.map((objava)=>(
                                        <ObjavaComponent objava={objava} handler={() => handler()} unistiSesiju={() => unistiSesiju()} sesija={sesija}/>
                                    ))
                                    :
                                        <div className={"banner pt-2 pb-2 mb-4"}>
                                            <CaretRightFill/> Trenutno nema objava za prikazati.
                                        </div>
                                    }
                                </div>
                            </div>
                        }
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
                                        <SugestijaComponent predlozen={predlozen} handler={() => handler()}
                                        unistiSesiju={() => unistiSesiju()}/>
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

export default HomeComponent