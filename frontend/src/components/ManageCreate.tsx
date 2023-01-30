import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createStyles, FormHelperText, InputLabel } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


import { RoomInterface } from "../models/IRoom";
import { CategoryInterface } from "../models/ICategory";
import { SizeInterface } from "../models/ISize";
import { ManageInterface } from "../models/IManage";
import { FormControlLabel, FormLabel, RadioGroup, Radio, FormGroup, Theme } from "@mui/material";
import styled from "@emotion/styled";


export const TextFielPrice = styled(TextField)`
  fieldset {
    border-radius: 20px;
  }
`;


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ManageCreate() {
   const [selectedDate, setSelectedDate] = useState<Date | null>();
   const [rooms, setRooms] = useState<RoomInterface[]>([]);
   const [categorys, setCategorys] = useState<CategoryInterface[]>([]);
   const [sizes, setSizes] = useState<SizeInterface[]>([]);
   const [manages, setManages] = useState<Partial<ManageInterface>>({});
   const [stetus, setStetus] = useState<String>("");
   const [detail, setDetail] = useState<String>("");
   const [price, setPrice] = useState<String>("");




   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   const apiUrl = "http://localhost:8080";

   const requestOptions = {
      method: "GET",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
      },
   };

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
         return;
      }
      setSuccess(false);
      setError(false);
   };

   const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof manages;
      setManages({
         ...manages,
         [name]: event.target.value,
      });
      console.log(event.target.value);

      // if(name == "RoomID"){
      //   getSize(event.target.value)
      // }

   };


   // const getUsers = async () => {
   //   const uid = localStorage.getItem("uid");
   //   fetch(`${apiUrl}/user/${uid}`, requestOptions)
   //     .then((response) => response.json())
   //     .then((res) => {
   //       manages.UserID = res.data.ID
   //       if (res.data) {
   //           setUsers(res.data);
   //       } else {
   //         console.log("else");
   //       }
   //     });
   // };

   const getRoom = async () => {
      fetch(`${apiUrl}/rooms`, requestOptions)
         .then((response) => response.json())
         .then((res) => {
            if (res.data) {
               setRooms(res.data);
            } else {
               console.log("else");
            }
         });
   };

   const getCategory = async () => {
      fetch(`${apiUrl}/categories`, requestOptions)
         .then((response) => response.json())
         .then((res) => {
            if (res.data) {
               setCategorys(res.data);
            } else {
               console.log("else");
            }
         });
   };


   const getSize = async () => {
      fetch(`${apiUrl}/sizes`, requestOptions)
         .then((response) => response.json())
         .then((res) => {
            if (res.data) {
               setSizes(res.data);
            } else {
               console.log("else");
            }
         });
   };

   useEffect(() => {
      getRoom();
      getCategory();
      getSize();
   }, []);

   const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
   };

   function submit() {
      let data = {
         RoomID: convertType(manages.RoomID),
         CategoryID: convertType(manages.CategoryID),
         SizeID: convertType(manages.SizeID),
         Detail: detail,
         Price: price,
         Stetus: stetus,



      };

      console.log(data)

      const requestOptionsPost = {
         method: "POST",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      };

      fetch(`${apiUrl}/manages`, requestOptionsPost)
         .then((response) => response.json())
         .then((res) => {
            if (res.data) {
               console.log("บันทึกได้")
               setSuccess(true)
               setErrorMessage("")
            } else {
               console.log("บันทึกไม่ได้")
               setError(true)
               setErrorMessage(res.error)
            }
         });
   }

   return (
      <Container maxWidth="md" sx={{
         fontFamily: "PK Krung Thep Medium",
         fontSize: "20px"
         // fontStyle: "bold"
      }}>
         <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
         >
            <Alert onClose={handleClose} severity="success">
               บันทึกข้อมูลสำเร็จ
            </Alert>
         </Snackbar>
         <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
         >
            <Alert onClose={handleClose} severity="error">
               บันทึกข้อมูลไม่สำเร็จ
            </Alert>
         </Snackbar>
         <Paper sx={{
            borderRadius: 5,
            backgroundImage: 'url("https://coolhdwall.com/storage/202101/mountains-fog-hd-phone-wallpaper-1125x2436.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            bgcolor: '#e0f7fa'
         }}>
            <div style={{
               background: 'rgba(255, 255, 255, 0.5)',
               borderRadius: 20,

            }}>
               <Box
                  display="flex"
                  justifyContent="center"
                  sx={{
                     marginTop: 2,
                     borderRadius: 10
                  }}
               >
                  <Box sx={{ paddingX: 2, paddingY: 1 }}>
                     <Typography
                        component="h2"
                        variant="h6"
                        gutterBottom
                        sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: "30px"
                        }}
                     >
                        <b>การจัดการห้องพัก</b>

                     </Typography>
                  </Box>
               </Box>

               <Grid container spacing={3} sx={{ padding: 2 }}>

                  <Grid item xs={6}>
                     <FormControl fullWidth variant="outlined">
                        <Typography align="center"
                           sx={{
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: "25px",
                              fontWeight: "bold",
                           }}
                           variant="h6"
                           color="#212121"
                        >
                           <p>เลือกห้อง</p>
                        </Typography>

                        <Select sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: "20px",
                           fontWeight: "bold",
                        }}
                           style={{ borderRadius: "20px" }}
                           native
                           value={manages.RoomID + ""}
                           onChange={handleChange}
                           inputProps={{
                              name: "RoomID",
                           }}
                        >
                           <option aria-label="None" value="">
                              โปรดระบุ
                           </option>
                           {rooms.map((item: RoomInterface) => (
                              <option value={item.ID} key={item.ID}>
                                 {item.Number}
                              </option>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                     <FormControl fullWidth variant="outlined">
                        <Typography align="center"
                           sx={{
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: "25px",
                              fontWeight: "bold",
                           }}
                           variant="h6"
                           color="#212121"
                        >
                           <p>ขนาดห้อง</p>
                        </Typography>
                        <Select sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: "20px",
                           fontWeight: "bold",
                        }}
                           style={{ borderRadius: "20px" }}
                           native
                           onChange={handleChange}
                           inputProps={{
                              name: "SizeID",
                           }}
                        >

                           <option aria-label="None" value="">
                              โปรดระบุ
                           </option>
                           {sizes.map((item: SizeInterface) => (
                              <option value={item.ID} key={item.ID}>
                                 {item.Size}
                              </option>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                     <FormControl fullWidth variant="outlined">
                        <Typography align="center"
                           sx={{
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: "25px",
                              fontWeight: "bold",
                           }}
                           variant="h6"
                           color="#212121"
                        >
                           <p>ประเภทของห้อง</p>
                        </Typography>
                        <Select sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: "20px",
                           fontWeight: "bold",
                        }}
                           style={{ borderRadius: "20px" }}
                           native
                           placeholder=""
                           value={manages.CategoryID + ""}
                           onChange={handleChange}
                           inputProps={{
                              name: "CategoryID",
                           }}
                        >
                           <option aria-label="None" value="">
                              โปรดระบุ
                           </option>
                           {categorys.map((item: CategoryInterface) => (
                              <option value={item.ID} key={item.ID}>
                                 {item.Category}
                              </option>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                     <FormControl fullWidth variant="outlined">
                        <Typography align="center"
                           sx={{
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: "25px",
                              fontWeight: "bold",
                           }}
                           variant="h6"
                           color="#212121"
                        >
                           <p>ค่าเช่า</p>
                        </Typography>
                        <TextFielPrice
                           variant="outlined"
                           id="ManageID"
                           placeholder="ราคา"
                           inputProps={{
                              style: { fontFamily: "PK Krung Thep Medium", fontSize: 20, fontWeight: "bold" },
                           }}
                           onChange={(event) => setPrice(event.target.value)}
                        />
                     </FormControl>
                  </Grid>

                  <Grid item xs={6} >
                     <FormControl>
                        <Typography align="center"
                           sx={{
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: "25px",
                              fontWeight: "bold",
                           }}
                           variant="h6"
                           color="#212121"
                        >
                           <p>สิ่งอำนวยความสะดวก</p>
                        </Typography>
                        <RadioGroup
                           aria-labelledby="demo-controlled-radio-buttons-group"
                           name="controlled-radio-buttons-group"
                           onChange={(event) => setDetail(event.target.value)}
                           sx={{
                              fontFamily: "PK Krung Thep Medium",
                           }}
                        >
                           <FormControlLabel
                              value="ตู้เสื่อผ้า, เตียงนอน, เครื่องทำน้ำอุ่น, เก้าอี้(1), โต๊ะ(1)"
                              control={<Radio />} label={<Typography
                                 style={{ fontFamily: "PK Krung Thep Medium", fontSize: 18, fontWeight: "bold", }} >ตู้เสื่อผ้า, เตียงนอน, เครื่องทำน้ำอุ่น, เก้าอี้(1), โต๊ะ(1)</Typography>} />

                           <FormControlLabel value="ตู้เสื่อผ้า, เตียงนอน, เครื่องทำน้ำอุ่น, ตู้เย็น, wifi, เก้าอี้(1), โต๊ะ(1)"
                              control={<Radio />} label={<Typography
                                 style={{ fontFamily: "PK Krung Thep Medium", fontSize: 18, fontWeight: "bold", }}>ตู้เสื่อผ้า, เตียงนอน, เครื่องทำน้ำอุ่น, ตู้เย็น, wifi, เก้าอี้(1), โต๊ะ(1)</Typography>} />

                           <FormControlLabel value="ห้องนอนแยก, ตู้เสื่อผ้า, เตียงนอน, เครื่องทำน้ำอุ่น, ตู้เย็น, wifi, เก้าอี้(1), โต๊ะ(1), ไมโครเวฟ"
                              control={<Radio />} label={<Typography
                                 style={{ fontFamily: "PK Krung Thep Medium", fontSize: 18, fontWeight: "bold", }}>ห้องนอนแยก, ตู้เสื่อผ้า, เตียงนอน, เครื่องทำน้ำอุ่น, ตู้เย็น, wifi, เก้าอี้(1), โต๊ะ(1), ไมโครเวฟ</Typography>} />
                        </RadioGroup>
                     </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                     <FormControl fullWidth variant="outlined">
                        <Typography align="center"
                           sx={{
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: "25px",
                              fontWeight: "bold",
                           }}
                           variant="h6"
                           color="#212121"
                        >
                           <p>สถานะ</p>
                        </Typography>
                        <RadioGroup
                           sx={{
                              display: 'flex',
                              justifyContent: 'center',
                           }}
                           row
                           aria-labelledby="demo-controlled-radio-buttons-group"
                           name="controlled-radio-buttons-group"
                           onChange={(event) => setStetus(event.target.value)}
                        >
                           <FormControlLabel value="ว่าง" control={<Radio />} label={<Typography
                              style={{ fontFamily: "PK Krung Thep Medium", fontSize: 18, fontWeight: "bold", }}>ว่าง</Typography>} />
                           <FormControlLabel value="ไม่ว่าง" control={<Radio />} label={<Typography
                              style={{ fontFamily: "PK Krung Thep Medium", fontSize: 18, fontWeight: "bold", }}>ไม่ว่าง</Typography>} />
                        </RadioGroup>
                     </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                     <Button sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 20,
                        width: 100,
                        marginLeft: 5,
                        borderRadius: 10
                     }}
                        component={RouterLink}
                        to="/manages"
                        variant="contained"
                        color="inherit"
                     >
                        <b>กลับ</b>
                     </Button>
                     <Button sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 20,
                        width: 100,
                        marginRight: 5,
                        borderRadius: 10
                     }}
                        style={{ float: "right" }}
                        onClick={submit}
                        variant="contained"
                        color="primary"
                     >
                        <b>บันทึก</b>
                     </Button>
                  </Grid>
               </Grid>
            </div>
         </Paper>
      </Container>
   );
}

export default ManageCreate;