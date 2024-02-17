import React from "react";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Button from "@mui/material/Button";
import withRouter from "../Authentication/WithRouter";
import {Link} from "react-router-dom"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { landingItems } from "./LandingItems";
import { menuItems } from "../AdminLogin/ViewBookings/MenuItem";
// import { menuItems } from "./MenuItem";

 class LandingPage extends React.Component {
  
   
render(){
  return (
    <div className="navbar"
    style={
        {
            height: "100px",
            backgrounColor:" #003580",
            display: "flex",
            justifyContent: "center",
        }
    }
    >
      <div className="navcontainer">
        <span className="logo">
          <DirectionsBusIcon />
          Being Bus
        </span>
       
        <FormControl
       style={{
        marginRight:"5%"
       }}
       sx={{ minWidth: "210px" , color:"white"}}
       variant="filled"
       size="medium"
     >
        <InputLabel 
        sx={{color:"white",}}
        id="demo-simple-select-label">
       
        Menu
      </InputLabel>
     
        <Select
         labelId="demo-simple-select-label"
         id="Admin Login">
      <ul className="menus">
        
        {landingItems.map((menu, index) => {

          return (
          
          
            <MenuItem  
            component="a"
            // linkButton={true}
            href={menu.url}
            key={index}
             value={menu.title}>{menu.title}</MenuItem>
          );
        })}
      </ul>
      </Select>
      </FormControl>

        
       
      </div>
      {/* <nav
    >
     
       <FormControl
         style={{
          marginRight:"5%"
         }}
         sx={{ minWidth: "210px" , color:"white"}}
      
       variant="filled"
       size="medium"
     >
        <InputLabel 
        sx={{color:"white",}}
        id="demo-simple-select-label">
       
        Admin View
      </InputLabel>
        <Select
         labelId="demo-simple-select-label"
         id="Admin Login">
      <ul className="menus">
     
        {menuItems.map((menu, index) => {
           { if(localStorage.getItem('mail')=="tejaswinireddy.g14@gmail.com")
          
          return (
            // <li className="menu-items" key={index}>
            //   <a href={menu.url}>{menu.title}</a>
            // </li>
          
            <MenuItem  
            component="a"
            // linkButton={true}
            href={menu.url}
            key={index}
             value={menu.title}>{menu.title}</MenuItem>
          );}
        })}
      </ul>
      </Select>
      </FormControl>
    </nav> */}
    </div>
    
  );}
}
export default (LandingPage)
