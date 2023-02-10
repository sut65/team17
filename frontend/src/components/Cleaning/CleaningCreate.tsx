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
import { FormHelperText, InputLabel } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { UserInterface } from "../../models/IUser";
import { RoomInterface } from "../../models/IRoom";
import { KindInterface } from "../../models/IKind";
import { AreaInterface } from "../../models/IArea";
import { CleaningInterface } from "../../models/ICleaning";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CleaningCreate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [users, setUsers] = useState<UserInterface>();
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [kinds, setKinds] = useState<KindInterface[]>([]);
  const [areas, setAreas] = useState<AreaInterface[]>([]);
  const [cleanings, setCleanings] = useState<Partial<CleaningInterface>>({});
  const [detail, setDetail] = useState<String>("");
  


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
    const name = event.target.name as keyof typeof cleanings;
    setCleanings({
      ...cleanings,
      [name]: event.target.value,
    });
    console.log(event.target.value);
    
  };


  const getUsers = async () => {
    const uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        cleanings.UserID = res.data.ID
        if (res.data) {
            setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

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
  const getKind = async () => {
    fetch(`${apiUrl}/kinds`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setKinds(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getArea = async () => {
    fetch(`${apiUrl}/areas`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAreas(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getUsers();
    getRoom();
    getKind();
    getArea();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
        UserID: convertType(cleanings.UserID),
        RoomID: convertType(cleanings.RoomID),
        KindID: convertType(cleanings.KindID),
        AreaID: convertType(cleanings.AreaID),
        CleaningTime: selectedDate,        
        Detail:    detail,

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

    fetch(`${apiUrl}/cleanings`, requestOptionsPost)
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
    <Container maxWidth="md" 
    sx={{
      fontFamily: "PK Krung Thep Medium",
      fontSize: "20px"
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
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "30px"
              }}
            >
              <b>บันทึกการจองทำความสะอาด</b>

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>ชื่อ - สกุล</p>
              <Select
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "16px"
              }}
                style={{borderRadius: "30px"}}
                native
                disabled
                value={cleanings.UserID + ""}
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
            <p>เบอร์โทรศัพท์</p>
              <Select
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "16px"
              }}
                style={{borderRadius: "30px"}}
                native
                disabled
                value={cleanings.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                <option value={users?.ID} key={users?.ID} >
                    {users?.Tel}
                    </option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกห้อง</p>
              <Select
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "16px"
              }}
                style={{borderRadius: "30px"}}  
                native
                labelId="RoomID"
                id="RoomID"
                label=""
                placeholder=""
                value={cleanings.RoomID + ""}
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
              <p>เลือกประเภทการทำความสะอาด</p>
              <Select
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "16px"
              }}
                style={{borderRadius: "30px"}}
                native
                labelId="KindID"
                id="KindID"
                placeholder=""
                value={cleanings.KindID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "KindID",
                }}
              >
                <option aria-label="None" value="">
                  โปรดระบุ
                </option>
                {kinds.map((item: KindInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Kind}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกบริเวณที่ต้องการทำความสะอาด</p>
              <Select
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "16px"
              }}
                style={{borderRadius: "30px"}}
                native
                value={cleanings.AreaID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "AreaID",
                }}
                
              >
                <option aria-label="None" value="">
                  โปรดระบุ
                </option>
                {areas.map((item: AreaInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Area}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
      
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                 value={selectedDate}
                 onChange={(newValue) => setSelectedDate(newValue)}
                //  minDate={(new Date('31-12-2022T09:00'))}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
           <p>เพิ่มเติม</p>
            <TextField
            sx={{
              fontFamily: "PK Krung Thep Medium", 
              fontSize:17
            }}
                id="CleaningID"
                label=""
                rows={2}
                placeholder=""
                multiline
                onChange={(event) => setDetail(event.target.value)}
            />
            <FormHelperText error>*ไม่จำเป็นต้องระบุ</FormHelperText>
           </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
            sx={{
              fontFamily: "PK Krung Thep Medium", 
              fontSize:17
            }}
              component={RouterLink}
              to="/cleanings"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
            sx={{
              fontFamily: "PK Krung Thep Medium", 
              fontSize:17
            }}
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

export default CleaningCreate;