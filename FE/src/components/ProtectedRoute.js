import React from 'react';
import {Route, Redirect,useLocation} from 'react-router-dom'

import {useAuth} from "../contexts/AuthContext";

const ProtectedRoute = ({children, ...rest}) => {
    const {isAuth} = useAuth()
    const location = useLocation()

    if(!isAuth)
        return <Redirect to={{pathname:"/login", state:{from:location.pathname}}} />

    return (
        <Route {...rest}>
            {children}
        </Route>
    );
};


export default ProtectedRoute;