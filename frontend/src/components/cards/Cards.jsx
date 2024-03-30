import React from "react"
import "./cards.css"
import Common from "../../common/Common"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const Cards = () => {
  return (
    <>
      <section className='cards'>
        <div className='cardBox balances'>
          <Common title='Total Balance' />
          <div className='circle'>
            <h1><CurrencyRupeeIcon /> 256</h1>
          </div>
        </div>
        <div className='cardBox balances'>
          <Common title='Total Income' />
          <div className='circle'>
            <h1><CurrencyRupeeIcon /> 8451</h1>
          </div>
        </div>
        <div className='cardBox balances'>
          <Common title='Total Expenses' />
          <div className='circle'>
            <h1><CurrencyRupeeIcon /> 256</h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cards
