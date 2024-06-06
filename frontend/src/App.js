// src/App.js
import React from "react";
import AppRouter from "./AppRouter";
import Navbar from "./components/Navbar";
import "./global.scss";

function App() {
    return (
        <div className="App">
            <Navbar />
            <AppRouter />
        </div>
    );
}

export default App;
