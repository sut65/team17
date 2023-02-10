import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styled from "@emotion/styled";
import { CalendarPicker, MonthPicker, YearPicker } from "@mui/x-date-pickers";
import { useParams } from "react-router-dom";

import { UserInterface } from "../../models/IUser";
import { ResidentInterface } from "../../models/IResident";
import { LeaseInterface } from "../../models/ILease";
import { ManageInterface } from "../../models/IManage";

export const TextFieldBail = styled(TextField)`
  fieldset {
    border-radius: 20px;
  }
`;


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ResidentUpdate() {
   const { id } = useParams();
   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
   const [users, setUsers] = useState<UserInterface[]>([]);
   const [leases, setLeases] = useState<LeaseInterface[]>([]);
   const [manages, setManages] = useState<ManageInterface[]>([]);
   const [residents, setResidents] = useState<Partial<ResidentInterface>>({});
   const [bail, setBail] = useState<String>("5000");

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
      const name = event.target.name as keyof typeof residents;
      setResidents({
         ...residents,
         [name]: event.target.value,
      });
      console.log(event.target.value);

   };


   const getLease = async () => {
      fetch(`${apiUrl}/leases`, requestOptions)
         .then((response) => response.json())
         .then((res) => {
            if (res.data) {
               setLeases(res.data);
            } else {
               console.log("else");
            }
         });
   };

   const getUsers = async () => {
      fetch(`${apiUrl}/users`, requestOptions)
         .then((response) => response.json())
         .then((res) => {
            if (res.data) {
               setUsers(res.data);
            } else {
               console.log("else");
            }
         });
   };

   const getManages = async () => {
      fetch(`${apiUrl}/manages`, requestOptions)
         .then((response) => response.json())
         .then((res) => {
            if (res.data) {
               setManages(res.data);
            } else {
               console.log("else");
            }
         });
   };

   useEffect(() => {
      getLease();
      getUsers();
      getManages();
   }, []);

   const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
   };

   function updateResident() {
      let data = {
         ID: convertType(id),
         UserID: convertType(residents.UserID),
         LeaseID: convertType(residents.LeaseID),
         ManageID: convertType(residents.ManageID),
         Bail: bail,
         LeaseTime: selectedDate,


      };

      console.log(data)

      const requestOptionsUpdate = {
         method: "PATCH",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      };

      fetch(`${apiUrl}/residents`, requestOptionsUpdate)
         .then((response) => response.json())
         .then((res) => {
            if (res.data) {
               console.log("บันทึกได้")
               setErrorMessage("")
               setTimeout(() => {
                  window.location.reload();
               }, 1000);
               setSuccess(true)
               window.location.href = "/residents";
            } else {
               console.log("บันทึกไม่ได้")
               setError(true)
               setErrorMessage(res.error)
            }
         });


   }

   return (
      <div>
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

         <Box
            display="flex"
            justifyContent="center"
            sx={{
               marginTop: 2,
            }}
         >
            <Box sx={{ paddingX: 2, paddingY: 1 }}>
               <Typography
                  sx={{
                     fontFamily: "PK Krung Thep Medium",
                     fontSize: 40,
                  }}
                  component="h2"
                  variant="h4"
                  gutterBottom
               >
                  <b>บันทึกการทำสัญญาเช่า</b>

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
                     <b>ระบุชื่อผู้เช่า</b>
                  </Typography>
                  <Select sx={{
                     fontFamily: "PK Krung Thep Medium",
                     fontSize: "20px",
                     fontWeight: "bold",
                  }}
                     style={{ borderRadius: "20px" }}
                     native
                     value={residents.UserID + ""}
                     onChange={handleChange}
                     inputProps={{
                        name: "UserID",
                     }}
                  >
                     <option aria-label="None" value="">
                        เลือก
                     </option>
                     {/* <option value={users?.ID} key={users?.ID}>
                      {users?.Name}
                  </option> */}
                     {users.map((item: UserInterface) => (
                        <option value={item.ID} key={item.ID}>
                           {item.Name}
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
                     <b>เบอร์โทรศัพท์</b>
                  </Typography>
                  <Select sx={{
                     fontFamily: "PK Krung Thep Medium",
                     fontSize: "20px",
                     fontWeight: "bold",
                  }}
                     style={{ borderRadius: "20px" }}
                     disabled
                     native
                     value={residents.UserID + ""}
                     onChange={handleChange}
                     inputProps={{
                        name: "UserID",
                     }}
                  >
                     <option aria-label="None" value="">
                     </option>
                     {/* <option value={users?.ID} key={users?.ID}>
                      {users?.Tel}
                  </option> */}
                     {users.map((item: UserInterface) => (
                        <option value={item.ID} key={item.ID}>
                           {item.Tel}
                        </option>
                     ))}
                  </Select>
               </FormControl>
            </Grid>
         </Grid>



         <Typography
            align="center"
            sx={{
               fontFamily: "PK Krung Thep Medium",
               fontSize: 22,
               fontWeight: "bold",
            }}
         >
            <h2>
               <b>ข้อมูลห้องพัก</b>
            </h2>

            <Grid container spacing={3} sx={{ padding: 2 }}>
               <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                     <p>เลือกห้อง</p>
                     <Select sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: "20px",
                        fontWeight: "bold",
                     }}
                        style={{ borderRadius: "20px" }}
                        native
                        value={residents.ManageID + ""}
                        onChange={handleChange}
                        inputProps={{
                           name: "ManageID",
                        }}
                     >
                        <option aria-label="None" value="">
                           เลือกห้อง
                        </option>
                        {manages.map((item: ManageInterface) => (
                           <option value={item.ID} key={item.ID}>
                              {item.Room.Number}
                           </option>
                        ))}
                     </Select>
                  </FormControl>
               </Grid>



               <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                     <p>ขนาดห้อง</p>
                     <Select sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: "20px",
                        fontWeight: "bold",
                     }}
                        style={{ borderRadius: "20px" }}
                        native
                        disabled
                        value={residents.ManageID + ""}
                        onChange={handleChange}
                        inputProps={{
                           name: "ManageID",
                        }}
                     >
                        <option aria-label="None" value="">
                        </option>
                        {manages.map((item: ManageInterface) => (
                           <option value={item.ID} key={item.ID}>
                              {item.Size.Size}
                           </option>
                        ))}
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                     <p>ประเภทห้อง</p>
                     <Select sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: "20px",
                        fontWeight: "bold",
                     }}
                        style={{ borderRadius: "20px" }}
                        native
                        disabled
                        value={residents.ManageID + ""}
                        onChange={handleChange}
                        inputProps={{
                           name: "ManageID",
                        }}
                     >
                        <option aria-label="None" value="">
                        </option>
                        {manages.map((item: ManageInterface) => (
                           <option value={item.ID} key={item.ID}>
                              {item.Category.Category}
                           </option>
                        ))}
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                     <p>ราคา</p>
                     <Select sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: "20px",
                        fontWeight: "bold",
                     }}
                        style={{ borderRadius: "20px" }}
                        native
                        disabled
                        value={residents.ManageID + ""}
                        onChange={handleChange}
                        inputProps={{
                           name: "ManageID",
                        }}
                     >
                        <option aria-label="None" value="">
                        </option>
                        {manages.map((item: ManageInterface) => (
                           <option value={item.ID} key={item.ID}>
                              {item.Price}
                           </option>
                        ))}
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                     <p>สัญญาเช่า</p>
                     <Select sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: "20px",
                        fontWeight: "bold",
                     }}
                        style={{ borderRadius: "20px" }}
                        native
                        placeholder=""
                        value={residents.LeaseID + ""}
                        onChange={handleChange}
                        inputProps={{
                           name: "LeaseID",
                        }}
                     >
                        <option aria-label="None" value="">
                           โปรดระบุ
                        </option>
                        {leases.map((item: LeaseInterface) => (
                           <option value={item.ID} key={item.ID}>
                              {item.Lease}
                           </option>
                        ))}
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                     <p>เงินประกัน</p>
                     <TextFieldBail
                        variant="outlined"
                        id="ResidentID"
                        defaultValue="5000"
                        multiline
                        inputProps={{
                           style: { fontFamily: "PK Krung Thep Medium", fontSize: 18, fontWeight: "bold", },
                        }}
                        onChange={(event) => setBail(event.target.value)}
                     />
                  </FormControl>
               </Grid>

               <Grid item xs={2}>
                  <FormControl fullWidth variant="outlined">
                     <p>ปีที่ทำสัญญา</p>
                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{        // จัด center
                           display: 'flex',
                           justifyContent: 'center',
                        }}>
                           <YearPicker

                              date={selectedDate}
                              onChange={(newValue) => setSelectedDate(newValue)}
                              minDate={(new Date)}
                              maxDate={(new Date('2023-12-31'))}

                           />
                        </Box>

                     </LocalizationProvider>
                  </FormControl>
               </Grid>

               <Grid item xs={5}>
                  <FormControl fullWidth variant="outlined">
                     <p>ระบุเดือนที่ทำสัญญา</p>
                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MonthPicker
                           date={selectedDate}
                           onChange={(newValue) => setSelectedDate(newValue)}
                           minDate={(new Date)}
                           maxDate={(new Date('2023-12-31'))}
                        />
                     </LocalizationProvider>
                  </FormControl>
               </Grid>

               <Grid item xs={5}>
                  <FormControl fullWidth variant="outlined">
                     <p>วันที่ทำสัญญา</p>
                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <CalendarPicker
                           date={selectedDate}
                           onChange={(newValue) => setSelectedDate(newValue)}
                           minDate={(new Date)}
                           maxDate={(new Date('2023-12-31'))}
                        />
                     </LocalizationProvider>
                  </FormControl>
               </Grid>
            </Grid>
         </Typography>

         <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={12}>
               <Button sx={{
                  fontFamily: "PK Krung Thep Medium",
                  fontSize: 20,
                  width: 100,
                  marginLeft: 5,
                  borderRadius: 10
               }}
                  component={RouterLink}
                  to="/residents"
                  variant="contained"
                  color="inherit"

               >
                  <b>กลับ</b>
               </Button>

               <Button sx={{
                  fontFamily: "PK Krung Thep Medium",
                  fontSize: 20,
                  width: 'auto',
                  marginRight: 5,
                  borderRadius: 10
               }}
                  style={{ float: "right" }}
                  onClick={(updateResident)}
                  variant="contained"
                  color="success"
               >
                  <b>แก้ไขข้อมูล</b>
               </Button>
            </Grid>
         </Grid>
      </div>
   )

}
export default ResidentUpdate;