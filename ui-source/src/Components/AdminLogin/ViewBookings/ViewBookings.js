import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckIcon from '@mui/icons-material/Check';

class ViewBookings extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      date: "",
      fromStop: "",
      toStop: "",
      seats: [],
      schedule: [],
      bookingStatus: "",

      data: [],
    };
  }

  componentDidMount() {
    this.apiGet();
    // this.apiUpdate(id);
  }

  apiGet = async () => {
    const response = await fetch(
      "http://localhost:9090/get/bookings",

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
    console.log(data);
    let schedules = [];
    data.forEach((element) => {
      schedules.push(element.scheduleDetails);
    });
    let seats = [];
    data.forEach((element) => {
      seats.push(element.seat);
    });
    let stopNames=[]

    data.forEach((element) => {
      if(element.bookingStatus==(("booked")||("confirmed")||("cancelled"))){
      stopNames.push(element);}
    });
    // console.log(routes);
    this.setState({ data:stopNames });
  };
  apiUpdate = async (id) => {
    const response = await fetch(
      `http://localhost:9090/bookingId/${id}`,

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
  apiDelete = async (id) => {
    const response = await fetch(`http://localhost:9090/booking/${id}`, {
      mode: "cors",

      headers: {
        "Access-Control-Allow-Origin": "*",

        "Content-Type": "application/json",
      },

      method: "DELETE",
    });
    const res = await response.json();
    this.setState({
     data: res,
    });
  };
  onClickUpdate(id) {
    this.apiUpdate(id);
  }
  onClickDelete(id) {
    this.apiDelete(id);
  }
  // componentDidUpdate(id){
  //   this.apiUpdate(id);

  // }
  StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="right">Date</TableCell> */}
              <TableCell align="right">Booking Id</TableCell>
              <TableCell align="right">Booking Date</TableCell>
              <TableCell align="right">Bus Name</TableCell>
              <TableCell align="right">Bus Number</TableCell>

              <TableCell align="right">Seats</TableCell>
              <TableCell align="right">Schedule Id</TableCell>

              <TableCell align="right">Origin</TableCell>
              <TableCell align="right">Destination</TableCell>
              <TableCell align="right">Fare</TableCell>
              <TableCell align="right">Booking Status</TableCell>
              

              <TableCell align="right">CONFIRM</TableCell>
              <TableCell align="right">CANCEL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((row) => (
              <this.StyledTableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <this.StyledTableCell component="th" scope="row" align="right">
                  {" "}
                  {row.id}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.scheduleDetails.date}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.busName}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.busNumber}
                </this.StyledTableCell>

                <this.StyledTableCell align="right">
                  {row.seatList}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.scheduleDetails.id}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.fromStop}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.toStop}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.fare}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.bookingStatus}
                </this.StyledTableCell>
               
                
                <this.StyledTableCell align="right">
                  <Button
                    onClick={() => {
                      this.onClickUpdate(row.id);
                    }}
                  >
                    <CheckIcon
                    sx={{
                      color:"black"
                    }}/>
                  </Button>
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  <Button
                    onClick={() => {
                      this.onClickDelete(row.id);
                    }}
                  >
                    <CancelIcon
                    sx={{
                      color:"black"
                    }}/>
                  </Button>
                </this.StyledTableCell>
              </this.StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default ViewBookings;
