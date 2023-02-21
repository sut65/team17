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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import ConstructionIcon from '@mui/icons-material/Construction';
import CampaignIcon from '@mui/icons-material/Campaign';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EditLocationIcon from '@mui/icons-material/EditLocation';

import Home from "./components/Home";
import Manages from "../../frontend/src/components/Manage/Manages";
import ManageView from "../../frontend/src/components/Manage/ManageView";
import ManageCreate from "../../frontend/src/components/Manage/ManageCreate";
import ManageUpdate from "../../frontend/src/components/Manage/ManageUpdate";

import Residents from "./components/Resident/Residents";
import ResidentCreate from "./components/Resident/ResidentCreate";
import ResidentUpdate from "./components/Resident/ResidentUpdate";

import Requestout from "./components/Requestout/Requestout";
import RequestoutCreate from "./components/Requestout/RequestoutCreate";
import RequestoutUpdate from "./components/Requestout/RequestoutUpdate";
import Requestchange from "./components/Requestchange/Requestchange";
import RequestchangeCreate from "./components/Requestchange/Requestchangecreate";
import RequestchangeUpdate from "./components/Requestchange/RequestchangeUpdate";
import Cleanings from "./components/Cleaning/Cleanings";
import CleaningCreate from "./components/Cleaning/CleaningCreate";
import CleaningUpdate from "./components/Cleaning/CleaningUpdate";
import Furnitures from "./components/Furniture/Furnitures";
import FurnitureCreate from "./components/Furniture/FurnitureCreate";
import FurnitureUpdate from "./components/Furniture/FurnitureUpdate";
import Meter from "./components/Meter/Meter";
import MeterCreate from "./components/Meter/MeterCreate";
import MeterUpdate from "./components/Meter/MeterUpdate";
import Bill from "./components/Bill/Bill";
import BillCreate from "./components/Bill/BillCreate";
import BillUpdate from "./components/Bill/BillUpdate";
import Repair from "./components/Repair/Repair";
import RepairCreate from "./components/Repair/RepairCreate";
import RepairUpdate from "../../frontend/src/components/Repair/RepairUpdate";
import Emergency from "./components/Emergency/Emergency";
import EmergencyCreate from "./components/Emergency/EmergencyCreate";
import EmergencyUpdate from "./components/Emergency/EmergencyUpdate";
import { Grid } from "@mui/material";

import SignIn from "./components/SignIn";
import PaymentCreate from "./components/PaymentCreate";
import Payment from "./components/Payment";
import PaymentUpdate from "./components/PaymentUpdate";

import Users from "./components/User";
import UserCreate from "./components/UserCreate";
import UserUpdate from "./components/UserUpdate";

import { UserInterface } from "./models/IUser";
import { AdminInterface } from "./models/IAdmin";



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
   { name: "หน้าแรก", icon: <HomeIcon />, path: "/", role: 'user' },
   { name: "หน้าแรก", icon: <HomeIcon />, path: "/", role: 'admin' },

   { name: "จัดการห้องพัก", icon: <RoomPreferencesIcon />, path: "/manages", role: 'admin' },
   { name: "ห้องพัก", icon: <MeetingRoomIcon />, path: "/manage-view", role: 'user' },
   { name: "สัญญาเช่า", icon: <ContactPageIcon />, path: "/residents", role: 'admin' },

   { name: "แจ้งออก", icon: <RemoveCircleOutlineIcon />, path: "/requestouts", role: 'user' },
   { name: "แจ้งย้ายห้อง", icon: <EditLocationIcon />, path: "/requestchanges", role: 'user' },

   { name: "จองทำความสะอาด", icon: <CleaningServicesOutlinedIcon />, path: "/cleanings", role: 'user' },
   { name: "เบิกจ่ายอุปกรณ์ในห้องพัก", icon: <ChairOutlinedIcon />, path: "/furnitures", role: 'admin' },

   { name: "มิเตอร์", icon: <ChairOutlinedIcon />, path: "/meters", role: 'admin' },
   { name: "บิลชำระ", icon: <ChairOutlinedIcon />, path: "/bills", role: 'admin' },

   { name: "การชำระเงิน", icon: <PaymentIcon />, path: "/payments", role: 'user' },
   { name: "บันทึกข้อมูลผู้เช่า", icon: <AccountCircleIcon />, path: "/users", role: 'user' },
   { name: "บันทึกข้อมูลผู้เช่า", icon: <AccountCircleIcon />, path: "/users", role: 'admin' },
   
   { name: "แจ้งเหตุฉุกเฉิน", icon: <CampaignIcon />, path: "/emergencies", role: 'user' },
   { name: "แจ้งซ่อม", icon: <ConstructionIcon />, path: "/repairs", role: 'user' },



];



function App() {
   const [users, setUsers] = useState<UserInterface>();
   const [admins, setAdmins] = useState<AdminInterface>();
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
   console.log(role);

   if (!token) {
      return <SignIn />;
   }

   const signout = () => {
      localStorage.clear();
      window.location.href = "/";
   };

   return (
      <Router>
         <Box>
            <AppBar position="absolute" open={open}
            // sx={{
            //    width: '95%',
            //    bgcolor: 'lightgrey',
            // }}
            >
               <Toolbar
                  sx={{
                     // bgcolor: '#194D33',
                     pr: "24px",
                     height: '50px',
                  }}
               >

                  <Box sx={{
                     height: '100%',
                     // bgcolor: 'lightgreen',
                     ml: '20px',
                     width: '100%',
                     display: 'flex',
                     justifyContent: 'left',
                     alignItems: 'center',

                  }}>
                     <List>
                        {menu.map(
                           (item, index) =>
                              role === item.role && (
                                 <Link
                                    to={item.path}
                                    key={item.name}
                                    style={{ textDecoration: "none", color: "inherit", }}
                                 >
                                    <Button
                                       variant="outlined"
                                       sx={{
                                          fontFamily: "PK Krung Thep Medium",
                                          fontSize: "18px",
                                          height: 'auto',
                                          width: 'auto',
                                          color: 'white',
                                          borderRadius: "20px",
                                          transition: 'all 0.5s',
                                          '&:hover': {
                                             bgcolor: 'white',
                                             color: 'black',
                                             borderRadius: "20px",
                                          },
                                          '&:active': {
                                             boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
                                          }
                                       }}
                                    >
                                       <Typography sx={{
                                          fontFamily: "PK Krung Thep Medium",
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                       }}>
                                          {item.icon} {item.name}
                                       </Typography>

                                    </Button>
                                 </Link>
                              )
                        )}
                     </List>
                  </Box>

                  <Button variant="outlined" onClick={signout}
                     sx={{
                        mr: '5px',
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: "20px",
                        height: 'auto',
                        width: '200px',
                        color: 'white',
                        borderRadius: "20px",
                        '&:hover': {
                           borderColor: 'white',
                           borderWidth: '2px',
                           borderRadius: "20px",
                        },
                     }}
                  >
                     ออกจากระบบ
                  </Button>
               </Toolbar>
            </AppBar>
         </Box>

         <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
               item
               xs={12}
               // sm={4}
               // md={7}
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "top",
                  // backgroundImage: "url(https://img.freepik.com/premium-photo/3d-chat-bubbles-minimal-concept-social-media-quote-3d-illustrations_677520-42.jpg?w=1380)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  background: '#e0e0e0',
               }}
            >
               <Box
                  component="main"
                  sx={{
                     width: '100%',
                     height: 'auto',
                     display: 'flex',
                     overflow: 'hidden',
                     justifyContent: 'center',
                     // alignItems: 'center',
                  }}>
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="/manages" element={<Manages />} />
                     <Route path="/manage-view" element={<ManageView />} />
                     <Route path="/manage/create" element={<ManageCreate />} />
                     <Route path="/manages/:id" element={<ManageUpdate />} />

                     <Route path="/residents" element={<Residents />} />
                     <Route path="/resident/create" element={<ResidentCreate />} />
                     <Route path="/residents/:id" element={<ResidentUpdate />} />

                     <Route path="/requestouts" element={< Requestout />} />
                     <Route path="/requestout/create" element={<RequestoutCreate />} />
                     <Route path="/requestouts/:id" element={<RequestoutUpdate />} />

                     <Route path="/requestchanges" element={< Requestchange />} />
                     <Route path="/requestchange/create" element={<RequestchangeCreate />} />
                     <Route path="/requestchanges/:id" element={<RequestchangeUpdate />} />

                     <Route path="/cleanings" element={<Cleanings />} />
                     <Route path="/cleaning/create" element={<CleaningCreate />} />
                     <Route path="/cleanings/:id" element={<CleaningUpdate />} />

                     <Route path="/payment/create" element={<PaymentCreate />} />
                     <Route path="/payments" element={<Payment />} />
                     <Route path="/payments/:id" element={<PaymentUpdate />} />

                     <Route path="/users" element={<Users />} />
                     <Route path="/user/create" element={<UserCreate />} />
                     <Route path="/users/:id" element={<UserUpdate />} />

                     <Route path="/furnitures" element={<Furnitures />} />
                     <Route path="/furniture/create" element={<FurnitureCreate />} />
                     <Route path="/furnitures/:id" element={<FurnitureUpdate />} />

                     <Route path="/meters" element={<Meter />} />
                     <Route path="/meter/create" element={<MeterCreate />} />
                     <Route path="/meters/:id" element={<MeterUpdate />} />

                     <Route path="/bills" element={<Bill />} />
                     <Route path="/bill/create" element={<BillCreate />} />
                     <Route path="/bills/:id" element={<BillUpdate />} />

                     <Route path="/repairs" element={<Repair />} />
                     <Route path="/repair/create" element={<RepairCreate />} />
                     <Route path="/repairs/:id" element={<RepairUpdate />} />

                     <Route path="/emergencies" element={<Emergency />} />
                     <Route path="/emergencie/create" element={<EmergencyCreate />} />
                     <Route path="/emergencies/:id" element={<EmergencyUpdate />} />
                  </Routes>
               </Box>
            </Grid>
         </Grid>
      </Router>

   );
}

export default App;