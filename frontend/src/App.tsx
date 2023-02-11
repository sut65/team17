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
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import EditLocationIcon from '@mui/icons-material/EditLocation';

import Home from "./components/Home";
import Manages from "../../frontend/src/components/Manage/Manages";
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
import CleaningUpdate from "../../frontend/src/components/Cleaning/CleaningUpdate";
import Furnitures from "./components/Furniture/Furnitures";
import FurnitureCreate from "./components/Furniture/FurnitureCreate";
import Meter from "./components/Meter/Meter";
import MeterCreate from "./components/Meter/MeterCreate";
import Bill from "./components/Bill/Bill";
import BillCreate from "./components/Bill/BillCreate";
import Repair from "./components/Repair";
import RepairCreate from "./components/RepairCreate";
import Emergency from "./components/Emergency";
import EmergencyCreate from "./components/EmergencyCreate";
import { Grid } from "@mui/material";

import SignIn from "./components/SignIn";
import PaymentCreate from "./components/PaymentCreate";
import Payment from "./components/Payment";
import Users from "./components/User";
import UserCreate from "./components/UserCreate";
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
   { name: "สัญญาเช่า", icon: <ContactPageIcon />, path: "/residents", role: 'admin' },

   { name: "แจ้งออก", icon: <RemoveCircleOutlineIcon />, path: "/requestouts", role: 'user' },
   // { name: "แจ้งออก", icon: <RemoveCircleOutlineIcon />, path: "/requestouts", role: 'admin' },
   { name: "แจ้งย้ายห้อง", icon: <EditLocationIcon />, path: "/requestchanges", role: 'user' },
   // { name: "แจ้งย้ายห้อง", icon: <EditLocationIcon />, path: "/requestchanges", role: 'admin' },

   { name: "จองทำความสะอาด", icon: <CleaningServicesOutlinedIcon />, path: "/cleanings", role: 'user' },
   // { name: "จองทำความสะอาด", icon: <CleaningServicesOutlinedIcon />, path: "/cleanings", role: 'admin' },
   // { name: "เบิกจ่ายอุปกรณ์ในห้องพัก", icon: <ChairOutlinedIcon />, path: "/furnitures", role: 'user' },
   { name: "เบิกจ่ายอุปกรณ์ในห้องพัก", icon: <ChairOutlinedIcon />, path: "/furnitures", role: 'admin' },
   // { name: "มิเตอร์", icon: <ChairOutlinedIcon />, path: "/meters", role: 'user' },
   { name: "มิเตอร์", icon: <ChairOutlinedIcon />, path: "/meters", role: 'admin' },
   // { name: "บิลชำระ", icon: <ChairOutlinedIcon />, path: "/bills", role: 'user' },
   { name: "บิลชำระ", icon: <ChairOutlinedIcon />, path: "/bills", role: 'admin' },
   { name: "การชำระเงิน", icon: <PaymentIcon />, path: "/payments", role: 'user' },
   // { name: "การชำระเงิน", icon: <PaymentIcon />, path: "/payments", role: 'admin' },
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
            <AppBar position="absolute" open={open}>
               <Toolbar
                  sx={{
                     pr: "24px", // keep right padding when drawer closed
                     height: '50px'
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
                                          // display: 'grid',
                                          fontFamily: "PK Krung Thep Medium",
                                          fontSize: "18px",
                                          height: 'auto',
                                          width: 'auto',
                                          color: 'white',
                                          borderRadius: "20px",
                                          '&:hover': {
                                             borderColor: 'white',
                                             borderWidth: '2px',
                                             borderRadius: "20px",
                                          },
                                       }}
                                    >
                                       <Typography sx={{
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
                  {/* <Button variant="outlined"
                     component={Link}
                     to="/"
                     sx={{
                        mr: '10px',
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: "20px",
                        height: 'auto',
                        width: '10%',
                        color: 'white',
                        borderRadius: "20px",
                        '&:hover': {
                           borderColor: 'white',
                           borderWidth: '2px',
                           borderRadius: "20px",
                        },
                     }}
                  >
                     หน้าแรก
                  </Button> */}

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
                  backgroundImage: "url(https://cdn.pixabay.com/photo/2019/08/28/12/20/fog-4436636_960_720.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
            >
               <Box sx={{
                  // height: '85vh',
                  mt: '100px',
                  mb: '50px',
                  minHeight: '50%',
                  width: '90%',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  justifyContent: 'center',
                  // alignItems: 'center',
                  borderRadius: 10,

               }}>


                  <Box 
                     component="main"
                     sx={{
                        width: '90%',
                        height: '100%',
                        // bgcolor: 'skyblue',
                        display: 'flex',
                        justifyContent: 'center',
                        // alignItems: 'center',
                     }}>
                     <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/manages" element={<Manages />} />
                        <Route path="/manage/create" element={<ManageCreate />} />
                        <Route path="/manages/:id" element={<ManageUpdate />} />

                        <Route path="/residents" element={<Residents />} />
                        <Route path="/resident/create" element={<ResidentCreate />} />
<<<<<<< HEAD
                        {/* <Route path="/residents/:id" element={<ResidentUpdate />} /> */}
=======
                        <Route path="/residents/:id" element={<ResidentUpdate />} />

<<<<<<< HEAD
>>>>>>> 5a27d7007a4fa785ede729e24e36e81b934e210e
=======
>>>>>>> 4b611d1f595e72800519d53d3c6ad57b24596f75
                        <Route path="/requestouts" element={< Requestout />} />
                        <Route path="/requestout/create" element={<RequestoutCreate />} />
                        <Route path="/requestouts/:id" element={<RequestoutUpdate />} />

                        <Route path="/requestchanges" element={< Requestchange />} />
                        <Route path="/requestchange/create" element={<RequestchangeCreate />} />
                        <Route path="/requestchanges/:id" element={<RequestchangeUpdate />} />

                        <Route path="/cleanings" element={<Cleanings />} />
                        <Route path="/cleaning/create" element={<CleaningCreate />} />
<<<<<<< HEAD
<<<<<<< HEAD
                        <Route path="/cleanings/:id" element={<CleaningUpdate />} />
=======
                        
>>>>>>> 5a27d7007a4fa785ede729e24e36e81b934e210e
=======
                        
>>>>>>> 4b611d1f595e72800519d53d3c6ad57b24596f75
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
                        <Route path="/emergencies" element={<Emergency />} />
                        <Route path="/emergencie/create" element={<EmergencyCreate />} />
                     </Routes>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </Router>

      // <Router>
      //   <ThemeProvider theme={mdTheme}>
      //     <Box sx={{ display: "flex" }}>
      //       <CssBaseline />
      //       <AppBar position="absolute" open={open}>
      //         <Toolbar
      //           sx={{
      //             pr: "24px", // keep right padding when drawer closed
      //           }}
      //         >
      //           <IconButton
      //             edge="start"
      //             color="inherit"
      //             aria-label="open drawer"
      //             onClick={toggleDrawer}
      //             sx={{
      //               marginRight: "36px",
      //               ...(open && { display: "none" }),
      //             }}
      //           >
      //             <MenuIcon />
      //           </IconButton>
      //           <Typography
      //             component="h1"
      //             variant="h6"
      //             color="inherit"
      //             noWrap
      //             sx={{ flexGrow: 1 }}
      //           >
      //             ระบบหอพัก

      //           </Typography>
      //           <Button color="inherit" onClick={signout}>
      //             ออกจากระบบ
      //           </Button>
      //         </Toolbar>
      //       </AppBar>
      //       <Drawer variant="permanent" open={open}>
      //         <Toolbar
      //           sx={{
      //             display: "flex",
      //             alignItems: "center",
      //             justifyContent: "flex-end",
      //             px: [1],
      //           }}
      //         >
      //           <IconButton onClick={toggleDrawer}>
      //             <ChevronLeftIcon />
      //           </IconButton>
      //         </Toolbar>
      //         <Divider />
      //         <List>
      //           {menu.map(
      //             (item, index) => 
      //             role === item.role && (
      //             <Link
      //               to={item.path}
      //               key={item.name}
      //               style={{ textDecoration: "none", color: "inherit" }}
      //             >
      //               <ListItem button>
      //                 <ListItemIcon>{item.icon}</ListItemIcon>
      //                 <ListItemText primary={item.name} />
      //               </ListItem>
      //             </Link>
      //           ) 
      //           )}
      //         </List>
      //       </Drawer>
      //       <Box
      //         component="main"
      //         sx={{
      //           backgroundColor: (theme) =>
      //             theme.palette.mode === "light"
      //               ? theme.palette.grey[100]
      //               : theme.palette.grey[900],
      //           flexGrow: 1,
      //           height: "100vh",
      //           overflow: "auto",
      //         }}
      //       >
      //         <Toolbar />
      //         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      //           <Routes>
      //             <Route path="/" element={<Home />} />
      //             <Route path="/manages" element={<Manages />} />
      //             <Route path="/manage/create" element={<ManageCreate />} />
      //             <Route path="/manages/:id" element={<ManageUpdate />} />
      //             <Route path="/residents" element={<Residents />} />
      //             <Route path="/resident/create" element={<ResidentCreate />} />
      //             <Route path="/residents/:id" element={<ResidentUpdate />} />
      //             <Route path="/requestouts" element={< Requestout />} />
      //             <Route path="/requestout/create" element={<RequestoutCreate />} />
      //             <Route path="/requestchanges" element={< Requestchange />} />
      //             <Route path="/requestchange/create" element={<RequestchangeCreate />} />
      //             <Route path="/cleanings" element={<Cleanings />} />
      //             <Route path="/cleaning/create" element={<CleaningCreate />} />
      //             <Route path="/payment/create" element={<PaymentCreate />} />
      //             <Route path="/payments" element={<Payment />} />
      //             <Route path="/users" element={<Users />} />
      //             <Route path="/user/create" element={<UserCreate />} />
      //             <Route path="/furnitures" element={<Furnitures />} />
      //             <Route path="/furniture/create" element={<FurnitureCreate />} />
      //             <Route path="/meters" element={<Meter />} />
      //             <Route path="/meter/create" element={<MeterCreate />} />
      //             <Route path="/bills" element={<Bill />} />
      //             <Route path="/bill/create" element={<BillCreate />} />
      //             <Route path="/repairs" element={<Repair />} />
      //             <Route path="/repair/create" element={<RepairCreate />} />
      //             <Route path="/emergencies" element={<Bill />} />
      //             <Route path="/emergencie/create" element={<EmergencyCreate />} />

      //           </Routes>
      //         </Container>
      //       </Box>
      //     </Box>
      //   </ThemeProvider>
      // </Router>
   );
}

export default App;