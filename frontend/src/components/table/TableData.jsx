import React, { useEffect } from "react"
import "./Table.css"
import Common from "../../common/Common"
import "../users/users.css"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import axiosInstance from "../../helper/axios"



const TableData = () => {

  const [transactions, setTransactions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseResponse = await axiosInstance.get("http://localhost:5000/api/v1/get-expenses");
        const expenses = expenseResponse.data.data.map(e => ({ ...e, type: "expense" }));

        const incomeResponse = await axiosInstance.get("http://localhost:5000/api/v1/get-incomes");
        const incomes = incomeResponse.data.data.map(e => ({ ...e, type: "income" }));

        const allTransactions = [...expenses, ...incomes];

        allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        const recentTxns = allTransactions.slice(0, 5);
        setTransactions(recentTxns);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <section className='project'>
        <div className='table cardBox'>
          <Common title='Recent Transactions' />
          <div className='tableBox'>
            <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: "none" }}>
              <Table
                className='tableContainer'
                sx={{
                  minWidth: 650,
                  background: "#313844",
                  border: "none",
                  "& td ,th": {
                    color: "rgb(166, 171, 176)",
                    borderBottom: "1px solid rgb(86, 86, 86)",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>date</TableCell>
                    <TableCell>category</TableCell>
                    <TableCell>description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {index + 1}
                      </TableCell>
                      <TableCell>{transaction.title}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.date.slice(0,10)}</TableCell>
                      <TableCell className='status'>{transaction.category}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>
    </>
  )
}

export default TableData
