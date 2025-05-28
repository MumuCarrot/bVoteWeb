import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from "./pages/Home/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './css/main.css';
import ErrorPage from "./pages/ErrorPage/error";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="*" element={<ErrorPage />}/>
            </Routes>
        </div>
    </BrowserRouter>
);

reportWebVitals();
