import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from "./pages/Home/home";
import { UserProvider } from './context/UserContext';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './css/main.css';
import ErrorPage from "./pages/ErrorPage/error";
import SignIn from "./pages/SignIn/signIn";
import SignUp from "./pages/SignUp/signUp";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<SignIn />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="*" element={<ErrorPage />}/>
            </Routes>
        </BrowserRouter>
    </UserProvider>
);

reportWebVitals();
