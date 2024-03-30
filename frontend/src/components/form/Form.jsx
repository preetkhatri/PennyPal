import React from "react";
import "./form.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Form() {

    const [formdata, setFormdata] = React.useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
    });

    const [category, setCategory] = React.useState("");

    function handleChange(event) {
        if (event.target.name === "amount") {
            event.target.value = event.target.value > 0 ? event.target.value : 0;
        }
        setFormdata((prevdata) => {
            return {
                ...prevdata,
                [event.target.name]: event.target.value
            };
        });
    }

    return (
        <>
            <div className="form-div">
                <div className="form-entries">
                    <form
                        onClick={(e) => {
                            e.preventDefault();
                        }}>
                        <div className="input-div" id="firstInputDiv">
                            <input
                                type="text"
                                name="title"
                                value={formdata.title}
                                placeholder="Salary Title"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-div">
                            <input
                                type="number"
                                name="amount"
                                value={formdata.amount}
                                placeholder="Salary Amount"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-div">
                            <DatePicker
                                id='date'
                                placeholderText='Enter A Date'
                                selected={formdata.date}
                                dateFormat="yyyy/MM/dd"
                                onChange={handleChange} />
                        </div>
                        <div className="input-div">
                            <select
                                aria-label="Default select example"
                                onChange={(event) => setCategory(event.target.value)}
                            >
                                <option value="" disabled >Select Option</option>
                                <option value="stipend">Stipend</option>
                                <option value="investments">Investiments</option>
                                <option value="stocks">Stocks</option>
                                <option value="bitcoin">Bitcoin</option>
                                <option value="bank">Bank Transfer</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="input-div">
                            <input
                                type="textarea"
                                name="description"
                                value={formdata.description}
                                onChange={handleChange}
                                placeholder="Add a description"
                                required
                            />
                        </div>
                        <div className="btn-div" id="btn-div">
                            <button class="button62" role="button">Add Income</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

