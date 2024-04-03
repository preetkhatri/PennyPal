import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Income from "./components/income/Income"
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
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/incomes" element={<Income />} />
              <Route exact path="/expenses" element={<Expense />} />
            </Routes>
          </BrowserRouter>
        </IncomeContext.Provider>
      </ExpenseContext.Provider>
    </>
  )
}

export default App
