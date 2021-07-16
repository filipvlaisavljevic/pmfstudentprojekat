import React from "react"
import {Button, Form} from "react-bootstrap";

function ObjaviPostComponent(){

    return(
        <Form className={"mb-3"}>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" maxLength="250" rows={3} placeholder={"Unesite sadržaj nove objave..."}/>
            </Form.Group>
            <Button type={"primary"} className={"w-100"}>Objavite novi post</Button>
        </Form>
    );
}

export default ObjaviPostComponent