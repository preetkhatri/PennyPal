import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import Income from "./components/income/Income"

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Income/>
  </React.StrictMode>,
  document.getElementById("root")
)
