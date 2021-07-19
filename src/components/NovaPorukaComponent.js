import React, {useState} from "react"
import {CaretDownFill} from "react-bootstrap-icons";
import {Button, Form} from "react-bootstrap";

function NovaPorukaComponent(){
    const [duzina,setDuzina]=useState(250)
    const [prosli,setProsli]=useState(0)

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

    return(
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Pošalji novu poruku
            </div>

            <Form className={"mb-3"}>
                <Form.Group className={"mb-3"}>
                    <select className="form-select form-select-md mb-3" aria-label=".form-select-lg example">
                        <option selected>Odaberite primaoca poruke</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" id="t" maxLength="250" rows={3} placeholder={"Unesite sadržaj nove poruke..."}
                                  onChange={promjenaTexta.bind(this)}
                    />
                    <Form.Text className="text-muted">
                        Preostaje Vam još <b className="preostalo-poruka" id="preostalo">{duzina}</b> karaktera.
                    </Form.Text>
                </Form.Group>
                <Button type={"primary"} className={"w-100"}>Pošaljite poruku</Button>
            </Form>
        </div>
    );
}

export default NovaPorukaComponent