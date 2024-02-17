import React from "react";
import { Link } from "react-router-dom";
import DetailsEntry from "./DetailsEntry";
import "./BookSeat.css";
import ReservedList from "./ReservedList";
import SearchSeat from "./SearchSeat";
import { Button } from "@mui/material";
import withRouter from "../Authentication/WithRouter";
import SearchResult from "../SearchForm/SearchPage/SearchResults";
import { id } from "date-fns/locale";
class BookSeat extends React.Component {
  constructor() {
    super();
    this.state = {
      seat: [],
      scheduleDetails:"",

      seatAvailable: [],
      seatReserved: [],

      origin: "",
      destination: "",
      date: "",
      id: "",
      boardingTime:''
    };
  }
  componentDidMount() {
    console.log(this.props.router.params.id);

    this.updateBookedSeats();
    // this.apiPostBooking();
    this.apiSchedule();
  }
  updateBookedSeats = async () => {
    const searchParams = new URLSearchParams(this.props.router.location.search);
    let request = {
    //   origin: searchParams.get("origin"),
    //   destination: searchParams.get("destination"),
    //   date: searchParams.get("date"),
      id:parseInt(searchParams.get("id"))
    };
    console.log(request);
    const res = await fetch(
      `http://localhost:9090/unbooked?origin=${encodeURIComponent(
        localStorage.getItem("origin")
      )}&destination=${encodeURIComponent(
        localStorage.getItem("destination")
      )}&id=${encodeURIComponent(request.id)}`,
      {
        method: "GET",
      }
    );
    let response = await res.json();

    console.log(response);
    this.setState({
      seat: response,
      origin: localStorage.getItem("origin"),
      destination: localStorage.getItem("destination"),
      date: localStorage.getItem("date"),
      id: localStorage.getItem("id"),
    });
  };

  // updateSeatResults = async () => {
  //   const searchParams = new URLSearchParams(this.props.router.location.search);
  //   let request = {
  //     origin: searchParams.get("origin"),
  //     destination: searchParams.get("destination"),
  //     date: searchParams.get("date"),
  //     id: searchParams.get("id"),
  //   };
  //   console.log(this.props);
  //   const res = await fetch(
  //     `http://localhost:9090/seatNumber?scheduleId=${encodeURIComponent(
  //       searchParams.get("id")
  //     )}`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   let response = await res.json();

  //   console.log(response);
  //   this.setState({
  //     allSeat: response,
  //     origin: searchParams.get("origin"),
  //     destination: searchParams.get("destination"),
  //     date: searchParams.get("date"),
  //     id: searchParams.get("id"),
  //   });
  // };

  onClickData(seat) {
    if (this.state.seatReserved.indexOf(seat) > -1) {
      this.setState({
        // seatAvailable: this.state.seatAvailable.concat(seat),
        seatReserved: this.state.seatReserved.filter((res) => res !== seat),
      });
    } else {
      this.setState({
        seatReserved: this.state.seatReserved.concat(seat),
        seatAvailable: this.state.seatAvailable.filter((res) => res !== seat),
      });
    }
    localStorage.setItem("seatsBooked", this.state.seatReserved)
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.apiPostBooking();
    console.log(this.state.seatReserved);
    let length = this.state.seatReserved.length;
    console.log(length);
    // localStorage.setItem("seatsBooked", this.state.seatReserved);
    localStorage.setItem("length", this.state.seatReserved.length);
    if (this.state.seatReserved.length > 0) {
      this.props.router.navigate(
        `/Details`
        // ?origin=${this.state.origin}&destination=${this.state.destination}&date=${this.state.date}&id=${this.state.id}&seats=${this.state.seatReserved}&length=${length}`
      );
    }
  };
  apiSchedule = async ()=>{
    const searchParams = new URLSearchParams(this.props.router.location.search);
    let request = {
      id:parseInt(searchParams.get("id"))
    }

    const response = await fetch(

      `http://localhost:9090/schedule/${encodeURIComponent(
        request.id
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

  
  apiTime = async () => {
    const res = await fetch(
      `http://localhost:9090/boardingTime?scheduleId=${encodeURIComponent(
        localStorage.getItem("scheduleId")
      )}&stopName=${encodeURIComponent(localStorage.getItem("origin"))}`,
      {
        method: "GET",
      }
    );
    let response = await res.json();

    console.log(response);
    this.setState({
      boardingTime: response,
    });
    localStorage.setItem("boardingTime", response);
  };

  apiPostBooking = async () => {
    const searchParams = new URLSearchParams(this.props.router.location.search);
    let request = {
      id:parseInt(searchParams.get("id"))
    }
    // const searchParams = new URLSearchParams(this.props.router.location.search);
    var today = new Date();

var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


    const response = fetch(
      "http://localhost:9090/booking",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "POST",

        body: JSON.stringify({
          date: localStorage.getItem('date'),

          scheduleDetails: {
            id: request.id,
          },
          fare:localStorage.getItem('fare'),
          bookingStatus: "blocked",
          seatList: localStorage.getItem('seatsBooked'),
         
          busName:this.state.scheduleDetails.busName,
          busNumber:this.state.scheduleDetails.busNumber,
          userMail: localStorage.getItem("mail"),

          fromStop: localStorage.getItem('origin'),
          toStop: localStorage.getItem('destination'),
          selectedTime:time

        }),
      }
    );
    // console.log(this.state.scheduleDetails.busName);
    // console.log(this.state.scheduleDetails.busNumber);


    // const data = response.json();
    // this.setState({
    //   // booking: [data],
    //   fromStop: localStorage.getItem("origin"),
    //   toStop: localStorage.getItem("destination"),
    //   date: localStorage.getItem("date"),
    //   seats: localStorage.getItem("seatsBooked"),
    //   fare: localStorage.getItem("fare"),
    // });
  };



  render() {
    return (
      <div
        style={{
          padding: "25px",
        }}
      >
        <h4>Proceed to Select Your Seat</h4>
        <SearchSeat
          seat={this.state.seat}
          available={this.state.seatAvailable}
          reserved={this.state.seatReserved}
          booked={this.state.seatsBooked}
          onClickData={this.onClickData.bind(this)}
        />

        <Button variant="contained" color="primary" onClick={this.onSubmit}>
          Proceed
        </Button>
      </div>
    );
  }
}

export default withRouter(BookSeat);
