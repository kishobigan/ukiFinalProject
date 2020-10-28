import React, { Component } from "react";
import { Button, Container, Spinner } from "reactstrap";
import AppointmentModal from "./AppointmentModal";
import axios from "axios";
import _ from "lodash";
import "../one.css"

export default class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
      modal: false,
      selectedService: "",
      filteredServices: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getAllServices();
  }

  getAllServices = async () => {
    const config = {
      headers: {
        Authorization: this.props.token,
      },
    };

    try {
      const res = await axios.get("/services/list", config);
      this.setState({
        services: res.data,
        filteredServices: res.data,
        loaded: true,
      });
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText =
        "Error fetching services list";
    }
  };

  searchServices = (search) => {
    let filteredServices = this.state.services.filter((service) =>
    service.address.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({ filteredServices });
  };

  deleteService = async (id) => {
    const config = {
      headers: {
        Authorization: this.props.token,
      },
    };
    try {
      const res = await axios.delete(`/admin/services/delete/${id}`, config);
      const { success } = res.data;
      if (success) {
        let docts = this.state.services;
        let docToDelete = _.find(docts, _.matchesProperty("_id", id));
        const newDocts = _.without(docts, docToDelete);
        this.setState({
          services: newDocts,
          filteredServices: newDocts,
        });
      }
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = "Error deleting service";
    }
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
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
      <div className="container">
        <div className="row">
          <div className="col-lg-2">

          </div>

          <div className="col-lg-8 login-con">
          <div className=" mt-4">
          {this.props.isAdmin ? (
            <h3>Service Stations List</h3>
          ):(
            <h1>Find service stations near you.</h1>
          )}
          <hr />
          <div
            className="alert alert-danger d-none"
            id="alert"
            role="alert"
          ></div>
          <form onSubmit={this.searchServices}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Search service stations in you location.
              </label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter address"
                onChange={(e) => this.searchServices(e.target.value)}
              />
            </div>
          </form>
          {this.state.services.length === 0 ? (
            <h3 className="mt-4">No services found</h3>
          ) : (
            <ul className="list-group mt-4">
              {this.state.filteredServices.map((service) => {
                return (
                  <li className="list-group-item" key={service._id}>
                    <span className="font-weight-bold">Station Name:</span> {service.name} <br /> <span className="font-weight-bold">District:</span> {service.district} <br />
                    <span className="font-weight-bold">Location:</span> {service.address}
                    <br />
                    {this.props.isAdmin? (
                      ""
                    ):(<Button
                      onClick={(e) => {
                        this.setState({
                          selectedService: e.target.getAttribute("data-service"),
                        });
                        this.toggle();
                      }}
                      className="btn mt-2 btn-primary btn-block"
                      color="success"
                      data-service={service.name}
                    >
                      Appoint
                    </Button>)}

                    {this.props.isAdmin ? (
                      <Button
                        onClick={(e) => this.deleteService(service._id)}
                        className="btn btn-block btn-danger mt-2 btn-primary radius"
                        color="danger"
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <AppointmentModal
          serviceName={this.state.selectedService}
          modal={this.state.modal}
          toggle={this.toggle}
          email={this.props.email}
          token={this.props.token}
        />
          </div>

          <div className="col-lg-2">

          </div>

        </div>
      </div>
    );
  }
}
