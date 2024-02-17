import React, { Component } from "react";
import { Link, Router } from "react-router-dom";

import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel, Button } from "@mui/material";
import withRouter from "../../Authentication/WithRouter";

 class AddSchedule extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      busNumber: "",
      busName: "",
      date: "",
      startingTime: "",
      route: {
        id: "",
      },
      routeId: [],
    };

    this.handleChangeBusName = this.handleChangeBusName.bind(this);
    this.handleChangeBusNumber = this.handleChangeBusNumber.bind(this);
    this.handleChangeRoute = this.handleChangeRoute.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeStartingTime = this.handleChangeStartingTime.bind(this);
  }

  handleChangeBusName(e) {
    this.setState({ busName: e.target.value });
  }

  handleChangeBusNumber(e) {
    this.setState({ busNumber: e.target.value });
  }
  handleChangeStartingTime(e) {
    this.setState({ startingTime: e.target.value });
  }
  handleChangeDate(e) {
    this.setState({ date: e.target.value });
  }

  handleChangeRoute(e) {
    this.setState({
      route: {
        id: e.target.value,
      },
    });
  }
  _;
  submituserRegistrationForm = (e) => {
    e.preventDefault();

    let loginUser = {
      busname: this.state.busName,
      busnumber: this.state.busNumber,
      route: this.state.route,
      date: this.state.date,
      startingtime: this.state.startingTime,
    };
    console.log(loginUser);

    this.apiPost();
    this.props.router.navigate("/addSeats");
  };
  componentDidMount() {
    this.apiGet();
    // this.apiPost();
  }
  apiGet = async () => {
    const result = await fetch(
      "http://localhost:9090/get/route",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "GET",
      }
    );
    const data = await result.json();
    console.log(data);
    let routes = [];
    data.forEach((element) => {
      routes.push(element.id);
    });
    console.log(routes);

    this.setState({ routeId: routes });
    console.log(this.state.routeId);
  };

  apiPost = async () => {
    const response = await fetch(
      "http://localhost:9090/schedule",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
          date: this.state.date,
          busNumber: this.state.busNumber,
          busName: this.state.busName,
          startingTime: this.state.startingTime,
          route: this.state.route,
        }),
      }
    );
    this.setState({
      date: "",
      busNumber: "",
      busName: "",
      startingTime: "",

      route: {
        id: "",
      },
    });
  };

  render() {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <h2 className="text-center">Add Schedules</h2>
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label="Date"
            type="text"
            value={this.state.date}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeDate}
          />
          {/* </div>
        <div> */}
          <TextField
            id="filled-password-input"
            label="Bus Number"
            type="text"
            value={this.state.busNumber}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeBusNumber}
          />
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label="Bus Name"
            type="text"
            value={this.state.busName}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeBusName}
          />
          {/* </div>
        <div> */}
          <TextField
            id="filled-password-input"
            label=" Starting Time"
            type="text"
            value={this.state.startingTime}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeStartingTime}
          />
        </div>
        <div>
          <FormControl
            sx={{ minWidth: "220px" }}
            // variant="filled"
            size="medium"
          >
            <InputLabel id="demo-simple-select-label">
              {/* <LocationCityIcon /> */}
              Enter Route Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.route.id}
              label="Select Route Id"
              onChange={this.handleChangeRoute}
            >
              {this.state.routeId &&
                this.state.routeId.map((element) => (
                  <MenuItem value={element}>{element}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <Button
            style={{
              width: " 10%",

              marginTop: "1.5%",
            }}
            variant="contained"
            onClick={this.submituserRegistrationForm}
          >
            Submit
          </Button>
        </div>
      </Box>
    );
  }
}
export default withRouter(AddSchedule)
