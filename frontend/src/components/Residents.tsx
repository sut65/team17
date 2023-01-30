import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ResidentInterface } from "../models/IResident";
import Grid from '@mui/material/Unstable_Grid2';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import { Alert, IconButton, Snackbar } from "@mui/material";

import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';


import MuiAlert, { AlertProps } from "@mui/material/Alert";



function Rooms() {
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
      <div>
         <Container sx={{ marginTop: 2 }} maxWidth="md">
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
               <Alert onClose={handleClose} severity="success">
                  ยกเลิกชำระเงินค่ายาสำเร็จ
               </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
               <Alert onClose={handleClose} severity="error">
                  {ErrorMessage}
               </Alert>
            </Snackbar>
            <Box display="flex">
               <Box flexGrow={1}>
                  <Typography sx={{
                     fontFamily: "PK Krung Thep Medium",
                  }}
                     component="h2"
                     variant="h3"
                     color="primary"
                     gutterBottom
                  >
                     <b>ข้อมูลการทำสัญญาเช่า</b>
                  </Typography>
               </Box>
               <Box>
                  <Button
                     component={RouterLink}
                     to="/resident/create"
                     variant="contained"
                     color="primary"
                     sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 18,
                        borderRadius: 10,
                     }}
                  >
                     ทำสัญญา
                  </Button>
               </Box>
            </Box>


            <Paper elevation={5} style={{
               'borderRadius': '20px',
               backgroundImage: 'url("https://img.freepik.com/free-vector/blue-purple-fluid-background_53876-118285.jpg")',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',

            }}>
               <Box sx={{
                  m: 1.5
               }}>

                  <Grid container spacing={3}>
                     {residents.map((item: ResidentInterface, index) => (
                        <Grid xs={4}>
                           <Typography
                              align="center"
                              sx={{
                                 fontFamily: "PK Krung Thep Medium",
                                 fontSize: 35,
                              }}
                           >
                              <b>ห้อง {item.Manage.Room.Number}</b>
                           </Typography>
                           <Button
                              component="span"
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 flexGrow: 1,
                                 m: 0.5,
                                 background: 'rgba(255, 255, 255,0.7)',
                                 boxShadow: 5,
                                 borderRadius: 4,
                                 '&:hover': {
                                    background: 'rgba(224, 242, 241, 0.5)',
                                 },
                              }}
                           >
                              <Typography
                                 sx={{
                                    fontFamily: "PK Krung Thep Medium",
                                    fontSize: 18,
                                 }}
                                 color="black"
                              >
                                 <p> ชื่อผู้เช่า: <b>{item.User.Name}</b><br />
                                    เบอร์โทร: <b>{item.User.Tel}</b><br />
                                    สัญญา: <b>{item.Lease.Lease}</b><br />
                                    ประกันห้อง: <b>{item.Bail}</b> บาท<br />
                                 </p>
                                 วันที่ทำสัญญา: <b>{moment(item.LeaseTime).format('DD MMM yyyy')}</b>
                              </Typography>
                           </Button>




                           <Grid container spacing={3} sx={{ padding: 2 }}>
                              <Grid xs={12}>
                                 <ButtonGroup
                                    disableElevation
                                    // variant="contained"
                                    aria-label="Disabled elevation buttons"
                                    sx={{
                                       display: "flex",
                                       justifyContent: "center",

                                    }}
                                 >
                                    <Button
                                       // color="success"
                                       variant="contained"
                                       size="medium"
                                       sx={{
                                          fontFamily: "PK Krung Thep Medium",
                                          fontSize: 18,
                                          fontWeight: "bold",
                                          borderRadius: 5,
                                          color: 'black',
                                          bgcolor: '#00d084',
                                          '&:hover': {
                                             background: 'rgba(3, 175, 112, 1)',
                                          },
                                       }}
                                       startIcon={<EditIcon />}
                                    >
                                       แก้ไข
                                    </Button>
                                    <Button
                                       // color="success"
                                       variant="contained"
                                       sx={{
                                          fontFamily: "PK Krung Thep Medium",
                                          fontSize: 18,
                                          fontWeight: "bold",
                                          borderRadius: 5,
                                          bgcolor: '#00d084',
                                          color: 'black',
                                          '&:hover': {
                                             background: 'rgba(3, 175, 112, 1)',
                                          },
                                       }}
                                       startIcon={<DeleteIcon />}
                                       aria-label="delete"
                                       onClick={() => DeleteResident(item.ID)}
                                    >
                                       ลบ
                                    </Button>

                                 </ButtonGroup>
                              </Grid >
                           </Grid>
                        </Grid>
                     ))}
                  </Grid>
               </Box>
            </Paper>



         </Container>
      </div>
   );
}

export default Rooms;