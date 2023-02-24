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

function loadChange() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/requestchanges";
}

function loadOut() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/requestouts";
}

function loadCleaning() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/cleanings";
}

function loadPayment() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/payments";
}

function loadRepair() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/repairs";
}

function loadEmergency() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/emergencies";
}

function HomeUser() {

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
                     onClick={loadChange}
                     sx={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/9f/b3/75/9fb37512cd879f169918e56ebbfd886a.jpg)',
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
                        แจ้งย้ายห้อง
                     </Typography>
                  </Button>
               </Grid>

               {/* Resident */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadOut}
                     sx={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/0d/a4/fe/0da4fecad9798d33ea2931a066d72471.jpg)',
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
                        แจ้งออก
                     </Typography>
                  </Button>
               </Grid>

               {/* Furniture */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadCleaning}
                     sx={{
                        backgroundImage: 'url(https://images.hdqwalls.com/download/colorful-cubes-abstract-5k-y7-1920x1080.jpg)',
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
                        แจ้งทำความสะอาด
                     </Typography>
                  </Button>
               </Grid>

               {/* Payment */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadPayment}
                     sx={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/c2/13/76/c21376e996a968e6b809632eeb6c1fa5.jpg)',
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
                        แจ้งชำระ
                     </Typography>
                  </Button>
               </Grid>

               {/* Bill */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadRepair}
                     sx={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/7d/8e/32/7d8e3213497c55d991c0c6af909a316f.jpg)',
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
                        แจ้งซ่อม
                     </Typography>
                  </Button>
               </Grid>

               {/* Emergency */}
               <Grid item xs={4}>
                  <Button
                     variant="outlined"
                     onClick={loadEmergency}
                     sx={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/d6/63/ef/d663efadc30e6b9d835bcb2068ee9765.jpg)',
                        backgroundPosition: "center",
                        fontFamily: "PK Krung Thep Medium",
                        height: '200px',
                        width: '100%',
                        color: 'black',
                        borderRadius: "20px",
                        boxShadow: 5,
                        transition: 'all 1.2s',
                        '&:hover': {
                           backgroundPosition: "right",
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
                        แจ้งเหตุฉุกเฉิน
                     </Typography>
                  </Button>
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
}
export default HomeUser;