import React from "react"
import {Button, Form} from "react-bootstrap";

function RegisterComponent(){
    return(
        <Form className={"mt-4 mb-4"}>

            <Form.Group className="mb-3">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="email" placeholder="Unesite ime" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="email" placeholder="Unesite prezime" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Korisničko ime</Form.Label>
                <Form.Control type="email" placeholder="Unesite željeno korisničko ime" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control type="email" placeholder="Uniste email adresu" />
                <Form.Text className="text-muted">
                    Vašu email adresu nećemo dijeliti sa drugima.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Unesite password" />
                <Form.Text className="text-muted">
                    Vaš password nećemo dijeliti sa drugima.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className={"w-100"}>
                Loguj se
            </Button>

        </Form>
    )
}

export default RegisterComponent