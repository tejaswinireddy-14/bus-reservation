// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button } from "@mui/material";
// import { Link } from "react-router-dom";

// export default class SearchResult extends React.Component {
    
//   render() {
//     return (
//       <div>
//         {/* {!!this.props.searchParams && this.props.searchParams.map((value) => (<ScheduleComponent  searchValue={value} />))} */}
//         {!!this.props.scheduleList &&
//           this.props.scheduleList.map((schedule) => (
//             <ScheduleComponent key={schedule.id} schedule={schedule} />
            
//           ))}
//       </div>
//     );
//   }
// }

// function ScheduleComponent(props) {
//   const { schedule } = props;
//   console.log("schedule object", schedule);
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="right">Bus Name</TableCell>
//             <TableCell align="right">Date</TableCell>
//             <TableCell align="right">Time</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {schedule.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.busName}
//               </TableCell>
//               <TableCell align="right">
//                 {new Date(row.date).toLocaleDateString()}
//               </TableCell>
//               <TableCell align="right">{row.startingTime}</TableCell>
//               <TableCell align="right">
//                 <Link to={`/Schedules/${row.id}`}>
//                   <Button >VIEW SEATS</Button>
//                 </Link>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
