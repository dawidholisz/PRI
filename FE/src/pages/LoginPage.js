import React, {useState} from 'react';
import {Redirect, useHistory,useLocation } from "react-router-dom";
import {InputGroup, FormControl,Button} from "react-bootstrap";

import {useAuth} from "../contexts/AuthContext";

const LoginPage = () => {
    const [inputValue,setInputValue] = useState('')
    const {isAuth, setUser} = useAuth()
    const history = useHistory()
    let {state} = useLocation();

    if (isAuth)
        return <Redirect to="/"/>

    const login = () => {
        setUser(inputValue)
        history.replace(state?.from||'/')
    }
    return (
        <div>

            <InputGroup className="mb-3">
                <FormControl
                    placeholder="User name"
                    aria-label="User name"
                    aria-describedby="basic-addon2"
                    value={inputValue} onChange={e=>setInputValue(e.target.value)}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary"  onClick={login}>Sign in</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
};

export default LoginPage;