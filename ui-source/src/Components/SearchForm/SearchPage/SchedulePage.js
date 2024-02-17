import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import withRouter from "../../Authentication/WithRouter";
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

class SchedulePage extends React.Component {
  constructor() {
    super();
    this.state = {
        id:'',
      origin: "",
      destination: "",
      date: "",
      busName: "",
      startingTime: "",
      result: [],
      Time: "",
      Fare:''
    };
  }
  componentDidMount() {
    this.updateScheduleResults();
    // this.getTime();
    this.getFare();
    console.log(this.props.router);
  }
  getFare = async()=>{
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
      Fare:response
    });


  }



  // getTime = async () =>{
  //   // const searchParams = new URLSearchParams(this.props.router.location.search);
  //   // let request = {
  //   //   origin: searchParams.get("origin"),
  //   // };
  //   // console.log(request);
  //   const res = await fetch(
  //     `http://localhost:9090/stopTime?stopName=${encodeURIComponent(
  //       localStorage.getItem('origin')
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
  //    let data = await res.json('');
  //   console.log(data);
  //   this.setState({
  //     Time:data

  //   })
  //   localStorage.setItem('boardingTime',this.state.Time);

  // }
  updateScheduleResults = async (origin, destination, date) => {
    // const searchParams = new URLSearchParams(this.props.router.location.search);
    // let request = {
    //   origin: searchParams.get("origin"),
    //   destination: searchParams.get("destination"),
    //   date: searchParams.get("date"),
    // };
    // console.log(request);
    const res = await fetch(
      `http://localhost:9090/schedules?origin=${encodeURIComponent(
        localStorage.getItem('origin')
      )}&destination=${encodeURIComponent(
        localStorage.getItem('destination')
      )}&date=${encodeURIComponent(localStorage.getItem('date'))}`,
      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    let response = await res.json();

    console.log(response);
    this.setState({
        
      result: response,
      origin: localStorage.getItem("origin"),
      destination: localStorage.getItem("destination"),
      date: localStorage.getItem("date"),
    });
    // localStorage.setItem('scheduleId',this.state.result.id);
  };
  StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  onSubmit(e){
    e.preventDefault();
    // this.props.router.navigate(`/Seats`)
    // this.props.router.navigate(
    //   `/Schedules`
  }
  
  StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Bus Name</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Fare</TableCell>
                <TableCell align="right">Seats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.result.map((row) => (
                <this.StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <this.StyledTableCell component="th" scope="row" align="right">
                    {row.busName}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">
                    {new Date(row.date).toLocaleDateString()}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">{row.startingTime}</this.StyledTableCell>
                  <this.StyledTableCell align="right">{this.state.Fare}</this.StyledTableCell>
                  <this.StyledTableCell align="right">
                 {/* { localStorage.setItem('scheduleId',row.id)} */}
                 
                    <Link
                      to={`/Seats?id=${row.id}`}
                       // ?origin=${this.state.origin}&destination=${this.state.destination}&date=${this.state.date}&id=${row.id}`}
                     > 
                      <Button >VIEW SEATS</Button>
                     </Link> 
                  </this.StyledTableCell>
                </this.StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default withRouter(SchedulePage);
