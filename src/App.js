import logo from './logo.svg';
import './App.css';
import {Container,Button} from "react-bootstrap";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomeComponent from "./components/HomeComponent";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ProfilComponent from "./components/ProfilComponent";
import EditProfilaComponent from "./components/EditProfilaComponent";
import FullObjavaComponent from "./components/FullObjavaComponent";
import PretragaComponent from "./components/PretragaComponent";
import ChatComponent from "./components/ChatComponent";
import NovaPorukaComponent from "./components/NovaPorukaComponent";
import {useState} from "react";

function App() {

    const [sesija,setSesija] = useState(false);
    const [korisnik,setKorisnik] = useState(false);

    function postaviSesiju(){
        setSesija(true);
    }

    function unistiSesiju(){
        setSesija(false);
    }

  return (
      <Router>
        <Container>
          <HeaderComponent/>
            {/*  Prikaz početne stranice za sve logovane korisnike*/}
            <Switch>
                <Route path="/login">
                    <LoginComponent />
                </Route>
                <Route path="/register">
                    <RegisterComponent postaviSesiju={() => postaviSesiju()}/>
                </Route>
                <Route path="/profil/edit">
                    <EditProfilaComponent/>
                </Route>
                <Route path="/profil">
                    <ProfilComponent/>
                </Route>
                <Route path="/objava">
                    <FullObjavaComponent/>
                </Route>
                <Route path="/pretraga">
                    <PretragaComponent/>
                </Route>
                <Route path="/chat">
                    <ChatComponent/>
                </Route>
                <Route path="/novaporuka">
                    <NovaPorukaComponent/>
                </Route>
                <Route path="/">
                    <HomeComponent/>
                </Route>
            </Switch>
          <FooterComponent/>
        </Container>
      </Router>
  );
}

export default App;
