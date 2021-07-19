import React, {useEffect, useState} from "react";

import  {useParams
} from "react-router-dom";
import {Button, Card, Form, Row} from "react-bootstrap";
import axios from "axios";
import MiniLoadingComponent from "./MiniLoadingComponent";
import PorukaNeotvorenaComponent from "./PorukaNeotvorenaComponent";
import PorukaComponent from "./PorukaComponent";
import {CaretDownFill} from "react-bootstrap-icons";
import {useForm} from "react-hook-form";

function ChatPersonComponent({korisnik,unistiSesiju}){
    const[loading,setLoading] = useState(true);
    const[promjena,setPromjena] = useState(false);
    const[chat,setChat] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    let {id} = useParams();

    function getChat(){
        axios.post("https://dwsproject.herokuapp.com/getMessagesBeetweenUsers ",{
            id: id
        }).then(
            (response) =>{
                console.info(response)
                setChat(response.data)
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

    const onSubmit = async data=>{
        console.log(data)
    }

    useEffect(() =>{
       getChat()
    },[])

    useEffect(() =>{
        getChat()
    },[promjena])

    if(loading)
        return <MiniLoadingComponent/>
    return(
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Konverzacija
            </div>
            {chat.map((poruka) =>(
                <PorukaComponent poruka={poruka}/>
            ))}

            <Form className={"mb-3 mt-3"} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" id="t" maxLength="250" rows={3}/>
                </Form.Group>
                <Button type={"primary"} className={"w-100"} id="dugme">Pošaljite poruku</Button>
            </Form>
        </div>
    )
}

export default ChatPersonComponent