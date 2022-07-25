import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect} from "react";
import Navbar from "../components/Navbar";

//Reacstrap Components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Col,
    Row,
} from "reactstrap";

function Dashboard() {

    const [customer, setCustomer] = useState("");
    const [user, setUser] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState();
    const [routeProfile, setRouteProfile] = useState();

    const history = useHistory();
    const logged = localStorage.getItem("Logged");

    const name = localStorage.getItem("Name")
    const email = localStorage.getItem("Email")
    const token = localStorage.getItem("Token")

    useEffect(() => {
        //Si el usuario no ha iniciado sesión redirigirlo al login
        if(logged !== "true")
        {
          history.push("/");
        }
    }, []);

    useEffect(() => {
        //Profile Pic Path
        const params = {
            pvOptionCRUD: "R"
        };
    
        var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/`);
    
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
        fetch(url, {
            method: "GET",
            headers: {
                "access-token": token,
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            var aux = data.find( o => o.Id_Catalog === 9)
            setRouteProfile(aux.Value)
        })
        .catch(function(err) {
            console.log(err)
        });
    
    }, []);

    useEffect(() => {
        var url = new URL(`${process.env.REACT_APP_API_URI}security-users/${email}`);
        fetch(url, {
          method: "GET",
          headers: {
              "access-token": token,
              "Content-Type": "application/json",
          }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            console.log(data)
            setImage(data[0].Profile_Pic_Path)
        })
        .catch(function(err) {
            console.log(err);
        });
    }, []);

    function getDataUser(){
        var url = new URL(`${process.env.REACT_APP_API_URI}security-users/${email}`);
        fetch(url, {
          method: "GET",
          headers: {
              "access-token": token,
              "Content-Type": "application/json",
          }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            setCustomer(data[0].Customer)
            setRole(data[0].Role_Desc)
            setUser(data[0].User)
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    return (
        <>
            <Navbar/>
            <Container className="dashboard-container">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12" md="6">
                        <Card className="card-login">
                            <CardHeader className="card-header">
                                <Row>
                                    <Col className="ml-auto mr-auto" lg="10" md="6">
                                        <h3 className="dashboard-header">¡Bienvenido {name}!</h3>
                                    </Col>
                                    <Col className="ml-auto mr-auto" lg="2" md="6">
                                        <Button type="submit" className="btn-round mb-3 data-button" onClick={getDataUser}>
                                            Obtener data
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="dashboard-data">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12" md="6">
                        <Card className="card-login">
                            <CardBody className="card-header">
                                <Row>
                                    <Col  md="5">
                                        <img src= {routeProfile + image} className="img-fluid img-character" alt="..."/>
                                    </Col>
                                    <Col md="7">
                                        <p className="data-name">{name}</p>
                                        <p className="data-items">Empresa: {customer}</p>
                                        {/*<p className="character-items">Status: {character.status === "Alive" ? <span className="dot-alive"></span> : <span className="dot-dead"></span>} {character.status}</p>*/}
                                        <p className="data-items">Rol: {role}</p>
                                        <p className="data-items">Usuario: {user} </p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    ) 
}

export default Dashboard;