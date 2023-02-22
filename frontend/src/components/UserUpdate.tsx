import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// import {makeStyles, Theme,createStyles,} from "@mui/material/styles";
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { UserInterface } from "../models/IUser";
import { GenderInterface } from "../models/IGender";
import { StatusInterface } from "../models/IStatus";
import { TitleInterface } from "../models/ITitle";
import { FormHelperText, InputLabel } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";

import { useParams } from "react-router-dom";

// const Alert = (props: AlertProps) => {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// };

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     container: {
//       marginTop: theme.spacing(2),
//     },
//     paper: {
//       padding: theme.spacing(2),
//       color: theme.palette.text.secondary,
//     },
//   })
// );

function UserUpdate() {
  // const classes = useStyles();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [genders, setGenders] = useState<GenderInterface[]>([]);
  const [status, setStatus] = useState<StatusInterface[]>([]);
  const [titles, setTitles] = useState<TitleInterface[]>([]);
  const [users, setUsers] = useState<Partial<UserInterface>>({});
  const [name, setName] = useState<String>("");
  const [personal, setPersonal] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [tel, setTel] = useState<String>("");
  const [address, setAddress] = useState<String>("");
  const [password, setPassword] = useState<String>("");

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
    const name = event.target.name as keyof typeof users;
    setUsers({
      ...users,
      [name]: event.target.value,
    });
  };

  const getStatus = async () => {
    fetch(`${apiUrl}/statuses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStatus(res.data);
        } else {
          console.log("else", res);
        }
      });
  };

  const getGender = async () => {
    fetch(`${apiUrl}/genders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGenders(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getTitle = async () => {
    fetch(`${apiUrl}/titles`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTitles(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getUsersByID = async () => {
    const uid = localStorage.getItem("id");
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
       .then((response) => response.json())
       .then((res) => {
          users.ID = res.data.ID
          if (res.data) {
             setUsers(res.data);
          } else {
             console.log("else");
          }
       });
 };

  useEffect(() => {
    getStatus();
    getGender();
    getTitle();
    getUsersByID();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function update() {
      let data = {
      Role: "user",
      ID: convertType(id),
      StatusID: convertType(users.StatusID),
      GenderID: convertType(users.GenderID),
      TitleID: convertType(users.TitleID),
      BirthdayTime: selectedDate,
      Name: name,
      Personal: personal,
      Email: email,
      Tel: tel,
      Address: address,
      Password: password,
    };

    console.log(data)

    const requestOptionsPatch = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/users`, requestOptionsPatch)
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
  console.log("users", users)

  return (
    <Container sx={{ marginTop: 10 }} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ: {errorMessage}
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
              บันทึกข้อมูลผู้เช่า

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="TitleID">เลือกคำนำหน้า</InputLabel>
              <Select
                native
                value={users.TitleID}
                label="กรุณาเลือก..."
                onChange={handleChange}
                inputProps={{
                  name: "TitleID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {titles.map((item: TitleInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <TextField
                label="กรอกชื่อ-สกุล"
                required
                id="outlined-required"

                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <TextField
                label="กรอกเลขบัตรประชาชน"
                required
                id="outlined-required"

                onChange={(event) => setPersonal(event.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="เลือกวัน/เดือน/ปีเกิด"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  // minDate={(new Date)}
                  renderInput={(params) =>
                    <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="GenderID">เลือกเพศ</InputLabel>
              <Select
                native
                value={users.GenderID}
                label="กรุณาเลือก..."
                onChange={handleChange}
                inputProps={{
                  name: "GenderID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {genders.map((item: GenderInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="StatusID">เลือกสถานภาพการสมรส</InputLabel>
              <Select
                native
                value={users.StatusID}
                label="กรุณาเลือก..."
                onChange={handleChange}
                inputProps={{
                  name: "StatusID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {status.map((item: StatusInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <TextField
                label="กรอกอีเมล"
                required
                id="outlined-required"

                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <TextField
                label="กรอกรหัสผ่าน"
                required
                id="outlined-required"

                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <TextField
                label="กรอกเบอร์โทรศัพท์"
                required
                id="outlined-required"

                onChange={(event) => setTel(event.target.value)}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <TextField
                label="กรอกที่อยู่ตามทะเบียนบ้าน"
                required
                id="outlined-required"

                onChange={(event) => setAddress(event.target.value)}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/users"
              variant="contained"
            >
              กลับ
            </Button>
           
            <Button sx={{ 
              fontFamily: "PK Krung Thep Medium", 
              fontSize:17

            }}
              style={{ float: "right"}}
              onClick={update}
              variant="contained"
              color="primary"
            >
              <b>แก้ไขข้อมูล</b>
            </Button>

          </Grid>
        </Grid>
      </Paper>
    </Container>

  );
}

export default UserUpdate;