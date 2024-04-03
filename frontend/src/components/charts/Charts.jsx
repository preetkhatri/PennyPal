import React from "react"
import Common from "../../common/Common"
import "./chart.css"
import ReactApexChart from "react-apexcharts"

const Charts = () => {



  const line = {
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
        type: "datetime",
        categories: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
      },
      //add it
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
  }

  return (
    <>
      <section className='charts'>
        <div className='cardBox'>
          <Common title='Total Revenue' />
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
