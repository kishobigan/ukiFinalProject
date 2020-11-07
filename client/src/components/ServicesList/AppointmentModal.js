import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const AppointmentModal = (props) => {
  const {serviceName, modal, toggle, email } = props;
  const [servicName, setServicName] = useState("")
  const [vehileType, setVehileType] = useState("")
  const [vehileNumber, setVehileNumber] = useState("")
  const [driverName, setDrivername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userEmail, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")

  const submitAppointmentForm = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("servicesAppointmentUser"))
    const data = {
      servicName,
      vehileNumber,
      vehileType,
      driverName,
      phoneNumber,
      userEmail,
      date,
      time,
      description,
      userId:userId['id']
    };

    const config = {
      headers: {
        Authorization: props.token,
      },
    };
    try {
      console.log(data)
      const res = await axios.post("/appointments/add", data, config);
      if (Object.keys(res.data).length === 0) {
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("alert").innerText = "Error adding appointment";
      } else {
        alert("Added appointment successfully");
      }
      toggle();
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = error.response.data.error;
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Appointment for {serviceName}</ModalHeader>
        <ModalBody>
          <form onSubmit={submitAppointmentForm}>
          <div className="form-group">
              <label>Service Station Name</label>
              <input type="text" className="form-control" value={servicName}  onChange={(e) => setServicName(e.target.value)} placeholder="serviceName" />
            </div>
            <div className="form-group">
            <label>Vehile Type</label>
              <select className="custom-select" value={vehileType} onChange={(e) => setVehileType(e.target.value)} required>
                <option>Motor Cycle</option>
                <option>Three Wheler</option>
                <option>Car</option>
                <option>Van</option>
                <option>Lorry</option>
              </select>
            </div>
            <div className="form-group">
              <label>Vehile Number</label>
              <input type="text" className="form-control" value={vehileNumber} onChange={(e) => setVehileNumber(e.target.value)} placeholder="Vehile number" required/>
            </div>
            <div className="form-group">
              <label>Driver Name</label>
              <input type="text" className="form-control" value={driverName} onChange={(e) => setDrivername(e.target.value)} placeholder="Driver Name" required/>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" pattern="[0-7]{3}[0-9]{8}" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required/>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" value={userEmail} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" required/>
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" required/>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Discribe about your services"></textarea>
            </div>
            <button type="submit" className="btn btn-outline-primary radius">
              Make Appointment
            </button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-outline-danger" color="black" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AppointmentModal;
