import React from "react";
import withRouter from "../Authentication/WithRouter";
import DetailsEntry from "./DetailsEntry";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { useEffect } from "react";

import Typography from "@mui/material/Typography";

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      date: "",
      seat: {
        id: "",
      },
      scheduleDetails: {
        id: "",
      },
      userDetails: {
        userMail: "",
      },
      boardingTime:"",
      fromStop: "",
      toStop: "",
      booking: [],
      seats: "",
      fare: "",
      userId: "",
      seatId: [],
      bookingStatus: "",
      seatList: "",
      busName:"",
      busNumber:"",
      scheduleDetails:"",
      data:""
      // bookingDetails: {
      //   fromStop: "",
      //   toStop: "",
      //   booking: [],
      //   seats: "",
      //   fare: "",
      //   userId: "",
      // }
    };
  }
  apiSchedule = async ()=>{
    const response = await fetch(
      `http://localhost:9090/schedule/${encodeURIComponent(
        localStorage.getItem("scheduleId")
      )}`,
      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "GET",
      }
    );
    const data = await response.json();

   
    this.setState({
      scheduleDetails: data,
      // seats: seat,
    });
    console.log(data.busName)
    localStorage.setItem("busName", data.busName)
    localStorage.setItem("busNumber",data.busNumber)
    
  };
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



  
  // apiBusName = async () => {
  //   const response = await fetch(
  //     `http://localhost:9090/busName?scheduleId=${encodeURIComponent(
  //       localStorage.getItem("scheduleId")
  //     )}`,
  //     {
  //       mode: "cors",

  //       headers: {
  //         "Access-Control-Allow-Origin": "*",

  //         "Content-Type": "application/json",
  //       },

  //       method: "GET",
  //     }
  //   );
  //   const data = await response.json();

  //   // let seat = [];
  //   // data.forEach((element) => {
  //   //   seat.push(element.seat);
  //   // });
  //   this.setState({
  //     busName: data,
  //     // seats: seat,
  //   });
  //   console.log(data)
  //   // localStorage.setItem("busName",data)
  // };
  // apiBusNumber = async () => {
  //   const response = await fetch(
  //     `http://localhost:9090/busNumber?scheduleId=${encodeURIComponent(
  //       localStorage.getItem("scheduleId")
  //     )}`,
  //     {
  //       mode: "cors",

  //       headers: {
  //         "Access-Control-Allow-Origin": "*",

  //         "Content-Type": "application/json",
  //       },

  //       method: "GET",
  //     }
  //   );
  //   const data = await response.json();

  //   // let seat = [];
  //   // data.forEach((element) => {
  //   //   seat.push(element.seat);
  //   // });
  //   this.setState({
  //     busNumber: data,
  //     // seats: seat,
  //   });
  //   console.log(data)
  //   // localStorage.setItem("busName",data)
  // };

  componentDidMount() {
    // const searchParams = new URLSearchParams(this.props.router.location.search);

    // let request = {
    //   origin: searchParams.get("origin"),
    //   destination: searchParams.get("destination"),
    //   date: searchParams.get("date"),
    //   id: searchParams.get("id"),
    //   seats: searchParams.get("seats"),
    //   length: searchParams.get("length"),
    // };

    // console.log(">>>>>>>>>>>>>>>>>>>>");
    this.getId();
    // this.apiBusName();
    // this.apiGet();
    // this.apiPost();
    this.apiSchedule();
    this.updateBooking();
    
  }

  // componentDidUpdate() {
  //   this.apiSchedule();

  //   // console.log(">>>>>>>>>>>>>>> booking details...", this.state.bookingDetails )
  // }

  getId = async () => {
    const response = await fetch(
      `http://localhost:9090/get/userId?mail=${encodeURIComponent(
        localStorage.getItem("mail")
      )}`,
      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    // const res = await response.json();
    this.setState({
      userId: response,
    });
  };

  apiSeatId = async () => {
    // const searchParams = new URLSearchParams(this.props.router.location.search);

    localStorage
      .get("seatsBooked")
      .split(",")
      .map((index) => {
        const response = fetch(
          `http://localhost:9090/seatId?seatNo=${encodeURIComponent(
            parseInt(index)
          )}&scheduleId=${encodeURIComponent(localStorage.getItem('scheduleId'))}`,
          {
            mode: "cors",

            headers: {
              "Access-Control-Allow-Origin": "*",

              "Content-Type": "application/json",
            },

            method: "GET",
          }
        );
        let res = res.json();
        let seatsID = [];
        seatsID.push(res);
        this.setState({
          seatId: seatsID,
        });
      });
  };

  // apiPost = async () => {
  //   // const searchParams = new URLSearchParams(this.props.router.location.search);

  //   const response = fetch(
  //     "http://localhost:9090/booking",

  //     {
  //       mode: "cors",

  //       headers: {
  //         "Access-Control-Allow-Origin": "*",

  //         "Content-Type": "application/json",
  //       },

  //       method: "POST",

  //       body: JSON.stringify({
  //         date: localStorage.getItem('date'),

  //         scheduleDetails: {
  //           id: localStorage.getItem('scheduleId'),
  //         },
  //         fare:localStorage.getItem('fare'),
  //         bookingStatus: "booked",
  //         seatList: localStorage.getItem('seatsBooked'),
  //         // boardingTime:localStorage.getItem('boardingTime'),
  //         busName:localStorage.getItem("busName"),
  //         busNumber:localStorage.getItem("busNumber"),
  //         userMail: localStorage.getItem("mail"),

  //         fromStop: localStorage.getItem('origin'),
  //         toStop: localStorage.getItem('destination'),
  //       }),
  //     }
  //   );
  //   // console.log(this.state.scheduleDetails.busName);
  //   // console.log(this.state.scheduleDetails.busNumber);


  //   // const data = response.json();
  //   this.setState({
  //     // booking: [data],
  //     fromStop: localStorage.getItem("origin"),
  //     toStop: localStorage.getItem("destination"),
  //     date: localStorage.getItem("date"),
  //     seats: localStorage.getItem("seatsBooked"),
  //     fare: localStorage.getItem("fare"),
  //   });
  // };

 
  render() {
    return (
      <div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div>
              <TextField
                label="Origin"
                id="standard-size-normal"
                value={this.state.fromStop}
                variant="standard"
              />
            </div>
            <div>
              <TextField
                label="Destination"
                id="standard-size-normal"
                value={this.state.toStop}
                variant="standard"
              />
            </div>
            <div>
              <TextField
                label="Seats Booked"
                id="standard-size-normal"
                value={this.state.seats}
                variant="standard"
              />
            </div>
            <div>
              <TextField
                label="Date"
                id="standard-size-normal"
                value={this.state.date}
                variant="standard"
              />
            </div>
            <div>
              <TextField
                label="Fare"
                id="standard-size-normal"
                value={this.state.fare}
                variant="standard"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withRouter(Booking);
