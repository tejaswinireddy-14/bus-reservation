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

 class AddSeat extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      seatNumber: "",
      seatType: "",
      scheduleDetails: {
        id: "",
      },
      schedules: [],
      seatCount: "",
    };

    this.handleChangeSeatNumber = this.handleChangeSeatNumber.bind(this);
    this.handleChangeSeatType = this.handleChangeSeatType.bind(this);
    this.handleChangeSchedule = this.handleChangeSchedule.bind(this);
    this.handleChangeSeatCount = this.handleChangeSeatCount.bind(this);
  }

  handleChangeSeatNumber(e) {
    this.setState({ seatNumber: e.target.value });
  }
  handleChangeSeatCount(e) {
    console.log(e);
    this.setState({ seatCount: parseInt(e.target.value) });
    console.log(parseInt(e.target.value));
  }
  // componentDidUpdate(e){
  //     this.setState({seatCount:parseInt(e.target.value)})
  // }

  handleChangeSeatType(e) {
    this.setState({ seatType: e.target.value });
  }
  handleChangeSchedule(e) {
    this.setState({ scheduleDetails: { id: e.target.value } });
  }

  submituserRegistrationForm = (e) => {
    e.preventDefault();

    this.apiPost();
    this.props.router.navigate("/viewSchedules");
  };
  componentDidMount() {
    this.apiGet();
  }

  apiGet = async () => {
    const result = await fetch(
      "http://localhost:9090/get/schedule",

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
    let schedule = [];
    data.forEach((element) => {
      schedule.push(element.id);
    });

    this.setState({ schedules: schedule });
  };

  apiPost = async () => {
    for (let i = 1; i < this.state.seatCount + 1; i++) {
        console.log(i,this.state.seatCount);
      const response = await fetch(
        "http://localhost:9090/seat",

        {
          mode: "cors",

          headers: {
            "Access-Control-Allow-Origin": "*",

            "Content-Type": "application/json",
          },

          method: "POST",
          body: JSON.stringify({
            seatNumber: i,
            seatType: "General",
            scheduleDetails: this.state.scheduleDetails,
          }),
        }
      );}
      this.setState({
        seatNumber: "",
        seatType: "",

        scheduleDetails: {
          id: "",
        },
        seatCount: "",
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
          <h2 className="text-center">Add Seats</h2>
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label="Seat Count"
            type="text"
            value={this.state.seatCount}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeSeatCount}
          />
          {/* </div>
        <div> */}
          {/* <TextField
            id="filled-password-input"
            label="Seat Type"
            type="text"
            value={this.state.seatType}
            autoComplete="current-name"
            variant="filled"
            onChange={this.handleChangeSeatType}
          /> */}
        </div>
        <div>
          {/* <TextField
            id="filled-password-input"
            label="Bus Name"
            type="text"
            value={this.state.busName}
            autoComplete="current-name"
            variant="filled"
            onChange={this.handleChangeBusName}
          /> */}
          {/* </div>
        <div> */}
          {/* <TextField
            id="filled-password-input"
            label=" Starting Time"
            type="text"
            value={this.state.startingTime}
            autoComplete="current-name"
            variant="filled"
            onChange={this.handleChangeStartingTime}
          /> */}
        </div>
        <div>
          <FormControl
            sx={{ minWidth: "220px" }}
            // variant="filled"
            size="medium"
          >
            <InputLabel id="demo-simple-select-label">
              {/* <LocationCityIcon /> */}
              Schedule Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.scheduleDetails.id}
              label="Select Route Id"
              onChange={this.handleChangeSchedule}
            >
              {this.state.schedules &&
                this.state.schedules.map((element) => (
                  <MenuItem value={element}>{element}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        <Button
          style={{
            width: " 10%",

            marginTop: "1.5%",
          }}
          variant="contained"
          onClick={this.submituserRegistrationForm}
          
        >
          SUBMIT
        </Button>
      </Box>
    );
  }
}
export default withRouter(AddSeat);
