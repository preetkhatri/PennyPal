import React, { useState } from "react"
import "./header.css"
import Head from "../head/Head"
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PaymentsIcon from '@mui/icons-material/Payments';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { Link } from "react-router-dom";

const Header = ({ dark, setMode }) => {
  // Toogle Menu
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <section className='header'>
        <Head dark={dark} setMode={setMode} />
        <header>
          <div className='container'>
            <ul className={Mobile ? "navMenu-list" : "link"} onClick={() => setMobile(false)}>
              <li>
                <Link to="/">
                  <DashboardOutlinedIcon className='navIcon active' />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/incomes">
                  <CurrencyRupeeIcon className='navIcon' />
                  Incomes
                </Link>
              </li>
              <li>
                <Link to="/expenses">
                  <PaymentsIcon className='navIcon' />
                  Expenses
                </Link>
              </li>
              <li>
                <CurrencyExchangeIcon className='navIcon' />
                <a href='/'>Transactions</a>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </header>
      </section>
    </>
  )
}

export default Header
