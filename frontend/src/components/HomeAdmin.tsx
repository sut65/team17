import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

import HomeIcon from "@mui/icons-material/Home";
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import ConstructionIcon from '@mui/icons-material/Construction';
import CampaignIcon from '@mui/icons-material/Campaign';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EditLocationIcon from '@mui/icons-material/EditLocation';

// import './App.tsx';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      container: {
         marginTop: theme.spacing(2),
      },
      table: {
         minWidth: 650,
      },
      tableSpace: {
         marginTop: 20,
      },
   })
);

function loadManage() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/manages";
}

function loadResident() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/residents";
}

function loadFurniture() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/furnitures";
}

function loadMeter() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/meters";
}

function loadBill() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/bills";
}

function loadUser() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/users";
}

function HomeAdmin() {

   return (

      <Box sx={{
         backgroundImage: "url(https://images.hdqwalls.com/download/simple-drop-white-10k-n8-1280x720.jpg)",
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
         backgroundPosition: "center",
         width: '100%',
         maxHeight: '710px',
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         overflowY: 'scroll',
      }}>
         <Box sx={{
            display: "flex",
            alignItems: "center",
            mt: '70px',
            mr: '10px',
            // background: 'rgba(255, 255, 255, 0.7)',
            width: '90%',
            height: '100%',
            // borderRadius: '20px',
            // boxShadow: 20,
         }}>

            <Grid container spacing={5} sx={{ padding: 10, }}>
               {/* Manage */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadManage}
                     sx={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/ff/0e/fa/ff0efa14a94d4cef1b199e542a0262ef.jpg)',
                        backgroundPosition: "center",
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: "18px",
                        height: '200px',
                        width: '100%',
                        color: 'black',
                        borderRadius: "20px",
                        boxShadow: 5,
                        transition: 'all 1.2s',
                        '&:hover': {
                           backgroundPosition: "top",
                           transform: 'scale(1.05)',
                           borderColor: '#2ccce4',
                           bgcolor: '#2ccce4',
                           color: 'black',
                           borderRadius: "30px",
                        },
                        '&:active': {
                           boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
                        }
                     }}
                  >
                     <Typography sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                        จัดการห้องพัก
                     </Typography>
                  </Button>
               </Grid>

               {/* Resident */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadResident}
                     sx={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/9a/e9/da/9ae9daff291055aa364a792b51767be6.jpg)',
                        backgroundPosition: "center",
                        fontFamily: "PK Krung Thep Medium",
                        height: '200px',
                        width: '100%',
                        color: 'black',
                        borderRadius: "20px",
                        boxShadow: 5,
                        transition: 'all 1.2s',
                        '&:hover': {
                           backgroundPosition: "bottom",
                           transform: 'scale(1.05)',
                           borderColor: '#2ccce4',
                           bgcolor: '#2ccce4',
                           color: 'black',
                           borderRadius: "30px",
                        },
                        '&:active': {
                           boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
                        }
                     }}
                  >
                     <Typography sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                        ทำสัญญาเช่า
                     </Typography>
                  </Button>
               </Grid>

               {/* Furniture */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadFurniture}
                     sx={{
                        backgroundImage: 'url(https://images.hdqwalls.com/download/frames-and-dials-5k-r0-1920x1080.jpg)',
                        backgroundPosition: "center",
                        fontFamily: "PK Krung Thep Medium",
                        height: '200px',
                        width: '100%',
                        color: 'black',
                        borderRadius: "20px",
                        boxShadow: 5,
                        transition: 'all 1.2s',
                        '&:hover': {
                           backgroundPosition: "bottom",
                           transform: 'scale(1.05)',
                           borderColor: '#2ccce4',
                           bgcolor: '#2ccce4',
                           color: 'black',
                           borderRadius: "30px",
                        },
                        '&:active': {
                           boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
                        }
                     }}
                  >
                     <Typography sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                        เบิกจ่ายอุปกรณ์ในห้องพัก
                     </Typography>
                  </Button>
               </Grid>

               {/* Meter */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadMeter}
                     sx={{
                        backgroundImage: 'url(https://images.hdqwalls.com/wallpapers/bthumb/fluid-abstract-ui.jpg)',
                        backgroundPosition: "center",
                        fontFamily: "PK Krung Thep Medium",
                        height: '200px',
                        width: '100%',
                        color: 'black',
                        borderRadius: "20px",
                        boxShadow: 5,
                        transition: 'all 1.2s',
                        '&:hover': {
                           backgroundPosition: "bottom",
                           transform: 'scale(1.05)',
                           borderColor: '#2ccce4',
                           bgcolor: '#2ccce4',
                           color: 'black',
                           borderRadius: "30px",
                        },
                        '&:active': {
                           boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
                        }
                     }}
                  >
                     <Typography sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                        จดมิเตอร์
                     </Typography>
                  </Button>
               </Grid>

               {/* Bill */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadBill}
                     sx={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/ee/5c/94/ee5c94705cc59992d363aaefd9334e3b.jpg)',
                        backgroundPosition: "center",
                        fontFamily: "PK Krung Thep Medium",
                        height: '200px',
                        width: '100%',
                        color: 'black',
                        borderRadius: "20px",
                        boxShadow: 5,
                        transition: 'all 1.2s',
                        '&:hover': {
                           backgroundPosition: "bottom",
                           transform: 'scale(1.05)',
                           borderColor: '#2ccce4',
                           bgcolor: '#2ccce4',
                           color: 'black',
                           borderRadius: "30px",
                        },
                        '&:active': {
                           boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
                        }
                     }}
                  >
                     <Typography sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                        บิลชำระ
                     </Typography>
                  </Button>
               </Grid>

               {/* User */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadUser}
                     sx={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/3f/ef/a6/3fefa6d6438a815cc6fe951c0f531e1b.jpg)',
                        backgroundPosition: "center",
                        fontFamily: "PK Krung Thep Medium",
                        height: '200px',
                        width: '100%',
                        color: 'black',
                        borderRadius: "20px",
                        boxShadow: 5,
                        transition: 'all 1.2s',
                        '&:hover': {
                           backgroundPosition: "bottom",
                           transform: 'scale(1.05)',
                           borderColor: '#2ccce4',
                           bgcolor: '#2ccce4',
                           color: 'black',
                           borderRadius: "30px",
                        },
                        '&:active': {
                           boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
                        }
                     }}
                  >
                     <Typography sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                        บันทึกข้อมูลผู้เช่า
                     </Typography>
                  </Button>
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
}
export default HomeAdmin;