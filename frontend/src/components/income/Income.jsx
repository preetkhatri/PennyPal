import React, { useEffect, useState } from "react";
import Lists from "../lists/Lists";
import Form from "../form/Form";
import "./income.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Income = () => {
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
                <div className="income-parent-div">
                    <div className="total-income-div">
                        <h2>Total Income: $7000</h2>
                    </div>
                    <div className="income-details-div">
                        <div className="income-form-div"><Form /></div>
                        <div className="list-form-div"><Lists /></div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Income