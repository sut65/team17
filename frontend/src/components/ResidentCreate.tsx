import React, { useEffect, useState } from "react";
import { Link as RouterLink, useActionData } from "react-router-dom";
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
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { FormControlLabel, FormLabel, RadioGroup, Radio, FormGroup, Theme } from "@mui/material";
// import { FormHelperText, InputLabel } from "@material-ui/core";

import { UserInterface } from "../models/IUser";
import { ResidentInterface } from "../models/IResident";
import { LeaseInterface } from "../models/ILease";
import { ManageInterface } from "../models/IManage";
import { now } from "moment";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 

function ResidentCreate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
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

  // const getUsers = async () => {
  //   const uid = localStorage.getItem("uid");
  //   fetch(`${apiUrl}/user/${uid}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       residents.UserID = res.data.ID
  //       if (res.data) {
  //           setUsers(res.data);
  //       } else {
  //         console.log("else");
  //       }
  //     });
  // };

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

  function submitResident() {
    let data = {
        UserID: convertType(residents.UserID),
        LeaseID: convertType(residents.LeaseID),
        ManageID: convertType(residents.ManageID),
        Bail:       bail,
        LeaseTime: selectedDate,
        

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

    fetch(`${apiUrl}/residents`, requestOptionsPost)
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
    <Container maxWidth="md">
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
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              sx={{ 
                fontFamily: "PK Krung Thep Medium",
              }} 
              component="h2"
              variant="h4"
              color="primary"
              gutterBottom
            >
              <b>บันทึกการทำสัญญาเช่า</b>

            </Typography>
          </Box>
        </Box>
        <Divider />




        <Box sx={{ p: 2, 
          bgcolor: '#e1f5fe'
          }}
        >
          <Typography 
            align="center"
            sx={{ 
              fontFamily: "PK Krung Thep Medium",
              fontSize: 20
            }} 
            color="primary"
          >
            <h1>
              ข้อมูลผู้ทำสัญญาเช่า
            </h1>
          </Typography>
          
            <Grid container spacing={3} sx={{ padding: 2 }}>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <Typography align="center"
                  sx={{ 
                    fontFamily: "PK Krung Thep Medium",
                  }} 
                  variant="h6"
                  color="#212121"
                >
                  <b>ระบุชื่อผู้เช่า</b>
                </Typography>
                <Select
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
                  }} 
                  variant="h6"
                  color="#212121"
                >
                  <b>เบอร์โทรศัพท์</b>
                </Typography>
                <Select
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
        </Box>

        
          
        <Typography
          align="center"
          sx={{ 
            fontFamily: "PK Krung Thep Medium",
            fontSize: 20
          }}
          // color="primary"
        >
          <h1>
            เลือกข้อมูลห้องพัก
          </h1>

          <Grid container spacing={3} sx={{ padding: 2 }}> 
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <p>เลือกห้อง</p>
                <Select
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
                <Select
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
                <Select
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
                <Select
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
                <Select
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
                  {leases.map((item:LeaseInterface) => (
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
              <TextField
                  id="ResidentID"
                  defaultValue="5000"
                  label="เงินประกัน"
                  onChange={(event) => setBail(event.target.value)}
              />
            </FormControl>
            </Grid>


            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่ทำสัญญา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // disabled
                  label="เดือน/วัน/ปี"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={(new Date('2022-12-20'))}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

            
            

            
          </Grid>
        </Typography>
        <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={12}>
              <Button
                component={RouterLink}
                to="/residents"
                variant="contained"
                color="inherit"
                
              >
                กลับ
              </Button>

              <Button
                style={{ float: "right" }}
                onClick={(submitResident)}
                variant="contained"
                color="primary"
              >
                บันทึก
              </Button>
            </Grid>
        </Grid>
        
        
      </Paper>
    </Container>
  );
}

export default ResidentCreate;