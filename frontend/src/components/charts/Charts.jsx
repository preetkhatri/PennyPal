import React, { useEffect, useState } from "react"
import Common from "../../common/Common"
import ReactApexChart from "react-apexcharts"
import axiosInstance from "../../helper/axios"
import "./chart.css"

const Charts = () => {
  const [line, setLine] = useState({
    series: [
      {
        name: "Income",
        data: [50, 600000, 10000, 60000, 8000, 300, 400],
      },
      {
        name: "Expense",
        data: [0, 40, 80, 20, 40, 60, 20],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        foreColor: "grey",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "text",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      grid: {
        show: false,
      },
      yaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
        },
      },
    },
  })
  const [year, setYear] = useState(0);

  const getData = async () => {
    const income_response = await axiosInstance.get(`/get-incomes-by-year?year=${year}`)

    const expense_response = await axiosInstance.get(`/get-expenses-by-year?year=${year}`)

    let arrays = {};
    arrays['Income'] = income_response?.data;
    arrays['Expense'] = expense_response?.data;

    setLine({
      ...line,
      series: line.series.map(item => ({
        name: item.name,
        data: arrays[item.name]?.length?arrays[item.name]:[]
      }))
    })
  }

  useEffect(() => {
    getData();
  }, [year])

  return (
    <>
      <section className='charts'>
        <div className='cardBox'>
          <Common title='Total Revenue' />
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)}/>
          <ReactApexChart
            options={line.options}
            series={line.series}
            type='line'
            height={350} />
        </div>
      </section>
    </>
  )
}

export default Charts
