import React from "react";
import Lists from "../lists/Lists";
import Form from "../form/Form";
import "./income.css";

const Income = () => {
    return (
        <>
            <div className="income-parent-div">
                <div className="total-income-div">
                    <h2>Total Income: $7000</h2>
                </div>
                <div className="income-details-div">
                    <div className="income-form-div"><Form /></div>
                    <div className="list-form-div"><Lists /></div>
                </div>
            </div>
        </>
    )
}

export default Income