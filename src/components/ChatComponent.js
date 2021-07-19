import React, {useEffect, useState} from "react"
import {CaretDownFill} from "react-bootstrap-icons";
import SugestijaComponent from "./SugestijaComponent";
import {Button, Card, Row} from "react-bootstrap";
import PorukaNeotvorenaComponent from "./PorukaNeotvorenaComponent";
import axios from "axios";
import MiniLoadingComponent from "./MiniLoadingComponent";
var Sound = require('react-sound').default;

function ChatComponent({unistiSesiju,korisnik}){

    const [loading,setLoading] = useState(true);
    const [rezultat,setRezultat] = useState([]);

    function getLatestMessages(){
        axios.get("https://dwsproject.herokuapp.com/getMessageFeed ").then(
            (response) =>{
                console.info(response)
                setRezultat(response.data)
                setLoading(false);
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
        getLatestMessages()
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            getLatestMessages()
        }, 7000);
        return () => clearInterval(interval);
    }, []);


    if(loading)
        return <MiniLoadingComponent/>
    return(
        <div className={"mt-5"}>
            <Sound url={"../alert.mp3"} playStatus={Sound.status.PLAYING}/>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Konverzacije sa ostalim studentima
            </div>
            <form action={"/novaporuka/"+korisnik.id}>
                <Button type={"primary"} className={"w-100 mb-3"}>Nova poruka</Button>
            </form>
            {rezultat.map((poruka) =>(
                poruka.recipient_id != korisnik.id ?
                        <a href={"/conversation/"+poruka.recipient_id} className={"lastmessage"}><PorukaNeotvorenaComponent podaci={poruka} korisnik={korisnik}
                            prikazslika={poruka.recipient_picture} prikazime={poruka.recipient_first_name} prikazprezime={poruka.recipient_last_name}
                        /></a>
                        :
                        <a href={"/conversation/"+poruka.sender_id} className={"lastmessage"}><PorukaNeotvorenaComponent podaci={poruka} korisnik={korisnik}
                             prikazslika={poruka.sender_picture} prikazime={poruka.sender_first_name} prikazprezime={poruka.sender_last_name}
                        /></a>

            ))}
        </div>
    )
}

export default ChatComponent