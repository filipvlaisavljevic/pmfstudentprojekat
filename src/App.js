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

function App() {
  return (
      <Router>
        <Container>
          <HeaderComponent/>
            {/*  Prikaz početne stranice za sve logovane korisnike*/}
            <Switch>
                <Route path="/login">
                    <LoginComponent />
                </Route>
                <Route path="/profil">
                    <ProfilComponent/>
                </Route>
                <Route path="/register">
                    <RegisterComponent />
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
