import React, { Component } from "react";
import _ from "lodash";
import { Container, Spinner } from "reactstrap";
// import AddAppointments from "./AddAppointments";
import SearchAppointments from "./SearchAppointments";
import ListAppointments from "./ListAppointments";
import axios from "axios";
const user = JSON.parse(localStorage.getItem("servicesAppointmentUser"))

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      showAddBody: false,
      orderBy: "Name",
      orderDir: "asc",
      searchText: "",
      loaded: false,
    };
  }

  async componentDidMount() {
    try {
      const config = {
        headers: {
          Authorization: this.props.user.token,
        },
      };
      if(user.isAdmin===true){
        const res = await axios.get("/admin/appointments", config);
        this.setState({ appointments: res.data, loaded: true });
      }
      else{
        const res = await axios.get(`/appointments/list/${this.props.user.id}`, config);
        this.setState({ appointments: res.data, loaded: true });
      }
    } catch (error) {}
  }

  saveAppointment = (newAppointment) => {
    let apts = this.state.appointments;
    apts.push(newAppointment);
    this.setState({
      appointments: apts,
    });
  };
  deleteAppointment = async (aptId) => {
    try {
      const config = {
        headers: {
          Authorization: this.props.user.token,
        },
      };
      const res = await axios.delete(`/admin/appointment/${aptId}`, config);

      const { success } = res.data;

      if (success) {
        let apts = this.state.appointments;
        let aptToDelete = _.find(apts, _.matchesProperty("_id", aptId));
        const newApts = _.without(apts, aptToDelete);
        this.setState({
          appointments: newApts,
        });
      }
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = error.response.data.error;
    }
  };

  acceptAppointment = async (aptId) => {
    try {
      const config = {
        headers: {
          Authorization: user.token,
        },
      };
      const res = axios.put(`/admin/accept/${aptId}`, config);

      if((await res).data.success===true){
        alert("Accepted")
      }
      else{
        alert("Fail")
      }
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = error.response.data.error;
    }
  };

  sort = (orderBy, orderDir) => {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir,
    });
  };

  search = (query) => {
    this.setState({
      searchText: query,
    });
  };

  render() {
    let filteredApts = [];
    let { orderBy, orderDir, searchText, appointments } = this.state;

    // appointments.forEach((item) => {
    //   if (item.doctorName.toLowerCase().indexOf(searchText) !== -1) {
    //     filteredApts.push(item);
    //   }
    // });

    filteredApts = _.orderBy(filteredApts, orderBy, orderDir);

    if (!this.state.loaded) {
      return (
        <React.Fragment>
          <Container
            className="mt-4"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "50vh",
              alignItems: "center",
            }}
          >
            <Spinner
              type="grow"
              color="primary"
              animation="border"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
        </React.Fragment>
      );
    }

    return (
      <>
        <Container className="mt-4">
          {user.isAdmin ? (<h3 className="center">APPOINMENTS</h3>) : <h3 className="center">My Appointments</h3>}
          <hr />
          <div
            className="alert alert-danger d-none"
            id="alert"
            ref="alert"
            role="alert"
          ></div>
          {this.state.appointments.length === 0 ? (
            <h3 className="mt-4">No appointments found</h3>
          ) : (
            <ListAppointments
              appointments={this.state.appointments}
              onDelete={this.deleteAppointment}
              onUpdate={this.acceptAppointment}
            />
          )}
        </Container>
      </>
    );
  }
}

export default Appointments;
