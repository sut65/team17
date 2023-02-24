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

import TextField from '@mui/material/TextField';

import { createStyles, FormHelperText, InputLabel } from "@material-ui/core";


import { RequestchangeInterface } from "../../models/IRequestchange";
import { FormControlLabel, FormLabel, RadioGroup, Radio, FormGroup, Theme } from "@mui/material";
import { ReasonInterface } from "../../models/IReason";
import { UserInterface } from "../../models/IUser";
import { RoomInterface } from "../../models/IRoom";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RequestchangeCreate() {

  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [reasons, setReasons] = useState<ReasonInterface[]>([]);
  const [users, setUsers] = useState<UserInterface>();
  const [details, setDetail] = useState<String>("");
  const [requestchanges, setRequestchanges] = useState<Partial<RequestchangeInterface>>({});


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
    const name = event.target.name as keyof typeof requestchanges;
    setRequestchanges({
      ...requestchanges,
      [name]: event.target.value,
    });
    console.log(event.target.value);



  };


  const getUsers = async () => {
    const uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        requestchanges.UserID = res.data.ID
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

  const getReason = async () => {
    fetch(`${apiUrl}/reasons`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setReasons(res.data);
        } else {
          console.log("else");
        }
      });
  };



  useEffect(() => {
    getUsers();
    getRoom();
    getReason();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      RoomID: convertType(requestchanges.RoomID),
      ReasonID: convertType(requestchanges.ReasonID),
      UserID: convertType(requestchanges.UserID),
      Detail: details,

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

    fetch(`${apiUrl}/requestchanges`, requestOptionsPost)
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
    <div style={{
      backgroundImage: "url(https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: '100%',
      fontFamily: "PK Krung Thep Medium",
      fontSize: 20,
      display: 'flex',
      justifyContent: 'center',
    }}>



      <Box sx={{

        mt: '100px',
        mb: '100px',
        minHeight: '50%',
        width: '80%',
        background: 'rgba(255, 255, 255, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 10,

      }}>

        <Box sx={{ width: "100%" }}>

          <Box display="flex" sx={{
            mt: "30px",
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
                    fontSize: "40px",
                    color: '#00000'
                  }}
                >
                  <b>แบบคำขอย้ายห้อง</b>

                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />



          <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={6} sx={{ fontFamily: "PK Krung Thep Medium", fontSize: "24px", color:"#000000" }}>
              <FormControl fullWidth variant="outlined">
                <p>ชื่อ - สกุล</p>
                <Select
                  sx={{
                    fontFamily: "PK Krung Thep Medium",
                    fontSize: "20px",
                    color: '#a81f1f',
                  }}
                  style={{ borderRadius: "30px" }}
                  native
                  value={requestchanges.UserID + ""}
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

            <Grid item xs={6} sx={{ fontFamily: "PK Krung Thep Medium", fontSize: "24px" }}>
              <FormControl fullWidth variant="outlined">
                <p>ห้องพัก</p>
                <Select sx={{
                  fontFamily: "PK Krung Thep Medium",
                  fontSize: "20px",
                  color: '#0f3d99',

                }}
                  style={{ borderRadius: "30px" }}
                  native
                  placeholder=""
                  value={requestchanges.RoomID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "RoomID",
                  }}
                >
                  <option aria-label="None" value="" >
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

            <Grid item xs={6} sx={{ fontFamily: "PK Krung Thep Medium", fontSize: "24px" }}>
              <FormControl fullWidth variant="outlined">
                <p>เหตุผล</p>
                <Select sx={{
                  fontFamily: "PK Krung Thep Medium",
                  fontSize: "20px",
                  color: '#0f3d99',
                }}
                  style={{ borderRadius: "30px" }}
                  native
                  placeholder="โปรดระบุ"
                  value={requestchanges.ReasonID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "ReasonID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือก
                  </option>
                  {reasons.map((item: ReasonInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Reason}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={6} sx={{ color: "red", fontFamily: "PK Krung Thep Medium", fontSize: "20px" }}>
              <p>หากอื่นๆโปรดระบุ (หากไม่ต้องการระบุใส่ -)</p>
              <FormControl fullWidth variant="outlined">
                <TextField
                  inputProps={{ style: {fontFamily: "PK Krung Thep Medium", fontSize: "20px"}}}
                  id="detail"
                  variant="outlined"
                  type="string"
                  size="medium"
                  placeholder="ไม่มี"
                  rows={4}
                  multiline
                  onChange={(event) => setDetail(event.target.value)}

                />
              </FormControl>
            </Grid>

          </Grid>

          <Box sx={{
            display: 'display-box',
            // justifyContent: 'center',
            height: "30%", 
            width: "95%",
            padding: "0px 20px 0px 40px"
            
          }}>

            <Button sx={{
              
              mt: '10%',
              width: "30%",
              fontFamily: "PK Krung Thep Medium",
              fontSize: 20,
              color: '#white',
              background: '#f54d4d',
              '&:hover': {
                background: "white",
                color: "#f54d4d",

              },

            }}
              style={{ borderRadius: "30px" }}
              component={RouterLink}
              to="/requestchanges"
              variant="contained"
              color="inherit"
            >
              <b>กลับ</b>
            </Button>




            <Button sx={{
              mt: '10%',
              width: "30%",
              fontFamily: "PK Krung Thep Medium",
              fontSize: 20,
              color: 'black',
              background: '#00b803',
              '&:hover': {
                background: "black",
                color: "#00b803",

              },
            }}
              style={{ float: "right", borderRadius: "30px" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              <b>บันทึก</b>
            </Button>



          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default RequestchangeCreate;