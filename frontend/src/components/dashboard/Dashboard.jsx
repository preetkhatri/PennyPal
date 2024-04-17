import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Home from "../home/Home";
import Footer from "../footer/Footer";

const Dashboard = () => {
    const getMode = () => {
        return JSON.parse(localStorage.getItem("mode"))
    }
    const [dark, setMode] = useState(getMode())
    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(dark))
    }, [dark])
    return (
        <>
            <div className={dark ? "dark" : "light"}>
                <Header dark={dark} setMode={setMode} />
                <Home />
                <Footer />
            </div>
        </>
    )
}

export default Dashboard
