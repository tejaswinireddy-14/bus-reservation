import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import CloseIcon from '@mui/icons-material/Close';

class ViewStops extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      stopName: "",
      stopSeq: "",
      route: [],
      time: "",
      fare: "",
      data: [],
      openModel: false,
      isEditMode: false,
      selectedRoute: '',
    };
  }
  onClickButton = (e, index) => {
    e.preventDefault();
    this.setState({ openModal: true, isEditMode: true, selectedRoute: index });
    // this.apiEdit();
  };
  onCloseModal = (id) => {
    this.setState({ openModal: false, selectedRoute: '' });
  };
  // onSubmit(e){
  //   e.preventDefault()
  //   this.apiDelete();

  // }
  // apiDelete = async () => {
  //   const response = await fetch(
  //     `http://localhost:9090/routeStop/${this.state.id.map()}}`,

  //     {
  //       mode: "cors",

  //       headers: {
  //         "Access-Control-Allow-Origin": "*",

  //         "Content-Type": "application/json",
  //       },

  //       method: "DELETE",
  //     }
  //   );
  //   // const data = await response.json();
  //   // console.log(data);
  //   // let routes = [];
  //   // data.forEach((element) => {
  //   //   routes.push(element.route);
  //   // });
  //   // console.log(routes);
  //   // this.setState({ data });
  // };

  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  componentDidMount() {
    this.apiGet();
  }
  apiGet = async () => {
    const response = await fetch(
      "http://localhost:9090/get/routeStop",

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
  // apiEdit = async () => {
  //   const response = await fetch(
  //     "http://localhost:9090/routeStop",

  //     {
  //       mode: "cors",

  //       headers: {
  //         "Access-Control-Allow-Origin": "*",

  //         "Content-Type": "application/json",
  //       },

  //       method: "PUT",
  //       body: JSON.stringify({
  //         stopName: this.state.stopName,
  //         stopSeq: this.state.stopSeq,
  //         stopLat: this.state.stopLat,
  //         stopLong: this.state.stopLong,
  //         time: this.state.time,
  //         fare: this.state.fare,
  //         route: this.state.route,
  //       }),
  //     }
  //   );
  // };

  apiDelete = async(id)=>{
    const response = await fetch(
      `http://localhost:9090/routeStop/${id}`,

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "DELETE",
      }
    );

  }
  onClickHandler(id){
 
    this.apiDelete(id);
  }

  onClosePopup = () => {
    this.setState({
      isEditMode: false
    })
  }

  render() {
    const { id, stopName, stopSeq, route, time } = this.state;

    return (
      <>
        {
          this.state.isEditMode && <ModalPopup selectedRoute={this.state.selectedRoute} data={this.state.data} onClosePopup={this.onClosePopup}/>
        }
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Stop Id</TableCell>
                <TableCell align="right">Stop Name</TableCell>
                <TableCell align="right">Stop Seq</TableCell>
                <TableCell align="right">Route Id</TableCell>
                <TableCell align="right">Route Name</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Fare</TableCell>
                <TableCell align="right">Stop Lat</TableCell>
                <TableCell align="right">Stop Long</TableCell>
                {/* <TableCell align="right">Edit</TableCell> */}
                <TableCell align="right">Delete</TableCell>

                {/* <TableCell align="right">Delete</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row, index) => (
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
                    {row.route.id}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">
                    {row.route.routeName}
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
                    <Button onClick={(e) => this.onClickButton(e, index)}>
                      <EditIcon />
                    </Button>
                   
                  // </this.StyledTableCell> */}
                   < this.StyledTableCell align="right">
                    <Button
                    sx={{
                      color:"black;"
                    }}
                     onClick={()=>{this.onClickHandler(row.id)}}>
                      <DeleteIcon />
                     </Button>
                   </this.StyledTableCell>
                </this.StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
export default ViewStops;

const ModalPopup = ({ selectedRoute, data, onClosePopup }) => {
  const [tripData, setTripData] = React.useState(data);
  const styles = {
    wrapper: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0, 0.4)",
      zIndex: 1
    },
    innerWrapper: {
      width: "500px",
      maxWidth: "50%",
      height: "400px",
      borderRadius: "5px",
      backgroundColor: "#fff",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"    },
      source:{
        width:" 100%",
       
        
        marginLeft: "2%",
        marginTop: "2%",
    },
    button:{
      width:" 30%",
      marginLeft: "2%",
      marginTop: "2%",
  },

    
  }

  const onChangeName = (e) => {
    console.log(">>>>>>>>>>>> ", e.target.value);
    let test = [...tripData];

    test[selectedRoute]["stopName"] = e.target.value;

    setTripData(test);
  }
  const onChangeSeq = (e) => {
    console.log(">>>>>>>>>>>> ", e.target.value);
    let test = [...tripData];

    test[selectedRoute]["stopSeq"] = e.target.value;

    setTripData(test);
  }
  const onChangeFare = (e) => {
    console.log(">>>>>>>>>>>> ", e.target.value);
    let test = [...tripData];

    test[selectedRoute]["fare"] = e.target.value;

    setTripData(test);
  }
  const onChangeTime = (e) => {
    console.log(">>>>>>>>>>>> ", e.target.value);
    let test = [...tripData];

    test[selectedRoute]["Time"] = e.target.value;

    setTripData(test);
  }

  const onClickHandler = (e)=>{
    e.preventDefault();
   apiEdit();



  }
  const apiEdit = async () => {
    const response = await fetch(
      "http://localhost:9090/routeStop",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "PUT",
        body: JSON.stringify({
          stopName: this.state.stopName,
          stopSeq: this.state.stopSeq,
          stopLat: this.state.stopLat,
          stopLong: this.state.stopLong,
          time: this.state.time,
          fare: this.state.fare,
          route: this.state.route,
        }),
      }
    );
  };

  return (
    <div className="modal-wrapper" 
    style={styles.wrapper}>
      <div className="modal-inner-wrapper" style={styles.innerWrapper}>
        <Button 
        // style={
        //   right:0
        // } 
        onClick={onClosePopup}>
          <CloseIcon />
        </Button>
        {/* <h2>Selected Route is {data[selectedRoute]?.stopSeq}</h2> */}
        {/* <input value={tripData[selectedRoute]?.stopName} onChange={onChange} /> */}
        <div
        style={styles.source}>

       
        <TextField
        size="medium"
            id="stopName"
            label="Stop-name"
            type="text"
            value={tripData[selectedRoute]?.stopName}
            autoComplete="current-name"
            // variant="filled"
            onChange={onChangeName}
          />
           </div>
           <div
           style={styles.source}>
           <TextField
           size="medium"
            id="stopName"
            label="stop-seq"
            type="text"
            value={tripData[selectedRoute]?.stopSeq}
            autoComplete="current-name"
            // variant="filled"
            onChange={onChangeSeq}
          />
          </div>
          <div
          style={styles.source}>
           <TextField
           size="medium"
            id="stop-fare"
            label="StopFare"
            type="text"
            value={tripData[selectedRoute]?.fare}
            autoComplete="current-name"
            // variant="filled"
            onChange={onChangeFare}
          />
          </div>
          <div
          style={styles.source}>
           <TextField
           size="medium"
            id="stop-time"
            label="Time"
            type="text"
            value={tripData[selectedRoute]?.time}
            autoComplete="current-name"
            // variant="filled"
            onChange={onChangeTime}
          />
          </div>
          <Button style={styles.button} onClick={onClickHandler} variant="contained" >Save</Button>

      </div>
    </div>
  )
}
