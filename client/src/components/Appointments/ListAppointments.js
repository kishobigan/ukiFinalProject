import React from "react";
import { Media, Button,  Modal, ModalHeader } from "reactstrap";
import "../one.css"



const ListAppointments = ({ appointments, onDelete , onUpdate, service}) => {
  const handleDelete = (event) => {
    onDelete(event.target.id);
  };
  const handleUpdate = (event) => {
    onUpdate(event.target.id);
  }



  const user = JSON.parse(localStorage.getItem("servicesAppointmentUser"))
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2 ">

        </div>

        <div className="col-lg-8">

      <ul>
      {appointments.map((item) => {
        return (
          <li
            className="p-1  p-3 mb-3 bg-white rounded login-con"
            style={{ borderRadius: "10px" }}
            key={item._id}
          >
            <div>

              <div className="row">
              <div className="col-lg-9 mr-auto">
              <Media body>


                <p className=" mb-0 mr-auto">
                  <span style={{fontSize: "18px"}} className="font-weight-bold">Service station name:</span>{" "}{} <br />
                  <span style={{fontSize: "18px"}} className="font-weight-bold">Driver Name:</span>{" "}{item.driverName} <br />
                  <span style={{fontSize: "18px"}} className="font-weight-bold">Description:</span> {item.description}{" "}<br />
                  <span style={{fontSize: "18px"}} className="font-weight-bold">Date:</span>{" "}{item.date}<br/>
                  <span style={{fontSize: "18px"}} className="font-weight-bold">Time:</span>{" "}{item.time}<br/>
                  <span style={{fontSize: "18px"}} className="font-weight-bold">Email:</span>{" "}{item.userEmail}<br/>
                  <span style={{fontSize: "18px"}} className="font-weight-bold">Vehile Type:</span>{" "}{item.vehileType}<br/>
                  <span style={{fontSize: "18px"}} className="font-weight-bold">Phone Number:</span>{" "}{item.phoneNumber}<br/>
                </p>

              </Media>
              </div>

              <div className="col-lg-3 float-right ml-auto">

                <div className="mr-auto">
                {user.isAdmin ? <Button color="black" className="btn btn-outline-danger radius hi"  id={item._id}
                    onClick={handleDelete}> Reject
                </Button> : ""}
                </div>

                <div>
                {user.isAdmin && item.accepted===false ? <Button color="black" className="btn btn-outline-primary radius hi" id={item._id} onClick={handleUpdate}>
                  Accept
                </Button> : <span><Button  className="btn btn-success radius" disabled>
                  Accepted
                </Button></span>}
                </div>



              </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
        </div>

        <div className="col-lg-2">

        </div>
      </div>
    </div>
  );
};

export default ListAppointments;
