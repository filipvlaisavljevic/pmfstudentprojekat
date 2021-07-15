import React from "react"
import {Card,Row,Col} from "react-bootstrap";
import {CaretDownFill, HandThumbsUp, HandThumbsDown, Facebook, HandThumbsUpFill} from 'react-bootstrap-icons';

function ObjavaComponent(){
    return(
        <div className="bezpaddinga">
            <Card className={"mb-3"}>
                <Card.Img variant="top" src="https://i.imgur.com/FW4FhbQ.png" className={"d-none d-lg-block"}/>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            Cras blandit ex ex, et vehicula ex faucibus suscipit. Nunc lobortis
                            ante vulputate risus aliquet egestas. Etiam quis tellus a purus ultrices
                            hendrerit id id sem. Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos ligula.{' '}
                        </p>
                        <footer className="blockquote-footer mt-2">
                            Filip Vlaisavljević
                        </footer>
                        <Card.Text>
                            <HandThumbsUpFill className={"palac"}/> <small>15 oznaka sviđa mi se</small>
                        </Card.Text>
                    </blockquote>
                </Card.Body>
            </Card>
            <Card className={"mb-3"}>
                <Card.Img variant="top" src="https://i.imgur.com/MLKU6yM.jpg" className={"d-none d-lg-block"}/>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            Nulla sagittis arcu a nibh fringilla, vel consequat ipsum porta.
                            Suspendisse vitae nibh consectetur orci malesuada consequat sed ut
                            lorem. Proin nec dui sit amet ligula ornare mattis et ac nibh.
                            Vivamus ac ornare eros. Sed a neque augue. Aliquam non.{' '}
                        </p>
                        <footer className="blockquote-footer mt-2">
                            Edah Sijerčić
                        </footer>
                        <Card.Text>
                            <HandThumbsUpFill className={"palac"}/> <small>25 oznaka sviđa mi se</small>
                        </Card.Text>
                    </blockquote>
                </Card.Body>
            </Card>

            <Card>
                <Card.Img variant="top" src="https://i.imgur.com/S4gTsXX.jpg" className={"d-none d-lg-block"}/>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}

                            Fusce tempus velit non est varius, interdum vehicula neque eleifend.
                            Phasellus nec est tincidunt, dictum odio non, placerat velit. Pellentesque
                            ultricies dolor vel neque tempus, sed suscipit lorem rhoncus. Phasellus et lacinia augue.
                            Vestibulum odio.{' '}
                        </p>
                        <footer className="blockquote-footer mt-2">
                            Tarik Pašić
                        </footer>
                        <Card.Text>
                            <HandThumbsUpFill className={"palac"}/> <small>55 oznaka sviđa mi se</small>
                        </Card.Text>
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ObjavaComponent