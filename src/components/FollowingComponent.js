import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import axios from "axios";
import MiniLoadingComponent from "./MiniLoadingComponent";
import {CaretDownFill, PersonDashFill, PersonPlusFill} from "react-bootstrap-icons";
import {Card, Row} from "react-bootstrap";
import Swal from "sweetalert2";

function FollowingComponent({unistiSesiju}){
    const[loading,setLoading] = useState(true);
    const[following,setFollowing] = useState([]);
    const[promjena,setPromjena] = useState(false);
    let { id } = useParams();

    function handler(){
        setPromjena(!promjena)
    }


    function getFollowing(){
        setLoading(true);
        axios.get("https://dwsproject.herokuapp.com/getPeopleIFollow").then(
            (response) =>{
                setFollowing(response.data);
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

    function odpratiKorisnika(data,predlozen){
        axios.post("https://dwsproject.herokuapp.com/unfollow",{
            id: data
        }).then(
            (response) =>{
                Swal.fire({
                    title: 'Huh!',
                    text: 'Otpratili ste korisnika ' + predlozen.first_name + " " + predlozen.last_name,
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

    useEffect(() =>{
        getFollowing()
    },[])

    useEffect(() =>{
        getFollowing()
    },[promjena])

    if(loading)
        return <MiniLoadingComponent/>
    return(
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Osobe koje pratim:
            </div>
            {following.map((follower) =>(
                <div>
                    <Card className={"mb-3"}>
                        <Card.Img variant="top" src={follower.picture} className={"d-none d-lg-block recommended-slika"}
                        />
                        <Card.Body>
                            <Card.Text className={"follow"}>
                                <Row>
                                    <div className={"ml-1"}>
                                        <span className={"text1"} onClick={() => odpratiKorisnika(follower.id,follower)}><PersonDashFill/>  </span>
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

export default FollowingComponent