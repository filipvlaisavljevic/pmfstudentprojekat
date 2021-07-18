import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import axios from "axios";
import MiniLoadingComponent from "./MiniLoadingComponent";
import {CaretDownFill, PersonPlusFill} from "react-bootstrap-icons";
import SugestijaComponent from "./SugestijaComponent";
import {Card, Row} from "react-bootstrap";

function FollowersComponent({unistiSesiju,korisnik}){
    const[loading,setLoading] = useState(true);
    const[followers,setFollowers] = useState([]);
    const[promjena,setPromjena] = useState(false);
    let { id } = useParams();

    function handler(){
        setPromjena(!promjena)
    }

    function getFollowers(){
        setLoading(true);
        axios.post("https://dwsproject.herokuapp.com/getFollowers",{
            id:id
        }).then(
            (response) =>{
                setFollowers(response.data);
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


    useEffect(() =>{
       getFollowers()
    },[])


    useEffect(() =>{
        getFollowers()
    },[promjena])

    if(loading)
        return <MiniLoadingComponent/>
    return(
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Osobe koje me prate:
            </div>
            {followers.map((follower) =>(
                <div>
                    <Card className={"mb-3"}>
                        <Card.Img variant="top" src={follower.picture} className={"d-none d-lg-block recommended-slika"}
                        />
                        <Card.Body>
                            <Card.Text className={"follow"}>
                                <Row>
                                    <div className={"ml-1"}>
                                        <span className={"text2"}>  {follower.first_name} {follower.last_name}</span>
                                    </div>
                                </Row>
                                <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>
                                <a href={"/profil/"+follower.id}>@{follower.username}</a>
                            </span>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default FollowersComponent