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

import { ManageInterface } from "../../models/IManage";
import { AdminInterface } from "../../models/IAdmin";
import { MeterInterface } from "../../models/IMeter";
import { UserInterface } from "../../models/IUser";

import { InputLabel } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})


function BookingCreate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [admins, setAdmins] = useState<AdminInterface>();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [manage, setManages] = useState<ManageInterface[]>([]);
  const [meters, setMeters] = useState<Partial<MeterInterface>>({});
  const [befores, setBefores] = useState<string>("");
  const [afters, setAfters] = useState<string>("");
  const [units, setUnits] = useState<string>("7");
  const [electric, setElectronics] = useState<string>("");
  const [waters, setWaters] = useState<string>("100");
  const [totals, setTotals] = useState<string>("");
  
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

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof meters;
    setMeters({
      ...meters,
      [name]: event.target.value,
    });
  };

  // const  handledoctorChange  = (
  //   event: React.ChangeEvent<{ name?: string; value: any }>
  // ) => {   
  //   const name = event.target.name as keyof typeof schedules;
  //   setSchedules({
  //     ...schedules,
  //     [name]: Number(event.target.value),
  //   });   
  // };



  const getAdmins = async () => {
    const uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/admin/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        meters.AdminID = res.data.ID
        if (res.data) {
            setUsers(res.data);
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

  const getManage = async () => {
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

    getUsers();
    getAdmins();
    getManage();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {

        UserID: convertType(meters.UserID),
        AdminID: convertType(meters.AdminID),
        ManageID: convertType(meters.ManageID),
        Before: Number(befores),
        After: Number(afters),
        Total: Number(totals),
        Unit: Number(units),
        Electric: Number(electric),
        Water: Number(waters),

        Metertime: moment(),  

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

    fetch(`${apiUrl}/meters`, requestOptionsPost)
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
    <Container sx={{ marginTop: 2 }} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Paper sx={{ padding: 2, color: "text.secondary" }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h6"
              variant="h5"
              color="primary"
              gutterBottom
              
            >
              บันทึกการจดมิเตอร์

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3}  sx={{ flexGrow: 1 }}>

            {/* <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <Select
                    native
                    disabled
                    value={meters.AdminID}
                    // label="ชื่อ - นามสกุล"
                    onChange={handleChange}
                    inputProps={{
                    name: "AdminID",
                    }}
                > 

                    <option value={admins?.ID} key={admins?.ID} >                 
                    {admins?.Name}                                                 
                    </option>
                    
                </Select>
                </FormControl>
            </Grid> */}

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="ManageID">ห้อง</InputLabel>
                <Select
                    native
                    value={meters.ManageID}
                    onChange={handleChange}
                    inputProps={{
                    name: "ManageID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {manage.map((item: ManageInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Room.Number}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="UserID">ผู้เช่า</InputLabel>
                <Select
                    native
                    value={meters.UserID}
                    label="ระบุผู้เช่า"
                    onChange={handleChange}
                    inputProps={{
                    name: "UserID",
                    }}//
                >
                    <option aria-label="None" value="">
                    </option>
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
                <InputLabel id="ManageID">ค่าเช่าห้อง</InputLabel>
                <Select
                    native
                    value={meters.ManageID}
                    onChange={handleChange}
                    inputProps={{
                    name: "ManageID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {manage.map((item: ManageInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Price}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            
            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
              <p>มิเตอร์ครั้งก่อน</p>
                <TextField
                    variant="filled"
                    id="MeterID"
                    // placeholder="มิเตอร์ครั้งก่อน"
                    onChange={(event) => setBefores(event.target.value)}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
              <p>มิเตอร์ที่จดได้</p>
                <TextField
                    variant="filled"
                    id="MeterID"
                    placeholder="ระบุ..."
                    onChange={(event) => setAfters(event.target.value)}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={2}>
              <Button
                variant="contained"
                onClick={() => {
                  setTotals((Number(afters) - Number(befores)).toString())
                }}
              >
                คำนวนมิเตอร์
              </Button>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
              <p>จำนวนหน่วยที่ใช้</p>
                <TextField
                    variant="filled"
                    id="MeterID"
                    value={totals}
                    onChange={(event) => setTotals(event.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
              <p>ราคาต่อหน่วย</p>
                <TextField
                    variant="filled"
                    id="MeterID"
                    defaultValue={"7"}
                    onChange={(event) => setUnits(event.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <Button
                variant="contained"
                onClick={() => {
                  setElectronics((Number(totals)*Number(units)).toString())
                }}
              >
                คำนวนค่าไฟ
              </Button>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
              <p>ค่าไฟ</p>
                <TextField
                    variant="filled"
                    id="MeterID"
                    value={electric}
                    onChange={(event) => setElectronics(event.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
              <p>ค่าน้ำ(เหมาจ่าย)</p>
                <TextField
                    variant="filled"
                    id="MeterID"
                    defaultValue={"100"}
                    onChange={(event) => setWaters(event.target.value)}
                />
              </FormControl>
            </Grid>
           

            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่ทำสัญญา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  disabled
                  label="เดือน/วัน/ปี"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={(new Date('2022-12-20'))}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/meters"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
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

export default BookingCreate;