import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Dashboard from "./components/dashboard/Dashboard"
import Income from "./components/income/Income"
import Expense from "./components/expense/Expense";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/incomes" element={<Income />} />
          <Route exact path="/expenses" element={<Expense/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
