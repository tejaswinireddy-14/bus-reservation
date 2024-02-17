import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import withRouter from "../Authentication/WithRouter";
import { Link } from "react-router-dom";
import Booking from "./Booking";

class DetailsEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      age: "",
      gender: "",
      array: [],
      origin: "",
      destination: "",
      date: "",
      id: "",
      seats: "",
      detailsList: [],
      lenght: "",
      totalFare: "",
      data:"",
      // this.state = { time: {}, seconds: 5 },
      // this.timer = 0,
      // this.startTimer = this.startTimer.bind(this)
      // this.countDown = this.countDown.bind(this)
    };
    // this.state = { time: {}, seconds: 5 };
    // this.timer = 0;
    // this.startTimer = this.startTimer.bind(this);
    // this.countDown = this.countDown.bind(this);
  }
  // secondsToTime(secs){
  //   let hours = Math.floor(secs / (60 * 60));

  //   let divisor_for_minutes = secs % (60 * 60);
  //   let minutes = Math.floor(divisor_for_minutes / 60);

  //   let divisor_for_seconds = divisor_for_minutes % 60;
  //   let seconds = Math.ceil(divisor_for_seconds);

  //   let obj = {
  //     "h": hours,
  //     "m": minutes,
  //     "s": seconds
  //   };
  //   return obj;
  // }

  componentDidMount() {
    // let timeLeftVar = this.secondsToTime(this.state.seconds);
    // this.setState({ time: timeLeftVar });
    // const searchParams = new URLSearchParams(this.props.router.location.search);
    // let request = {
    //   origin: searchParams.get("origin"),
    //   destination: searchParams.get("destination"),
    //   date: searchParams.get("date"),
    //   id: searchParams.get("id"),
    //   seats: searchParams.get("seats"),
    //   length: searchParams.get("length"),
    // };
    let repeat = localStorage.getItem('length');
    console.log(repeat);
    this.setState({
      array: Array.apply(null, { length: repeat }).map(Number.call, Number),
      origin: localStorage.getItem('origin'),
      destination: localStorage.getItem('destination'),
      date: localStorage.getItem("date"),
      id: localStorage.getItem("scheduleId"),
      seats: localStorage.getItem('seatsBooked'),
    });
    // this.setState(prevState => ({
    //   seats: [...prevState.seats]
    // }))
    // console.log(request);
    this.getFare();
    // this.updateBooking();
  }
  // startTimer() {
  //   if (this.timer == 0 && this.state.seconds > 0) {
  //     this.timer = setInterval(this.countDown, 1000);
  //   }
  // }

  // countDown() {
  //   // Remove one second, set state so a re-render happens.
  //   let seconds = this.state.seconds - 1;
  //   this.setState({
  //     time: this.secondsToTime(seconds),
  //     seconds: seconds,
  //   });
    
  //   // Check if we're at zero.
  //   if (seconds == 0) { 
  //     clearInterval(this.timer);
  //   }
  // }
  updateBooking = async()=>{
    
      const response = await fetch(
        `http://localhost:9090/bookingUpdate?origin=${encodeURIComponent(localStorage.getItem('origin'))}&destination=${encodeURIComponent(localStorage.getItem('destination'))}&seatsBooked=${encodeURIComponent(localStorage.getItem('seatsBooked'))}`,
  
        {
          mode: "cors",
  
          headers: {
            "Access-Control-Allow-Origin": "*",
  
            "Content-Type": "application/json",
          },
  
          method: "GET",
        }
      );
      const res = await response.json();
      console.log(res);
      this.setState({
        data: res,
      });
    };

  


  getFare = async () => {
    // const searchParams = new URLSearchParams(this.props.router.location.search);
    // let request = {
    //   origin: searchParams.get("origin"),
    //   destination: searchParams.get("destination"),
    //   date: searchParams.get("date"),
    //   id: searchParams.get("id"),
    // };
    // console.log(this.props);
    const res = await fetch(
      `http://localhost:9090/stopFare?origin=${encodeURIComponent(
        localStorage.getItem('origin')
      )}&destination=${encodeURIComponent(localStorage.getItem('destination'))}`,
      {
        method: "GET",
      }
    );
    let response = await res.json();

    console.log(response);
    this.setState({
      totalFare: response * localStorage.getItem("length"),
    });
    localStorage.setItem("fare",(response * localStorage.getItem("length")) );
    console.log(localStorage.getItem('fare'))
  };

  nameChangeHandler = async (e) => {
    e.preventDefault();
    this.setState({
      username: e.target.value,
    });
  };

  emailChangeHandler = async (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
    localStorage.setItem('email',this.state.email)
  };

  ageChangeHandler = async (e) => {
    e.preventDefault();
    this.setState({
      age: e.target.value,
    });
  };

  genderChange = async (e) => {
    e.preventDefault();
    this.setState({
      gender: e.target.value,
    });
  };

  handleSubmit = async () => {
    this.updateBooking();
    let loginUser = [
      {
        username: this.state.username,
        age: this.state.age,
        gender: this.state.gender,
      },
    ];
    console.log(loginUser);
    console.log(this.state.email);

    this.setState({
      detailsList: [...this.state.detailsList, loginUser],
    });
    localStorage.setItem(
      "passengerDetails",
      JSON.stringify(this.state.detailsList)
    );

    console.log(this.state.detailsList);
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
        {this.state.array.map(() => {
          return (
            <div>
              <TextField
                id="filled-name-input"
                label="Name"
                type="text"
                autoComplete="current-name"
                // variant="filled"
                onChange={this.nameChangeHandler}
              />

              <TextField
                id="filled-password-input"
                label="Age"
                type="Age"
                autoComplete="current-Age"
                // variant="filled"
                onChange={this.ageChangeHandler}
              />

              <FormControl onChange={this.genderChange}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          );
        })}

        <div>
          <TextField
            id="filled-email-input"
            label="Email Id"
            type="text"
            autoComplete="current-mail"
            // variant="filled"
            onChange={this.emailChangeHandler}
          />
        </div>
        <div>
          {/* <Link
            to={`/Booking`}
            // ?origin=${this.state.origin}&destination=${this.state.destination}&seats=${this.state.seats}&date=${this.state.date}&id=${this.state.id}&mail=${this.state.email}&fare=${this.state.totalFare}`}
          > */}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          {/* </Link> */}
          {/* <div>
        <Button onClick={this.startTimer}>Start</Button>
        m: {this.state.time.m} s: {this.state.time.s}
      </div> */}
          {/* <Booking details={this.state.detailsList} /> */}
        </div>
      </Box>
    );
  }
}
export default withRouter(DetailsEntry);
