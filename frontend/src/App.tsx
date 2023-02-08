import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import HomeIcon from "@mui/icons-material/Home";
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import ConstructionIcon from '@mui/icons-material/Construction';
import CampaignIcon from '@mui/icons-material/Campaign';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import EditLocationIcon from '@mui/icons-material/EditLocation';

import Home from "./components/Home";
import Manages from "./components/Manage/Manages";
import ManageCreate from "./components/Manage/ManageCreate";
import Residents from "./components/Resident/Residents";
import ResidentCreate from "./components/Resident/ResidentCreate";
import Requestout from "./components/Requestout/Requestout";
import RequestoutCreate from "./components/Requestout/RequestoutCreate";
import Requestchange from "./components/Requestchange/Requestchange";
import RequestchangeCreate from "./components/Requestchange/Requestchangecreate";
import Cleanings from "./components/Cleanings";
import CleaningCreate from "./components/CleaningCreate";
import Furnitures from "./components/Furniture/Furnitures";
import FurnitureCreate from "./components/Furniture/FurnitureCreate";
import Meter from "./components/Meter/Meter";
import MeterCreate from "./components/Meter/MeterCreate";
import Bill from "./components/Bill";
import BillCreate from "./components/BillCreate";
import Repair from "./components/Repair";
import RepairCreate from "./components/RepairCreate";
import Emergency from "./components/Emergency";
import EmergencyCreate from "./components/EmergencyCreate";

import SignIn from "./components/SignIn";
import PaymentCreate from "./components/PaymentCreate";
import Payment from "./components/Payment";
import Users from "./components/User";
import UserCreate from "./components/UserCreate";


const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const menu = [
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/", role : 'user'},
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/", role : 'admin'},
  { name: "จัดการห้องพัก", icon: <RoomPreferencesIcon />, path: "/manages", role: 'user'},
  { name: "จัดการห้องพัก", icon: <RoomPreferencesIcon />, path: "/manages", role: 'admin'},
  { name: "สัญญาเช่า", icon: <ContactPageIcon />, path: "/residents", role: 'user'},
  { name: "สัญญาเช่า", icon: <ContactPageIcon />, path: "/residents", role: 'admin'},
  { name: "แจ้งออก", icon: <RemoveCircleOutlineIcon />, path: "/requestouts", role : 'user'},
  { name: "แจ้งออก", icon: <RemoveCircleOutlineIcon />, path: "/requestouts", role : 'admin'},
  { name: "แจ้งย้ายห้อง", icon: <EditLocationIcon />, path: "/requestchanges", role : 'user'},
  { name: "แจ้งย้ายห้อง", icon: <EditLocationIcon />, path: "/requestchanges", role : 'admin'},
  { name: "จองทำความสะอาด", icon: <CleaningServicesOutlinedIcon />, path: "/cleanings", role: 'user'},
  { name: "จองทำความสะอาด", icon: <CleaningServicesOutlinedIcon />, path: "/cleanings", role: 'admin'},
  { name: "เบิกจ่ายอุปกรณ์ในห้องพัก", icon: <ChairOutlinedIcon />, path: "/furnitures", role: 'user'},
  { name: "เบิกจ่ายอุปกรณ์ในห้องพัก", icon: <ChairOutlinedIcon />, path: "/furnitures", role: 'admin'},
  { name: "มิเตอร์", icon: <ElectricMeterIcon />, path: "/meters", role: 'user'},
  { name: "มิเตอร์", icon: <ElectricMeterIcon />, path: "/meters", role: 'admin'},
  { name: "บิลชำระ", icon: <ReceiptIcon />, path: "/bills", role: 'user'},
  { name: "บิลชำระ", icon: <ReceiptIcon />, path: "/bills", role: 'admin'},
  { name: "การชำระเงิน", icon: <PaymentIcon />, path: "/payments", role: 'user'},
  { name: "การชำระเงิน", icon: <PaymentIcon />, path: "/payments", role: 'admin'},
  { name: "บันทึกข้อมูลผู้เช่า", icon: <AccountCircleIcon />, path: "/users", role: 'user'},
  { name: "บันทึกข้อมูลผู้เช่า", icon: <AccountCircleIcon />, path: "/users", role: 'admin'},
  { name: "บิลชำระ", icon: <ConstructionIcon />, path: "/repairs", role: 'user'},
  { name: "บิลชำระ", icon: <ConstructionIcon />, path: "/repairs", role: 'admin'},
  { name: "บิลชำระ", icon: <CampaignIcon />, path: "/emergencies", role: 'user'},
  { name: "บิลชำระ", icon: <CampaignIcon />, path: "/emergencies", role: 'admin'},
];



function App() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String | null>("");
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => { 
    setOpen(!open);
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem('role');
    if (token) {
      setToken(token);
      setRole(role);
    }
  }, []);
  
  if (!token) {
    return <SignIn />;
  }
  
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                ระบบหอพัก
                
              </Typography>
              <Button color="inherit" onClick={signout}>
                ออกจากระบบ
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map(
                (item, index) => 
                role === item.role && (
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ) 
              )}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manages" element={<Manages />} />
                <Route path="/manage/create" element={<ManageCreate />} />
                <Route path="/residents" element={<Residents />} />
                <Route path="/resident/create" element={<ResidentCreate />} />
                <Route path="/requestouts" element={< Requestout />} />
                <Route path="/requestout/create" element={<RequestoutCreate />} />
                <Route path="/requestchanges" element={< Requestchange />} />
                <Route path="/requestchange/create" element={<RequestchangeCreate />} />
                <Route path="/cleanings" element={<Cleanings />} />
                <Route path="/cleaning/create" element={<CleaningCreate />} />
                <Route path="/payment/create" element={<PaymentCreate />} />
                <Route path="/payments" element={<Payment />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user/create" element={<UserCreate />} />
                <Route path="/furnitures" element={<Furnitures />} />
                <Route path="/furniture/create" element={<FurnitureCreate />} />
                <Route path="/meters" element={<Meter />} />
                <Route path="/meter/create" element={<MeterCreate />} />
                <Route path="/bills" element={<Bill />} />
                <Route path="/bill/create" element={<BillCreate />} />
                <Route path="/repairs" element={<Repair />} />
                <Route path="/repair/create" element={<RepairCreate />} />
                <Route path="/emergencies" element={<Bill />} />
                <Route path="/emergencie/create" element={<EmergencyCreate />} />

              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;