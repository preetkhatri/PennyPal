import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import Head from "../head/Head";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PaymentsIcon from '@mui/icons-material/Payments';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = ({ dark, setMode }) => {
  const [mobile, setMobile] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const location = useLocation();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  }

  return (
    <>
      <section className='header'>
        <Head dark={dark} setMode={setMode} />
        <header>
          <div className='container'>
            <ul className={mobile ? "navMenu-list" : "link"} onClick={() => setMobile(false)}>
              <li onClick={() => handleLinkClick("/")}>
                <Link to="/">
                  <DashboardOutlinedIcon className={`navIcon ${location.pathname === '/' ? "active" : ""}`} />
                  Dashboard
                </Link>
              </li>
              <li onClick={() => handleLinkClick("/incomes")}>
                <Link to="/incomes">
                  <CurrencyRupeeIcon className={`navIcon ${location.pathname === '/incomes' ? "active" : ""}`} />
                  Incomes
                </Link>
              </li>
              <li onClick={() => handleLinkClick("/expenses")}>
                <Link to="/expenses">
                  <PaymentsIcon className={`navIcon ${location.pathname === '/expenses' ? "active" : ""}`} />
                  Expenses
                </Link>
              </li>
              <li>
                <CurrencyExchangeIcon className='navIcon' />
                <a href='/'>Transactions</a>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!mobile)}>
              {mobile ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </header>
      </section>
    </>
  )
}

export default Header;
