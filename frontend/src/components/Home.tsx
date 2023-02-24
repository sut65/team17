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

function loadsManage() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/manages";
}

function loadsResident() {
   setTimeout(() => {
      window.location.reload();
   }, 1000);
   window.location.href = "/residents";
}

function HomeAdmin() {

   return (

      <Box sx={{
         backgroundImage: "url(https://images.hdqwalls.com/download/simple-drop-white-10k-n8-1280x720.jpg)",
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
         backgroundPosition: "center",
         width: '100%',
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
      }}>
         <Box sx={{
            fontFamily: "PK Krung Thep Medium",
            fontSize: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: '70px',
            mr: '10px',
            background: 'rgba(255, 255, 255, 0.7)',
            width: '50%',
            height: '50%',
            borderRadius: '20px',
            boxShadow: 20,
         }}>
            <h1>Team 17 ระบบหอพัก</h1>
         </Box>
      </Box>
   );
}
export default HomeAdmin;