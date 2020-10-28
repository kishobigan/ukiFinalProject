import React, { Component } from "react";
import {Link} from 'react-router-dom'
import './one.css'

export default class Home extends Component {
  render() {
    return (
      <div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-7-img">
              <h1 className="home-col-7-title">No More waiting <br/>For Service Your Vehicle</h1>
            </div>
            <div className="col-lg-4">
              <h1 className="home-col-4-title">Let's reserve <br/>a time for, service <br/><span style={{color: "#007bff", textTransform: "capitalize", fontSize: "60px"}}>your vehicle</span></h1>
              <Link className="btn btn-primary btn-block col-4-btn radius" to="/services">Let's Book</Link>
            </div>
          </div>
        </div>

        <div className="mt-2 container-fluid home-2nd-con-fluid">
            <div className="container home-2nd-con">
              <div className="row">
                  <div className="col-lg-4 text-center">
                  <i className="fas fa-tools home-font-awesome-icon"></i>
                  <h4 className="icon-head-home">Quality Service</h4>
                  </div>

                  <div className="col-lg-4 text-center">
                  <i class="far fa-clock home-font-awesome-icon"></i>
                  <h4 className="icon-head-home">24/7 Available</h4>
                  </div>

                  <div className="col-lg-4 text-center">
                  <i class="fas fa-headset home-font-awesome-icon"></i>
                  <h4 className="icon-head-home">Customer Support</h4>
                  </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
