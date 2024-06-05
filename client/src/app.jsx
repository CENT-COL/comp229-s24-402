import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/home';


export default function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}