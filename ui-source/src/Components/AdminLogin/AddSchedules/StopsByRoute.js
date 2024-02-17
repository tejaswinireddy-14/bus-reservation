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

class StopsByRoutes extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      stopName: "",
      stopSeq: "",
      stoLat: "",
      stopLong: "",
      route: [],

      data: [],
    };
  }

  componentDidMount() {
    this.apiGet();
  }
  apiGet = async () => {
    const searchParams = new URLSearchParams(this.props.router.location.search);
    const response = await fetch(
      `http://localhost:9090/allStops?routeId=${encodeURIComponent(searchParams.get('routeId'))}`,

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
    // this.props.router.navigate(`/viewLocation`);
  }
//   apiDelete = async (id) => {
//     const response = await fetch(
//       `http://localhost:9090/schedule/${id}`,

//       {
//         mode: "cors",

//         headers: {
//           "Access-Control-Allow-Origin": "*",

//           "Content-Type": "application/json",
//         },

//         method: "DELETE",
//       }
//     );
//   };
//   onClickHandler( id) {
   
//     this.apiDelete(id);
//   }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Stop Id</TableCell>
              <TableCell align="right">Stop Name</TableCell>
              <TableCell align="right">Stop Seq</TableCell>
              <TableCell align="right">Stop Time</TableCell>
              <TableCell align="right">Stop Fare</TableCell>
              <TableCell align="right">Stop Lat</TableCell>

              <TableCell align="right"> Stop Long</TableCell>
              {/* <TableCell align="right"> Loction</TableCell> */}
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
                  {row.stopName}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.stopSeq}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.time}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.fare}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.stopLat}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.stopLong}
                </this.StyledTableCell>

                {/* <this.StyledTableCell align="right">
                  <Button >
                  {row.route.id}
                  </Button>
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.route.routeName}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  {row.startingTime}
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  <Link to={`/viewLocation?scheduleId=${row.id}`}>
                    <Button>{<LocationOnIcon />}</Button>
                  </Link>
                </this.StyledTableCell> */}
                {/* <this.StyledTableCell align="right">
                  <Button onClick={()=>{this.onClickHandler(row.id)}}>
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
export default withRouter(StopsByRoutes);
