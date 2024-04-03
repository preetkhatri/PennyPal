import React, { useContext, useEffect, useState } from "react";
import { IncomeContext } from "../../Context/IncomeContext";
import "./income.css";
import axios from "axios"
import Form from "../form/Form";
import Lists from "../lists/Lists";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Income = () => {
    const getMode = () => {
        return JSON.parse(localStorage.getItem("mode"))
    }
    const [dark, setMode] = useState(getMode())
    const {totalIncome, setTotalIncome} = useContext(IncomeContext)
    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(dark))
    }, [dark])


    const getAllData = async () => {
        let total = 0;
        const response = await axios.get("http://localhost:5000/api/v1/get-incomes");
        const incs = response.data;
        incs.forEach((key) => {
            total = total + key.amount;
        })
        setTotalIncome(total);
    }

    useEffect(() => {
        getAllData();
    }, [])

    return (
        <>
            <div className={dark ? "dark" : "light"}>
                <Header dark={dark} setMode={setMode} />
                <div className="income-parent-div">
                    <div className="total-income-div">
                        <h2>Total Income: <span><CurrencyRupeeIcon id="currencyIcon" /> {totalIncome}</span></h2>
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