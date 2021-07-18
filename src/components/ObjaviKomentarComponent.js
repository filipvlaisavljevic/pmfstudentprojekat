import React, {useState} from "react"
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";

function ObjaviKomentarComponent({objava,handler}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [duzina,setDuzina]=useState(250)
    const [prosli,setProsli]=useState(0)

    const onSubmit=data=>{
        console.log(data)
        console.log(objava.id)
        axios.post('https://dwsproject.herokuapp.com/addComment',{
            text: data.text,
            post_id: objava.id
        })
            .then((response)=>{
                console.log(response)
                document.getElementById('t').value=""
                setDuzina(250)
                handler();
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    function promjena(event){
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

    return(
        <Form className={"mb-3 mt-3"} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" id="t" maxLength="250" placeholder={"Unesite sadržaj komentara..."} rows={3}
                              {...register('text',{
                                  required: "Morate unijeti text"
                              })}
                              onChange={promjena.bind(this)}/>
                <Form.Text className="text-muted">
                    Preostaje Vam još <b className="preostalo-poruka" id="preostalo">{duzina}</b> karaktera.
                </Form.Text>
            </Form.Group>
            <Button type={"primary"} className={"w-100"} id="dugme">Objavite komentar</Button>
        </Form>
    );
}

export default ObjaviKomentarComponent