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
import { useParams } from "react-router-dom";

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


function MeterUpdate() {
    const { id } = useParams();
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
            // setUsers(res.data);
            setAdmins(res.data)
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

  function update() {
    let data = {

        ID: convertType(id),
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
      method: "PATCH",
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
    <Box
      sx={{
        backgroundImage:
          "url(https://i.pinimg.com/564x/9a/a0/78/9aa0784482ad21f5b5f9604755c38d29.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // background: '#e0e0e0',
        width: "100%",
        height: "100%",
        fontFamily: "PK Krung Thep Medium",
        fontSize: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "25px 10% ",
      }}
    >
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

      <Box
        sx={{
          mt: "60px",
          mb: '10px',
          background: "rgba(217, 227, 240, 0.8)",
          //  width: '45%',
          //  height: '80%',
          padding: "25px",
          borderRadius: "20px",
          boxShadow: 20,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            height: "auto",
          }}
        >
          <Box sx={{ paddingX: 2 }}>
            <Typography
              gutterBottom
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "30px",
                color: "#0693e3",
              }}
            >
              <h1>
                <b>บันทึกการจดมิเตอร์</b>
              </h1>
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ flexGrow: 1, }}>
          {/* <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <Select
                    native
                    disabled
                    value={meters.AdminID}
                    // label="ชื่อ - นามสกุล"
                    onChange={handleChange}
                    inputProps={{map
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
              <InputLabel id="AdminID">ผู้บันทึกข้อมูล</InputLabel>
              <Select
                native
                value={admins?.ID || ""}
                label="ผู้บันทึกข้อมูล"
                onChange={handleChange}
                inputProps={{
                  name: "ManageID",
                }}
                disabled
              >
                <option aria-label="None" value=""></option>
                 <option value={admins?.ID} key={admins?.ID}>
                    {admins?.Name}
                  </option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="ManageID">ห้อง</InputLabel>
              <Select
                native
                value={meters.ManageID}
                label="ระบุห้อง"
                onChange={handleChange}
                inputProps={{
                  name: "ManageID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              {/* <InputLabel id="UserID">ผู้เช่า</InputLabel> */}
              <Typography>ผู้เช่า</Typography>
              <Select
                native
                value={meters.UserID}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }} //
              >
                <option aria-label="None" value=""></option>
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
              <Typography>ค่าเช่าห้อง</Typography>
              <Select
                native
                value={meters.ManageID}
                onChange={handleChange}
                inputProps={{
                  name: "ManageID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              <Typography>มิเตอร์ครั้งก่อน</Typography>
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
              <Typography>มิเตอร์ที่จดได้</Typography>
              <TextField
                variant="filled"
                id="MeterID"
                placeholder="ระบุ..."
                onChange={(event) => setAfters(event.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={() => {
                setTotals((Number(afters) - Number(befores)).toString());
              }}
            >
              คำนวนมิเตอร์
            </Button>
          </Grid>

          <Grid item xs={5} >
            <FormControl fullWidth variant="outlined">
              <Typography>จำนวนหน่วยที่ใช้</Typography>
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
              <Typography>ราคาต่อหน่วย</Typography>
              <TextField
                variant="filled"
                id="MeterID"
                defaultValue={"7"}
                onChange={(event) => setUnits(event.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={() => {
                setElectronics((Number(totals) * Number(units)).toString());
              }}
            >
              คำนวนค่าไฟ
            </Button>
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <Typography>ค่าไฟ</Typography>
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
              <Typography>ค่าน้ำ(เหมาจ่าย)</Typography>
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
              <Typography>วันที่</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  disabled
                  label="เดือน/วัน/ปี"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={new Date("2022-12-20")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button component={RouterLink} to="/meters" variant="contained">
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={update}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default MeterUpdate;