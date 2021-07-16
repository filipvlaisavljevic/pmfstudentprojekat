import React from "react"
import {CaretDownFill} from "react-bootstrap-icons";
import {Button, Form} from "react-bootstrap";

function NovaPorukaComponent(){
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
                    <Form.Control as="textarea" maxLength="250" rows={3} placeholder={"Unesite sadržaj nove poruke..."}/>
                </Form.Group>
                <Button type={"primary"} className={"w-100"}>Pošaljite poruku</Button>
            </Form>
        </div>
    );
}

export default NovaPorukaComponent