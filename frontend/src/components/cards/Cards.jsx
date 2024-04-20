import React, { useContext, useEffect } from "react"
import "./cards.css"
import Common from "../../common/Common"
import { IncomeContext } from "../../Context/IncomeContext";
import { ExpenseContext } from "../../Context/ExpenseContext";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axiosInstance from "../../helper/axios";


const Cards = () => {

  const [inc, setInc] = React.useState(0);
  const [exp, setExp] = React.useState();

  useEffect(() => {
    const fetchIncomes = async () => {
      let total = 0;
      const incResp = await axiosInstance.get("http://localhost:5000/api/v1/get-incomes");
      const incs = incResp.data.data;
      incs.forEach((key) => {
        total = total + key.amount;
      })
      setInc(total);
    }

    const fecthExpenses = async () => {
      let totalExp = 0;
      const expResp = await axiosInstance.get("http://localhost:5000/api/v1/get-expenses");
      const exps = expResp.data.data;
      exps.forEach((key)=>{
        totalExp = totalExp + key.amount;
      })
      setExp(totalExp);
    }

    fecthExpenses();
    fetchIncomes();
  }, []);

  useEffect(()=>{
    console.log("Income", inc);
    console.log("Expense", exp);
  })

  return (
    <>
      <section className='cards'>
        <div className='cardBox balances'>
          <Common title='Total Balance' />
          <div className='circle'>
            <h1><CurrencyRupeeIcon /> {inc - exp}</h1>
          </div>
        </div>
        <div className='cardBox balances'>
          <Common title='Total Income' />
          <div className='circle'>
            <h1><CurrencyRupeeIcon /> {inc}</h1>
          </div>
        </div>
        <div className='cardBox balances'>
          <Common title='Total Expenses' />
          <div className='circle'>
            <h1><CurrencyRupeeIcon /> {exp}</h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cards
