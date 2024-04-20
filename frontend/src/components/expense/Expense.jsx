import React, { useEffect, useState, useContext } from "react";
import { ExpenseContext } from "../../Context/ExpenseContext";
import "./Expense.css"
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ExpenseForm from "../ExpensesForm/ExpenseForm"
import ExpenseList from "../ExpensesLists/ExpenseList"
import axiosInstance from "../../helper/axios";

const Expense = () => {
    const getMode = () => {
        return JSON.parse(localStorage.getItem("mode"))
    }
    const [dark, setMode] = useState(getMode())
    const {totalExpense, setTotalExpense} = useContext(ExpenseContext)
    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(dark))
    }, [dark])


    const getAllData = async () => {
        let total = 0;
        const response = await axiosInstance.get("http://localhost:5000/api/v1/get-expenses");
        const exps = response.data.data;
        exps.forEach((key) => {
            total = total + key.amount;
        })
        setTotalExpense(total);
    }

    useEffect(() => {
        getAllData();
    }, [])

    return (
        <div className={dark ? "dark" : "light"}>
            <Header dark={dark} setMode={setMode} />
            <div className="expense-parent-div">
                <div className="total-expense-div">
                    <h2>Total Expense: {totalExpense}</h2>
                </div>
                <div className="expense-details-div">
                    <div className="expense-form-div"><ExpenseForm /></div>
                    <div className="list-form-div"><ExpenseList /></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Expense