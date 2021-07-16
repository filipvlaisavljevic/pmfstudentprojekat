import React from "react"
import {CaretDownFill} from "react-bootstrap-icons";
import SugestijaComponent from "./SugestijaComponent";
import {Button, Card, Row} from "react-bootstrap";
import PorukaNeotvorenaComponent from "./PorukaNeotvorenaComponent";

function ChatComponent(){
    return(
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Konverzacije sa ostalim studentima
            </div>
            <form action={"/novaporuka"}>
                <Button type={"primary"} className={"w-100 mb-3"}>Nova poruka</Button>
            </form>
            <PorukaNeotvorenaComponent/>
        </div>
    )
}

export default ChatComponent