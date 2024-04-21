import React, { useEffect, useState } from "react";
import Common from "../../common/Common";
import ReactApexChart from "react-apexcharts";
import axiosInstance from "../../helper/axios";
import "./chart.css";

const Charts = () => {
  const [line, setLine] = useState({
    series: [
      {
        name: "Income",
        data: [],
      },
      {
        name: "Expense",
        data: [],
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
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
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
  });

  const [year, setYear] = useState("");

  const [yearArr, setYearArr] = useState([]);

  const getData = async () => {
    const income_response = await axiosInstance.get(`/get-incomes-by-year?year=${year}`);
    const expense_response = await axiosInstance.get(`/get-expenses-by-year?year=${year}`);

    let arrays = {};
    arrays['Income'] = income_response?.data;
    arrays['Expense'] = expense_response?.data;

    setLine({
      ...line,
      series: line.series.map(item => ({
        name: item.name,
        data: arrays[item.name]?.length ? arrays[item.name] : []
      }))
    });
  };

  useEffect(() => {
    if (year !== "") {
      getData();
    }
  }, [year]);

  const getYears = async () => {
    const income_years = await axiosInstance.get('/income-years');
    const expense_years = await axiosInstance.get('/expense-years');

    const inc_years = income_years.data.data;
    const exp_years = expense_years.data.data;

    const yearsSet = new Set();
    inc_years.forEach((income) => {
      yearsSet.add(income);
    });
    exp_years.forEach((expense) => {
      yearsSet.add(expense);
    });
    const transactions_arr = Array.from(yearsSet).sort();
    setYearArr(transactions_arr);
  };

  useEffect(() => {
    getYears();
  }, []);

  return (
    <section className='charts'>
      <div className='cardBox'>
        <Common title='Total Balance' />
        <select name="" id="" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          {yearArr.map((key, idx) => (
            <option value={key} key={idx}>{key}</option>
          ))}
        </select>
        <ReactApexChart
          options={line.options}
          series={line.series}
          type='line'
          height={350}
        />
      </div>
    </section>
  );
};

export default Charts;
