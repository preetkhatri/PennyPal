import React, { useEffect, useState } from "react";
import "./Expense.css"
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Form from "../form/Form";
import Lists from "../lists/Lists";

const Expense = () => {
    const getMode = () => {
        return JSON.parse(localStorage.getItem("mode"))
    }
    const [dark, setMode] = useState(getMode())
    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(dark))
    }, [dark])
    return (
        <div className={dark ? "dark" : "light"}>
            <Header dark={dark} setMode={setMode} />
            <div className="expense-parent-div">
                <div className="total-expense-div">
                    <h2>Total Expense: $7000</h2>
                </div>
                <div className="expense-details-div">
                    <div className="expense-form-div"><Form /></div>
                    <div className="list-form-div"><Lists /></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Expense