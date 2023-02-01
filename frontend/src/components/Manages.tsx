import * as React from 'react';
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ManageInterface } from "../models/IManage";





function Manages() {
   const [manages, setManages] = useState<ManageInterface[]>([]);

   const apiUrl = "http://localhost:8080";
   const requestOptions = {
      method: "GET",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
      },
   };


   const getManages = async () => {
      fetch(`${apiUrl}/manages`, requestOptions)
         .then((response) => response.json())
         .then((res) => {
            console.log(res.data);
            if (res.data) {
               setManages(res.data);
            } else {
               console.log("else");
            }
         });
   };


   useEffect(() => {
      getManages();
   }, []);


   // return (
   //    <div style={{
   //       fontFamily: "PK Krung Thep Medium",
   //       fontSize: 20,
   //    }}>
   //       <Box display="flex">
   //          <Box flexGrow={1}>
   //             <Typography
   //                sx={{
   //                   fontFamily: "PK Krung Thep Medium",
   //                }}
   //                component="h2"
   //                variant="h3"
   //                color="primary"
   //                gutterBottom
   //             >
   //                <b>ระบบจัดการห้องพัก</b>
   //             </Typography>
   //          </Box>
   //          <Box>
   //             <Button
   //                component={RouterLink}
   //                to="/manage/create"
   //                variant="contained"
   //                color="primary"
   //                sx={{
   //                   fontFamily: "PK Krung Thep Medium",
   //                   fontSize: 18,
   //                   borderRadius: 15
   //                }}
   //             >
   //                จัดการห้องพัก
   //             </Button>
   //          </Box>
   //       </Box>

   //       <Paper elevation={3} style={{
   //          'borderRadius': '20px',
   //          backgroundImage: 'url("https://coolhdwall.com/storage/202101/mountains-fog-hd-phone-wallpaper-1125x2436.jpg")',
   //          backgroundRepeat: 'no-repeat',
   //          backgroundSize: 'cover',

   //       }}>
   //          <div style={{
   //             background: 'rgba(255, 255, 255, 0.5)',
   //             borderRadius: 20,

   //          }}>
   //             <Box sx={{
   //                m: 1.5,
   //             }}
   //             >
   //                <Grid container spacing={3} sx={{
   //                   alignContent: 'center',
   //                }}>
   //                   {manages.map((item: ManageInterface) => (
   //                      <Grid xs={10}>
   //                         <center>
   //                            <Typography
   //                               align="center"
   //                               sx={{
   //                                  fontFamily: "PK Krung Thep Medium",
   //                                  fontSize: 35,
   //                               }}
   //                            >
   //                               <b>ห้อง {item.Room.Number}</b>
   //                            </Typography>
   //                            <Button
   //                               component="span"
   //                               sx={{
   //                                  display: 'flex',
   //                                  justifyContent: 'center',
   //                                  flexGrow: 2,
   //                                  m: 0.5,
   //                                  background: 'rgba(255, 255, 255,0.7)',
   //                                  boxShadow: 5,
   //                                  borderRadius: 4,
   //                                  '&:hover': {
   //                                     background: 'rgba(142, 209, 252, 0.5)',
   //                                  },
   //                               }}
   //                            >
   //                               <Typography
   //                                  sx={{
   //                                     fontFamily: "PK Krung Thep Medium",
   //                                     fontSize: 18,
   //                                  }}
   //                                  color="black"
   //                               >
   //                                  <Typography
   //                                     align="center"
   //                                     sx={{
   //                                        fontFamily: "PK Krung Thep Medium",
   //                                        fontSize: 30,
   //                                     }}
   //                                  >
   //                                     <h1>
   //                                        <b>
   //                                           {item.Stetus}
   //                                        </b>
   //                                     </h1>
   //                                  </Typography>
   //                                  ราคาเช่า: <b>{item.Price}/เดือน</b>
   //                               </Typography>
   //                            </Button>
   //                         </center>
   //                      </Grid>

   //                   ))}

   //                </Grid>
   //             </Box>
   //          </div>
   //       </Paper>
   //    </div>
   // );


   return (

      <Container sx={{ marginTop: 2 }} maxWidth="md">
         <Box display="flex">
            <Box flexGrow={1}>
               <Typography
                  sx={{
                     fontFamily: "PK Krung Thep Medium",
                  }}
                  component="h2"
                  variant="h3"
                  color="primary"
                  gutterBottom
               >
                  <b>ระบบจัดการห้องพัก</b>
               </Typography>
            </Box>
            <Box>
               <Button
                  component={RouterLink}
                  to="/manage/create"
                  variant="contained"
                  color="primary"
                  sx={{
                     fontFamily: "PK Krung Thep Medium",
                     fontSize: 18,
                     borderRadius: 15
                  }}
               >
                  จัดการห้องพัก
               </Button>
            </Box>
         </Box>


         <Paper elevation={3} style={{
            'borderRadius': '20px',
            backgroundImage: 'url("https://coolhdwall.com/storage/202101/mountains-fog-hd-phone-wallpaper-1125x2436.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',

         }}>
            <div style={{
               background: 'rgba(255, 255, 255, 0.5)',
               borderRadius: 20,

            }}>
               <Box sx={{
                  m: 1.5,
               }}
               >
                  <Grid container spacing={3}>
                     {manages.map((item: ManageInterface) => (
                        <Grid xs={4}>
                           <Typography
                              align="center"
                              sx={{
                                 fontFamily: "PK Krung Thep Medium",
                                 fontSize: 35,
                              }}
                           >
                              <b>ห้อง {item.Room.Number}</b>
                           </Typography>
                           <Button
                              component="span"
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 flexGrow: 2,
                                 m: 0.5,
                                 background: 'rgba(255, 255, 255,0.7)',
                                 boxShadow: 5,
                                 borderRadius: 4,
                                 '&:hover': {
                                    background: 'rgba(142, 209, 252, 0.5)',
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
                                 <Typography
                                    align="center"
                                    sx={{
                                       fontFamily: "PK Krung Thep Medium",
                                       fontSize: 30,
                                    }}
                                 >
                                    <h1>
                                       <b>
                                          {item.Stetus}
                                       </b>
                                    </h1>
                                 </Typography>
                                 ราคาเช่า: <b>{item.Price}/เดือน</b>
                                 <p>
                                    ขนาดห้อง: <b>{item.Size.Size}</b><br />
                                    ประเภทห้อง: <b>{item.Category.Category}</b><br />
                                    ราคาเช่า: <b>{item.Price}/เดือน</b><br />
                                    <center>สิ่งอำนวยความสะดวก:</center>
                                    <b>{item.Detail}</b>
                                 </p>
                              </Typography>
                           </Button>


                           <center>
                              <Button
                                 // color="success"
                                 variant="contained"
                                 size="medium"
                                 sx={{
                                    marginRight: 3,
                                    marginTop: 1,
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
                                 size="medium"
                                 sx={{
                                    marginTop: 1,
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
                              // onClick={() => DeleteResident(item.ID)}
                              >
                                 ลบ
                              </Button>
                           </center>

                        </Grid>


                     ))}

                  </Grid>
               </Box>
            </div>
         </Paper>
      </Container>
   );
}

export default Manages;