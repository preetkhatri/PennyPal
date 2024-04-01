import React, { useEffect } from "react";
import axios from "axios";
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

    const [category, setCategory] = React.useState("stipend");

    function saveData() {
        const data = {
            ...formdata,
            category: category
        };
        console.log(data);
        axios.post("http://localhost:5000/api/v1/add-expense", data)
            .then((res) => {
                console.log("sent");
            })
            .catch((err) => {
                console.log(err);
            })
    }


    function handleChange(event) {
        let name, value;
        if (event.target) {
            name = event.target.name;
            value = event.target.value;
            if (name === "amount") {
                value = value > 0 ? value : 0;
            }
        } else {
            name = "date";
            value = event;
        }

        setFormdata(prevdata => ({
            ...prevdata,
            [name]: value
        }));
        console.log(formdata);
        console.log("hi");
        console.log(category);
    }

    return (
        <>
            <div className="form-div">
                <div className="form-entries">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            saveData();
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
                                name="date"
                                selected={formdata.date ? new Date(formdata.date) : null} // Set selected prop
                                placeholderText="Enter A Date"
                                dateFormat="dd/MM/yyyy"
                                onChange={(date) => handleChange({ target: { name: "date", value: date } })}
                            />
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

