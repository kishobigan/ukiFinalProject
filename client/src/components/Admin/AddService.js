import React, { useState } from "react";
import axios from "axios";
import "../one.css"

export default function AddService(props) {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("Select District");
  const [address, setAddress] = useState("");

  const addServiceFormSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: props.token,
      },
    };

    const data = { name, district, address };

    try {
      const res = await axios.post("/admin/service/add", data, config);
      if (Object.keys(res.data).length !== 0) {
        document.getElementById("alert").classList.add("alert-success");
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("alert").innerText = "Added service";
        setName("");
        setAddress("");
        setDistrict("Select District");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container ">
        <div className="row">
            <div className="col-lg-2">

            </div>

            <div className="col-lg-8 login-con">
            <form className=" mt-4" onSubmit={addServiceFormSubmit}>
      <h3>Add Service</h3>
      <hr />
      <div className="alert d-none" id="alert" role="alert"></div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Service Station Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">District</label>
        <select
          className="custom-select"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        >
          <option defaultValue>Select District</option>
          <option value="Ampara">Ampara</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Badulla">Badulla</option>
          <option value="Batticaloa">Batticaloa</option>
          <option value="Colombo">Colombo</option>
          <option value="Galle">Galle</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Hambantota">Hambantota</option>
          <option value="Jaffna">Jaffna</option>
          <option value="Kalutara">Kalutara</option>
          <option value="Kandy">Kandy</option>
          <option value="Kegalle">Kegalle</option>
          <option value="Kilinochchi">Kilinochchi</option>
          <option value="Kurunegala">Kurunegala</option>
          <option value="Mannar">Mannar</option>
          <option value="Matale">Matale</option>
          <option value="Matara">Matara</option>
          <option value="Monaragala">Monaragala</option>
          <option value="Mullaitivu">Mullaitivu</option>
          <option value="Nuwara Eliya">Nuwara Eliya</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Puttalam">Puttalam</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Vavuniya">Vavuniya</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Address</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-block col-4-btn radius">
        Add Service Station
      </button>
    </form>
            </div>

            <div className="col-lg-2">

            </div>
        </div>
    </div>
  );
}
