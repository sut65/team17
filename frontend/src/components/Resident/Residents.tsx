import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ResidentInterface } from "../../models/IResident";
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, IconButton, Snackbar } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Card } from '@mui/material';



function Rooms() {
   let navigate = useNavigate();
   const { id } = useParams();
   const [residents, setResidents] = useState<ResidentInterface[]>([]);

   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
   const [ErrorMessage, setErrorMessage] = useState("");
   const [hasDelete, setHasDelete] = React.useState(false);


   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
         return;
      }
      setSuccess(false);
      setError(false);
   };

   const Alert = (props: AlertProps) => {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
   };


   const apiUrl = "http://localhost:8080";
   const requestOptions = {
      method: "GET",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
      },
   };


   const getResidents = async () => {
      setHasDelete(false);
      fetch(`${apiUrl}/residents`, requestOptions)
         .then((response) => response.json())
         .then((res) => {
            console.log(res.data);
            if (res.data) {
               setResidents(res.data);
            } else {
               console.log("else");
            }
         });
   };


   const DeleteResident = async (id: string | number | undefined) => {
      console.log(id);

      const apiUrl = "http://localhost:8080";
      const requestOptions = {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
         },
      };

      fetch(`${apiUrl}/residents/${id}`, requestOptions)
         .then((response) => response.json())
         .then(
            (res) => {
               if (res.data) {
                  setSuccess(true)
                  console.log("ยกเลิกสำเร็จ")
                  setErrorMessage("")
               }
               else {
                  setErrorMessage(res.error)
                  setError(true)
                  console.log("ยกเลิกไม่สำเร็จ")
               }
               getResidents();
            }
         )
   }


   useEffect(() => {
      getResidents();
   }, []);


   return (
      <div style={{
         backgroundImage: "url(https://images.hdqwalls.com/download/simple-drop-white-10k-n8-1280x720.jpg)",
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
         backgroundPosition: "center",
         // background: '#e0e0e0',
         width: '100%',
         fontFamily: "PK Krung Thep Medium",
         fontSize: 20,
         display: 'grid',
         justifyContent: 'center',
         alignItems: 'center',
      }}>
         <Box sx={{
            mt: '50px',
            height: '90%',
            // bgcolor: 'lightgreen',
            width: '1400px',
         }}>
            <Box sx={{
               mt: '10px',
               mb: '20px',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}>

               <Paper sx={{
                  mr: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50px',
                  boxShadow: '20px 20px 35px #45504a',

               }}>
                  <Box sx={{
                     ml: '20px',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}>
                     {<SearchOutlinedIcon />}
                  </Box>

                  <Typography
                     sx={{
                        ml: '20px',
                        width: '700px',
                        height: '100%',
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: '30px',
                     }}
                  >
                     <center>
                        ระบบสัญญาเช่า
                     </center>
                  </Typography>
               </Paper>



               <Box sx={{
                  display: 'flex',
                  justifyContent: 'right',
               }}>
                  <Button
                     component={RouterLink}
                     to="/resident/create"
                     variant="contained"
                     color="primary"
                     sx={{
                        mr: '20px',
                        width: 'auto',
                        height: 'auto',
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 18,
                        borderRadius: 15,
                        bgcolor: '#0693e3',
                        color: 'white',
                        boxShadow: '20px 20px 35px #45504a',
                     }}
                  >
                     ทำสัญญา
                  </Button>
               </Box>
            </Box>

            <Grid container spacing={2}>
               {residents.map((item: ResidentInterface) => (
                  <Grid xs={4} sx={{
                     display: 'flex',
                     justifyContent: 'center',
                  }}>

                     <Card
                        component="span"
                        sx={{
                           height: '350px',
                           width: '380px',
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: 30,
                           display: 'grid',
                           justifyContent: 'center',
                           alignItems: 'center',
                           flexGrow: 2,
                           transition: 'all .6s',
                           m: 0.5,
                           backdropFilter: 'blur(2px)',

                           borderRadius: '50px',
                           background: '#e5faff',
                           boxShadow: '20px 20px 20px #CECECE',
                           '&:hover': {
                              background: 'rgba(229, 250, 255, 0.9)',
                              transform: 'scale(0.98)',
                              boxShadow: '0px 0px 30px 1px rgba(0, 255, 117, 0.30)'
                           },
                        }}

                     >
                        <Typography align="center" sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: 50,
                           color: '#0693e3',
                        }}>
                           <b>ห้อง{item.Manage.Room.Number}</b>
                        </Typography>

                        <Typography align="center" sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: 18,
                           margin: 2,
                           color: 'black',
                        }}
                        >
                           ชื่อผู้เช่า: <b>{item.User.Name}</b> <br />
                           เบอร์โทร: <b>{item.User.Tel}</b><br />
                           ระยะเวลาสัญญา: <b>{item.Lease.Lease}</b><br />
                           เงินประกัน: <b>{item.Bail}</b><br />
                           วันที่ทำสัญญา: <b>{moment(item.LeaseTime).format('DD MMMM yyyy')}</b><br />
                        </Typography>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 2,
                            marginBottom: 'auto',
                            marginLeft: 5,
                            marginRight: 10,
                        }}>
                           <Button
                              size="medium"
                              sx={{
                                 ml: 1,
                                 fontSize: 20,
                                 borderRadius: '0.7em',
                                 width: 'auto',
                                 color: 'black',
                                 bgcolor: 'white',
                                 border: '2px solid #ffffff',
                                 transition: 'all 0.5s',
                                 boxShadow: '6px 6px 12px #c5c5c5;',
                                 '&:hover': {
                                    bgcolor: 'white',
                                    border: '2px solid #0693e3',
                                 },
                                 '&:active': {
                                    boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
                                 }
                              }}
                              onClick={() => navigate(`${item.ID}`)}

                           >
                              {<EditIcon />}
                           </Button>
                           <Button
                              variant="outlined"
                              size="medium"
                              sx={{
                                 ml: 1,
                                 fontSize: 20,
                                 borderRadius: '0.7em',
                                 width: 'auto',
                                 color: 'black',
                                 bgcolor: 'white',
                                 border: '2px solid #ffffff',
                                 transition: 'all 0.5s',
                                 boxShadow: '6px 6px 12px #c5c5c5;',
                                 '&:hover': {
                                    bgcolor: 'white',
                                    border: '2px solid #0693e3',
                                 },
                                 '&:active': {
                                    boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
                                 }
                              }}
                              aria-label="delete"
                              onClick={() => DeleteResident(item.ID)}
                           >
                              {<DeleteIcon />}
                           </Button>
                        </div>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Box>
      </div>
   );



}

export default Rooms;