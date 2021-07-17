import React from "react"
import {Spinner} from "react-bootstrap";

function MiniLoadingComponent(){
    return(
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default MiniLoadingComponent