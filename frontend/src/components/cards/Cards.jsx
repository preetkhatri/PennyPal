import React, { useContext } from "react"
import "./cards.css"
import Common from "../../common/Common"
import { IncomeContext } from "../../Context/IncomeContext";
import { ExpenseContext } from "../../Context/ExpenseContext";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const Cards = () => {

  const { totalExpense, useTotalExpense } = useContext(ExpenseContext);
  const { totalIncome, useTotalIncome } = useContext(IncomeContext)
  return (
    <>
      <section className='cards'>
        <div className='cardBox balances'>
          <Common title='Total Balance' />
          <div className='circle'>
            <h1><CurrencyRupeeIcon /> {totalIncome-totalExpense}</h1>
          </div>
        </div>
        <div className='cardBox balances'>
          <Common title='Total Income' />
          <div className='circle'>
            <h1><CurrencyRupeeIcon /> {totalIncome}</h1>
          </div>
        </div>
        <div className='cardBox balances'>
          <Common title='Total Expenses' />
          <div className='circle'>
            <h1><CurrencyRupeeIcon /> {totalExpense}</h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cards
