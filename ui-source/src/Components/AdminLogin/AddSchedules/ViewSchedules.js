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
import LocationCity from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import withRouter from "../../Authentication/WithRouter";
import DeleteIcon from "@mui/icons-material/Delete";

class ViewSchedules extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      date: "",
      busNumber: "",
      busName: "",
      startingTime: "",
      route: [],

      data: [],
    };
  }

  componentDidMount() {
    this.apiGet();
  }
  apiGet = async () => {
    const response = await fetch(
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
    const data = await response.json();
    console.log(data);
    let routes = [];
    data.forEach((element) => {
      routes.push(element.route);
    });
    console.log(routes);
    this.setState({ data });
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

  StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  onSubmit(e) {
    e.preventDefault();
    this.props.router.navigate(`/viewLocation`);
  }
  apiDelete = async (id) => {
    const response = await fetch(
      `http://localhost:9090/schedule/${id}`,

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "DELETE",
      }
    );
  };
  onClickHandler( id) {
   
    this.apiDelete(id);
  }
  onClick(id){
    localStorage.setItem("scheduleId",id);
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Schedule Id</TableCell>
              <TableCell align="right">Bus Number</TableCell>
              <TableCell align="right">Bus Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Route Id</TableCell>
              <TableCell align="right">Route Name</TableCell>

              <TableCell align="right"> Starting Time</TableCell>
              <TableCell align="right"> Loction</TableCell>
              {/* <TableCell align="right"> Delete</TableCell> */}
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
                  {row.busNumber}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.busName}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.date}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                <Link to={`/stopsByRoute?routeId=${row.route.id}`}>
                  <Button
                  sx={{
                    color:"black"
                  }} >
                  {row.route.id}
                  </Button>
                  </Link>
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.route.routeName}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.startingTime}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  <Link to={`/viewLocation?scheduleId=${row.id}`}>
                    <Button
                    onClick={this.onClick(row.id)}>{<LocationOnIcon />}</Button>
                  </Link>
                </this.StyledTableCell>
                {/* <this.StyledTableCell align="right">
                  <Button 
                  sx={{
                    color:"black"
                  }}
                  onClick={()=>{this.onClickHandler(row.id)}}>
                    <DeleteIcon />
                  </Button>
                </this.StyledTableCell> */}
              </this.StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default withRouter(ViewSchedules);
