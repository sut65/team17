import * as React from 'react';
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import { useParams, useNavigate } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

import { ManageInterface } from "../../models/IManage";





function Manages() {
   let navigate = useNavigate();
   const { id } = useParams();
   const [manages, setManages] = useState<ManageInterface[]>([]);

   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
   const [ErrorMessage, setErrorMessage] = useState("");

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

   const DeleteManage = async (id: string | number | undefined) => {
      const requestOptions = {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
         },
      };

      fetch(`${apiUrl}/manages/${id}`, requestOptions)
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
               getManages();
            }
         )

   }

   // const hiddenData = async (id: string | number | undefined) => {
   //    console.log(id);

   //    if (hiddens == true) {
   //       setHiddens(false)
   //    } else {
   //       setHiddens(true)
   //    }
   // };


   useEffect(() => {
      getManages();
   }, []);


   return (
      <div style={{
         fontFamily: "PK Krung Thep Medium",
         fontSize: 20,
      }}>
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
                  align='center'
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
               <Grid container spacing={3} sx={{
                  display: 'flex',
                  justifyContent: 'center',
               }}>
                  {manages.map((item: ManageInterface) => (
                     <Grid xs={11} sx={{
                        display: 'flex',
                     }}>

                        <Button
                           component="span"
                           sx={{
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: 30,
                              display: 'flex',
                              justifyContent: 'left',
                              width: 'auto',
                              flexGrow: 2,
                              m: 0.5,
                              background: 'rgba(255, 255, 255,0.7)',
                              boxShadow: 5,
                              borderRadius: 10,
                              '&:hover': {
                                 background: 'rgba(142, 209, 252, 0.5)',
                              },
                           }}
                        >
                           <Typography sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              width: '30%',
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: 30,
                           }}>
                              <h1><b>{item.Status}</b></h1>
                           </Typography>

                           <Typography sx={{
                              width: '30%',
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: 20,
                              margin: 3,
                              color: 'black',
                           }}
                           >
                              ห้อง: <b>{item.Room.Number}</b> <br />
                              ราคาเช่า: <b>{item.Price}/เดือน</b><br />
                              ขนาดห้อง: <b>{item.Size.Size}</b><br />
                              ประเภทห้อง: <b>{item.Category.Category}</b><br />
                           </Typography>

                           <Typography sx={{
                              width: '50%',
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: 20,
                              margin: 3,
                              color: 'black',
                           }}
                           >
                              สิ่งอำนวยความสะดวก: <br />
                              <b>{item.Detail}</b>
                           </Typography>

                        </Button>

                        <div style={{
                           display: 'grid',
                           marginTop: 'auto',
                           marginBottom: 'auto',
                           marginLeft: 5,
                           marginRight: 10,
                        }}>
                           <Button
                              variant="outlined"
                              size="medium"
                              startIcon={<SaveAsOutlinedIcon />}
                              sx={{
                                 fontFamily: "PK Krung Thep Medium",
                                 fontSize: 20,
                                 borderRadius: 20,
                                 fontWeight: "bold",
                                 color: 'black',
                                 width: '100px',
                                 marginBottom: 1,
                                 borderColor: 'black',
                                 '&:hover': {
                                    background: 'rgba(0, 208, 132, 0.5)',
                                    borderColor: 'rgba(0, 208, 132, 0.4)',
                                 },
                              }}
                              onClick={() => navigate(`${item.ID}`)}
                           >
                              แก้ไข
                           </Button>
                           <Button
                              variant="outlined"
                              size="medium"
                              startIcon={<DeleteIcon />}
                              sx={{
                                 fontFamily: "PK Krung Thep Medium",
                                 fontSize: 20,
                                 borderRadius: 20,
                                 fontWeight: "bold",
                                 marginTop: 1,
                                 width: '100px',
                                 color: 'black',
                                 borderColor: 'black',
                                 '&:hover': {
                                    background: 'rgba(0, 208, 132, 0.5)',
                                    borderColor: 'rgba(0, 208, 132, 0.4)',
                                 },
                              }}
                              aria-label="delete"
                              onClick={() => DeleteManage(item.ID)}
                           >
                              ลบ
                           </Button>
                        </div>
                     </Grid>
                  ))}
               </Grid>
            </div>
         </Paper>
      </div>
   );


   
}

export default Manages;