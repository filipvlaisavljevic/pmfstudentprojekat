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
    const [duzina,setDuzina]=useState(250)
    const [prosli,setProsli]=useState(0)
    const[chat,setChat] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    let {id} = useParams();

    function handler(){
        setPromjena(!promjena)
    }

    function promjenaTexta(event){
        let input=event.target.value;
        if(input.length>prosli) {
            setDuzina(duzina + (prosli-input.length))
            if(duzina+(prosli-input.length)===0){
                document.getElementById('preostalo').classList.remove('preostalo-manje')
                document.getElementById('preostalo').classList.remove('preostalo-poruka')
                document.getElementById('preostalo').classList.add('preostalo-nista')
            }
            else if (duzina + (prosli-input.length) < 20) {
                document.getElementById('preostalo').classList.remove('preostalo-poruka')
                document.getElementById('preostalo').classList.remove('preostalo-nista')
                document.getElementById('preostalo').classList.add('preostalo-manje')
            }
            setProsli(input.length)
        }else{
            setDuzina(duzina+(prosli-input.length))
            if(duzina+(prosli-input.length)>=20){
                document.getElementById('preostalo').classList.remove('preostalo-manje')
                document.getElementById('preostalo').classList.remove('preostalo-nista')
                document.getElementById('preostalo').classList.add('preostalo-poruka')

            }else if(duzina+(prosli-input.length)<20){
                document.getElementById('preostalo').classList.remove('preostalo-poruka')
                document.getElementById('preostalo').classList.remove('preostalo-nista')
                document.getElementById('preostalo').classList.add('preostalo-manje')
            }
            setProsli(input.length)
        }

    }

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

    function getChat1(){
        axios.post("https://dwsproject.herokuapp.com/getMessagesBeetweenUsers ",{
            id: id
        }).then(
            (response) =>{
                console.info(response)
                setChat(response.data)
                setLoading(false);
                scrollajDole();
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

    function postaljiPoruku(text){
        axios.post("https://dwsproject.herokuapp.com/sendMessage ",{
            id: id,
            text:text
        }).then(
            (response) =>{
                console.info(response)
                document.getElementById('t').value="";
                document.getElementById('preostalo').classList.remove('preostalo-manje')
                document.getElementById('preostalo').classList.remove('preostalo-nista')
                document.getElementById('preostalo').classList.add('preostalo-poruka')
                setDuzina(250)
                setProsli(0)
                setPromjena(!promjena)
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
        postaljiPoruku(data.text)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getChat()
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    function scrollajDole(){
        window.scrollTo(0,document.body.scrollHeight);
    }

    useEffect(() =>{
       getChat1()
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
                    <Form.Control as="textarea" id="t" maxLength="250" rows={3} placeholder="Unesite poruku..."
                                  {...register('text',{
                                      required: "Morate unijeti text"
                                  })}
                                  onChange={promjenaTexta.bind(this)}
                    />
                    <Form.Text className="text-muted">
                        Preostaje Vam jo?? <b className="preostalo-poruka" id="preostalo">{duzina}</b> karaktera.
                    </Form.Text>
                </Form.Group>
                <Button type={"primary"} className={"w-100"} id="dugme">Po??aljite poruku</Button>
            </Form>
        </div>
    )
}

export default ChatPersonComponent