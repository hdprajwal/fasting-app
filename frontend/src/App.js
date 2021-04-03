import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from './provider/Auth.provider';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const base_url = 'http://localhost:8080';

function App() {
    axios.interceptors.request.use(
        (config) => {
            const { origin } = new URL(config.url);
            const allowedOrigins = [base_url];
            const token = localStorage.getItem('accessToken');
            if (allowedOrigins.includes(origin)) {
                config.headers.authorization = `Bearer ${token}`;
            }
            console.log(config);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // axios.interceptors.response.use(
    //     (response) => {
    //         return response;
    //     },
    //     async function (error) {
    //         console.log(error);
    //         const originalRequest = error.config;
    //         let refreshToken = localStorage.getItem('refreshToken');
    //         if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
    //             originalRequest._retry = true;
    //             return axios
    //                 .post(`${base_url}/auth/refreshToken`, {
    //                     refreshToken: refreshToken,
    //                 })
    //                 .then((res) => {
    //                     console.log(res);
    //                     if (res.status === 200) {
    //                         localStorage.setItem('accessToken', res.access.token);
    //                         localStorage.setItem('refreshToken', res.refresh.token);
    //                         return axios(originalRequest);
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 });
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    return (
        <Router>
            <div className="dark:bg-gray-900 bg-gray-100 min-h-screen">
                <Navbar />
                <div className="px-56">
                    <Switch>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <PrivateRoute path="/">
                            <Dashboard />
                        </PrivateRoute>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !auth.isLoggedIn() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

export default App;
