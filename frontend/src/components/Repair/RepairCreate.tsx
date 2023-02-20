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

import { UserInterface } from "../../models/IUser";
import { ResidentInterface } from "../../models/IResident";
import { ObjectInterface } from "../../models/IObject";

import { RepairInterface } from "../../models/IRepair";

import { FormHelperText, InputLabel } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RepairCreate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
  const [users, setUsers] = useState<UserInterface>();
  const [residents, setResidents] = useState<ResidentInterface[]>([]);
  const [objects, setObjects] = useState<ObjectInterface[]>([]);
  const [details, setDetails] = useState<String>("");
  const [repairs, setRepairs] = useState<Partial<RepairInterface>>({});
  


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
    const name = event.target.name as keyof typeof repairs;
    setRepairs({
      ...repairs,
      [name]: event.target.value,
    });
    console.log(event.target.value);
    
    // if(name == "SymptomID"){
    //   getDepartment(event.target.value)
    // }
    
  };

  // const handleChange = (
  //   event: SelectChangeEvent<number>
  // ) => {
  //   const name = event.target.name as keyof typeof symptoms;
  //   setSymptoms({
  //     ...symptoms,
  //     [name]: event.target.value,
  //   });
  // };


  const getUsers = async () => {
    const uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        repairs.UserID = res.data.ID
        if (res.data) {
            setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getResident = async () => {
    fetch(`${apiUrl}/residents`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setResidents(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getObject = async () => {
    fetch(`${apiUrl}/objects`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setObjects(res.data);
        } else {
          console.log("else");
        }
      });
  };

  

  useEffect(() => {
    getUsers();
    getResident();
    getObject();
    
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
        UserID:     convertType(repairs.UserID),
        ResidentID: convertType(repairs.ResidentID),
        ObjectID:   convertType(repairs. ObjectID),
        Detail:     details,
        Repairtime: selectedDate
        

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

    fetch(`${apiUrl}/repairs`, requestOptionsPost)
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
          {errorMessage}
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
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการแจ้งซ่อม

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>ชื่อ - สกุล</p>
              <Select
                native
                disabled
                value={repairs.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                <option value={users?.ID} key={users?.ID} >
                    {users?.Name}
                    </option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>ห้อง</p>
              <Select
                native
                value={repairs.ResidentID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ResidentID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {residents.map((item: ResidentInterface) => (
                <option value={item.ID} key={item.ID}>
                    {item.Manage.Room.Number}
                </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกเฟอร์นิเจอร์ที่จะแจ้งซ่อม</p>
              <Select
                native
                
                onChange={handleChange}
                inputProps={{
                  name: "ObjectID",
                }}
                
              >
                <option aria-label="None" value="">
                </option>
                {objects.map((item: ObjectInterface) => (
                <option value={item.ID} key={item.ID}>
                    {item.Name}
                </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>ระบุรายละเอียดเพิ่มเติม</p>
              <TextField
                  id="ResidentID"
                  multiline
                  label="ระบุรายละเอียดเพิ่มเติม"
                  onChange={(event) => setDetails(event.target.value)}
              />
            </FormControl>
            </Grid>


            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่แจ้งซ่อม</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                   disabled
                  label="เดือน/วัน/ปี"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={(new Date())}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
         
          


        
          
          
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/repairs"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
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

export default RepairCreate;




