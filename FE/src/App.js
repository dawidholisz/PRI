import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';
import Layout from "./components/Layout";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import {AuthProvider} from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Layout>
                        <Switch>
                            <ProtectedRoute path="/my-tasks">
                                <TasksPage onlyMyTask/>
                            </ProtectedRoute>
                            <Route path="/login">
                                <LoginPage/>
                            </Route>
                            <Route path="/">
                                <TasksPage/>
                            </Route>
                        </Switch>
                    </Layout>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
