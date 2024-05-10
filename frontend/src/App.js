import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Income from "./components/income/Income"
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import Expense from "./components/expense/Expense";
import { IncomeContext } from "./Context/IncomeContext";
import Dashboard from "./components/dashboard/Dashboard"
import { ExpenseContext } from "./Context/ExpenseContext";

function App() {
  const [totalExpense, setTotalExpense] = React.useState(0);
  const [totalIncome, setTotalIncome] = React.useState(0);

  return (
    <>
      <ExpenseContext.Provider value={{ totalExpense, setTotalExpense }}>
        <IncomeContext.Provider value={{ totalIncome, setTotalIncome }}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/incomes" element={<Income />} />
              <Route exact path="/expenses" element={<Expense />} />
              <Route exact path="/signup" element={<SignUp/>}/>
              <Route exact path="/" element={<Login/>}/>
            </Routes>
          </BrowserRouter>
        </IncomeContext.Provider>
      </ExpenseContext.Provider>
    </>
  )
}

export default App
