import React, { useContext, useEffect } from "react"
import "./cards.css"
import axios from "axios";
import Common from "../../common/Common"
import { IncomeContext } from "../../Context/IncomeContext";
import { ExpenseContext } from "../../Context/ExpenseContext";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const Cards = () => {

  const { totalExpense, useTotalExpense } = useContext(ExpenseContext);
  const { totalIncome, useTotalIncome } = useContext(IncomeContext);


  const [inc, setInc] = React.useState(0);
  const [exp, setExp] = React.useState();

  useEffect(() => {
    const fetchIncomes = async () => {
      let total = 0;
      const incResp = await axios.get("http://localhost:5000/api/v1/get-incomes");
      const inc = incResp.data;
      inc.forEach((key) => {
        total = total + key.amount;
      })
      setInc(total);
    }

    const fecthExpenses = async () => {
      let totalExp = 0;
      const expResp = await axios.get("http://localhost:5000/api/v1/get-expenses");
      const exp = expResp.data;
      exp.forEach((key)=>{
        totalExp = totalExp + key.amount;
      })
      setExp(totalExp);
    }

    fecthExpenses();
    fetchIncomes();
  }, []);

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
