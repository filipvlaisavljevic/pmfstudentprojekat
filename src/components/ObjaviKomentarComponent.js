import React from "react"
import {Button, Form} from "react-bootstrap";

function ObjaviKomentarComponent(){
    return(
        <Form className={"mb-3 mt-3"}>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" maxLength="90" rows={1} placeholder={"Unesite sadržaj komentara..."}/>
            </Form.Group>
            <Button type={"primary"} className={"w-100"}>Objavite komentar</Button>
        </Form>
    );
}

export default ObjaviKomentarComponent