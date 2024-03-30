import React from "react";
import "./lists.css";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import lifts from "./listsData";

const Lists = () => {
    return (
        <>
            {
                lifts.map((key) => {
                    return (
                        <div className="list-div">
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
                                            <span style={{ marginLeft: "5px" }}>{key.date}</span>
                                        </div>
                                        <div className="description-div" style={{ display: "flex" }}>
                                            <ChatBubbleIcon className="form-icons" />
                                            <span style={{ marginLeft: "5px" }}>{key.description}</span>
                                        </div>
                                    </div>
                                    <div className="delete-icon-div" style={{padding:"5px"}}>
                                        <DeleteIcon className="form-icons" />
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

export default Lists