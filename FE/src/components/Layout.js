import React from 'react';
import {useHistory} from "react-router-dom";
import {Nav, Container, Button, Navbar} from 'react-bootstrap'

import {useAuth} from "../contexts/AuthContext";

const Layout = ({children}) => {
    const {isAuth, setUser} = useAuth()
    const history = useHistory()

    const logOut = () => {
        setUser()
        history.replace('/')
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    Osom tudulist
                </Navbar.Brand>
                <Nav defaultActiveKey="/home" as="ul" className="mr-auto">
                    <Nav.Item as="li">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href="/my-tasks">My task</Nav.Link>
                    </Nav.Item>
                    {!isAuth && (
                        <Nav.Item as="li">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav.Item>)}
                </Nav>
                {isAuth && <Button variant="outline-danger" onClick={logOut}>Log out</Button>}
            </Navbar>
            <main>
                <Container>
                    {children}
                </Container>
            </main>
        </>
    )
}

export default Layout