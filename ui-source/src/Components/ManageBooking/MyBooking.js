// import React from "react";
// import withRouter from "../Authentication/WithRouter";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button } from "@mui/material";
// import { Link } from "react-router-dom";

import React from "react";

// import { tableCellClasses } from "@mui/material/TableCell";
// import { styled } from "@mui/material/styles";

// class MyBooking extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       booking: [],
//       fromStop: "",
//       Time: "",
//       mail: "",
//     };
//   }
//   componentDidMount() {
//     this.apiGet();

//   }

//   apiGet = async () => {

//     const response = await fetch(
//       `http://localhost:9090/allBookings?userMail=${encodeURIComponent(
//         localStorage.getItem("mail")
//       )}`,

//       {
//         mode: "cors",

//         headers: {
//           "Access-Control-Allow-Origin": "*",

//           "Content-Type": "application/json",
//         },

//         method: "GET",
//       }
//     );
//     const data = await response.json();
//     this.setState({
//       booking: data,
//       fromStop: data.fromStop,
//     });
//   };
//   apiGetTime = async () => {

//     const response = await fetch(
//       `http://localhost:9090/stopTime?stopName=${encodeURIComponent(
//         this.state.fromStop
//       )}`,

//       {
//         mode: "cors",

//         headers: {
//           "Access-Control-Allow-Origin": "*",

//           "Content-Type": "application/json",
//         },

//         method: "GET",
//       }
//     );
//     const data = await response.json();
//     this.setState({
//       Time: data,
//     });
//   };

//   StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     "&:last-child td, &:last-child th": {
//       border: 0,
//     },
//   }));
//   render() {
//     return (
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="right"> Date</TableCell>
//               <TableCell align="right">Seats</TableCell>
//               <TableCell align="right">Time</TableCell>
//               <TableCell align="right">Origin</TableCell>
//               <TableCell align="right">Destination</TableCell>
//               <TableCell align="right">BUTTON</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {this.state.booking.map((row) => (
//               <this.StyledTableRow
//                 key={row.name}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <this.StyledTableCell align="right">
//                   {row.StyledTableRowdate}
//                 </this.StyledTableCell>

//                 <this.StyledTableCell align="right">
//                   {row.seat.id}
//                 </this.StyledTableCell>
//                 <this.StyledTableCell align="right">
//                   {this.state.Time}
//                 </this.StyledTableCell>
//                 <this.StyledTableCell align="right">
//                   {row.fromStop}
//                 </this.StyledTableCell>
//                 <this.StyledTableCell align="right">
//                   {row.toStop}
//                 </this.StyledTableCell>
//                 <this.StyledTableCell align="right">
//                   <Button>CONFIRM</Button>
//                 </this.StyledTableCell>
//               </this.StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }
// }
// export default withRouter(MyBooking);

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

export default class Ticket extends React.Component {
  constructor() {
    super();
    this.state = {
      booking: [],
      seats: [],
      final: "",
      busName:""
    };
  }
  componentDidMount() {
    this.apiGet();
    // this.apiBusName()
    // this.apiDelete(id);
  }
  apiGet = async () => {
    const response = await fetch(
      `http://localhost:9090/allBookings?userMail=${encodeURIComponent(
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
    const data = await response.json();
    let stopNames=[]

    data.forEach((element) => {
      if(element.bookingStatus==(("booked")||("confirmed")||("cancelled"))){
      stopNames.push(element);}
    });
    this.setState({
     booking: stopNames,
      // seats: seat,
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
  // };
  


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
      booking: res,
    });
  };
  onClick( id) {
   
    this.apiDelete(id);
  }

  StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  render() {
    console.log(this.state.booking);
    return (
      // console.log(this.state.booking);
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Bus Name</TableCell>
              <TableCell align="right">Bus Number</TableCell>



              <TableCell align="right">Seats</TableCell>


              <TableCell align="right">Origin</TableCell>
              <TableCell align="right">Destination</TableCell>
              <TableCell align="right">Fare</TableCell>
              <TableCell align="right">Booking Status</TableCell>
              
              <TableCell align="right">CANCEL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.booking.map((row) => (
              <this.StyledTableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <this.StyledTableCell component="th" scope="row">
                  {" "}
                  {row.id}
                </this.StyledTableCell> */}
                <this.StyledTableCell align="right">
                  {row.date}
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
                  onClick={()=>{this.onClick(row.id)}}
                  ><CancelIcon
                  sx={{
                    color:"black"
                  }}/></Button>
                </this.StyledTableCell>
              </this.StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
