import React, {useState} from "react"
import {Button, Form} from "react-bootstrap";

function ObjaviKomentarComponent({objava}){

    console.info(objava.id);


    const [duzina,setDuzina]=useState(250)
    const [prosli,setProsli]=useState(0)

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
        <Form className={"mb-3 mt-3"}>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" maxLength="250" rows={3} onChange={promjena.bind(this)} placeholder={"Unesite sadržaj komentara..."}/>
                <Form.Text className="text-muted">
                    Preostaje Vam još <b className="preostalo-poruka" id="preostalo">{duzina}</b> karaktera.
                </Form.Text>
            </Form.Group>
            <Button type={"primary"} className={"w-100"} id="dugme">Objavite komentar</Button>
        </Form>
    );
}

export default ObjaviKomentarComponent