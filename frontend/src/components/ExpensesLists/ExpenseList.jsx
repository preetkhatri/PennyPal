import React, { useEffect } from "react";
import "./ExpenseList.css";
import axios from "axios";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const ExpenseList = () => {

    const [data, setData] = React.useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/get-expenses");
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    console.log(data);

    const deleteExpense = async (id) => {
        await axios.delete(`http://localhost:5000/api/v1/delete-expense/${id}`)
        fetchData();
    }

    return (
        <>
            {
                data.map((key, idx) => {
                    const uid = key._id;
                    return (
                        <div className="list-div" key={idx}>
                            <div className="icon-div">
                                <ShowChartIcon style={{ height: "50px", width: "28px", marginLeft: "5px", marginRight: "5px" }} />
                            </div>
                            <div className="details-div">
                                <div className="category-div">
                                    <FiberManualRecordIcon style={{ color: "green", width: "12px" }} />
                                    <span style={{ marginTop: "-1px" }}>{key.category}</span>
                                </div>
                                <div className="more-details-div">
                                    <div className="extra-details-div">
                                        <div className="amount-div" style={{ display: "flex" }}>
                                            <CurrencyRupeeIcon style={{ height: "20px", width: "28px", marginLeft: "5px" }} />
                                            <span>{key.amount}</span>
                                        </div>
                                        <div className="date-div" style={{ display: "flex" }}>
                                            <CalendarMonthIcon className="form-icons" />
                                            <span style={{ marginLeft: "5px" }}>{key.date.slice(0, 10)}</span>
                                        </div>
                                        <div className="description-div" style={{ display: "flex" }}>
                                            <ChatBubbleIcon className="form-icons" />
                                            <span style={{ marginLeft: "5px" }}>{key.description}</span>
                                        </div>
                                    </div>
                                    <div className="delete-icon-div" style={{ padding: "5px" }}>
                                        <DeleteIcon className="form-icons" onClick={() => deleteExpense(uid)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ExpenseList