import React from "react";
import "./form.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../helper/axios";

export default function Form() {

    const [formdata, setFormdata] = React.useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
    });

    const [category, setCategory] = React.useState("Stipend");

    function saveData() {
        const data = {
            ...formdata,
            category: category
        };
        console.log(data);
        axiosInstance.post("http://localhost:5000/api/v1/add-income", data)
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
                            window.location.reload()
                        }}>
                        <div className="input-div" id="firstInputDiv">
                            <input
                                type="text"
                                name="title"
                                value={formdata.title}
                                placeholder="Income Title"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-div">
                            <input
                                type="number"
                                name="amount"
                                value={formdata.amount}
                                placeholder="Income Amount"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-div">
                            <DatePicker
                                name="date"
                                selected={formdata.date ? new Date(formdata.date) : null}
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
                                <option value="Stipend">Stipend</option>
                                <option value="Investments">Investments</option>
                                <option value="Stocks">Stocks</option>
                                <option value="Bitcoin">Bitcoin</option>
                                <option value="Bank">Bank Transfer</option>
                                <option value="Others">Other</option>
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
                            <button class="button62">Add Income</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

