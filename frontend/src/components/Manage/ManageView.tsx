import * as React from 'react';
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import { useParams, useNavigate } from "react-router-dom";

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

import { ManageInterface } from "../../models/IManage";
import { Card } from '@mui/material';





function ManageViews() {
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


   useEffect(() => {
      getManages();
   }, []);


   return (
      <div style={{
         // backgroundImage: "url(https://cdn.pixabay.com/photo/2018/09/24/08/52/mountains-3699372_960_720.jpg)",
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
         // alignItems: 'center',
      }}>
         <Box sx={{
            mt: '70px',
            width: '1200px',
            height: 'auto',
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
                        รายชื่อห้องพัก
                     </center>
                  </Typography>
               </Paper>
            </Box>

            <Grid container spacing={2}>
               {manages.map((item: ManageInterface) => (
                  <Grid xs={4} sx={{
                     display: 'grid',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}>

                     <Card
                        component="span"
                        sx={{
                           height: '300px',
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
                           background: '##e0e0e0',
                           // boxShadow:  '20px 20px 20px #CECECE',
                           boxShadow: '5px',
                           '&:hover': {
                              background: 'rgba(217, 227, 240, 0.9)',
                              transform: 'scale(0.98)',
                              boxShadow: '0px 0px 30px 1px rgba(0, 255, 117, 0.30)'
                           },
                        }}
                     >
                        <Typography align='center' sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: 50,
                           color: '#0693e3',
                        }}>
                           <b>{item.Status}</b>
                        </Typography>

                        <Typography align='center' sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: 18,
                           margin: 2,
                           color: 'black',
                        }}
                        >
                           ห้อง: <b>{item.Room.Number}</b> <br />
                           ราคาเช่า: <b>{item.Price}/เดือน</b><br />
                           ขนาดห้อง: <b>{item.Size.Size}</b><br />
                           ประเภทห้อง: <b>{item.Category.Category}</b><br />
                           {item.Detail}

                        </Typography>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Box>

      </div>
   );
}
export default ManageViews;