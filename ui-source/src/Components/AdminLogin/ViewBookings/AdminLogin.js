import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { menuItems } from "./MenuItem";

// import { menuItems } from '../menuItems';
const AdminLogin = () => {
  return (
    <nav
    >
     
       <FormControl
       style={{
        marginTop:"5%"
       }}
       sx={{ minWidth: "210px" }}
       variant="filled"
       size="medium"
     >
        <InputLabel id="demo-simple-select-label">
       
        Admin View
      </InputLabel>
        <Select
         labelId="demo-simple-select-label"
         id="Admin Login">
      <ul className="menus">
        
        {menuItems.map((menu, index) => {
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
          );
        })}
      </ul>
      </Select>
      </FormControl>
    </nav>
  );
};

export default AdminLogin;


