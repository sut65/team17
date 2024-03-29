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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { FormHelperText, InputLabel } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useParams } from "react-router-dom";

import { UserInterface } from "../../models/IUser";
import { RoomInterface } from "../../models/IRoom";
import { KindInterface } from "../../models/IKind";
import { AreaInterface } from "../../models/IArea";
import { CleaningInterface } from "../../models/ICleaning";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CleaningUpdate() {
  const { id } = useParams();
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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
        cleanings.UserID = res.data.ID;
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

  const getCleaningsByID = async () => {
    const uid = localStorage.getItem("id");
    fetch(`${apiUrl}/clening/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        cleanings.ID = res.data.ID;
        if (res.data) {
          setCleanings(res.data);
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
    getCleaningsByID();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function update() {
    let data = {
      ID: convertType(id),
      UserID: convertType(cleanings.UserID),
      RoomID: convertType(cleanings.RoomID),
      KindID: convertType(cleanings.KindID),
      AreaID: convertType(cleanings.AreaID),
      CleaningTime: selectedDate,
      Detail: detail,
    };

    console.log(data);

    const requestOptionsUpdate = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/cleanings`, requestOptionsUpdate)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้");
          setErrorMessage("");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          setSuccess(true);
          window.location.href = "/cleanings";
        } else {
          console.log("บันทึกไม่ได้");
          setError(true);
          setErrorMessage(res.error);
        }
      });
  }

  return (
    <Box
    sx={{
      backgroundImage:
        "url(https://images.hdqwalls.com/download/white-cube-pattern-4k-bu-1920x1080.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
      
      <Box
        sx={{
          fontFamily: "PK Krung Thep Medium",
          fontSize: "20px",
          width: "90%",
          mt: "70px",
          bgcolor: 'rgba(190, 190, 190, 0.8)',
          borderRadius: "30px",
          boxShadow: 20,
          
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
          display="flex"
          sx={{
            // marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              color="primary"
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "30px",
                marginX: "30px",
                mt: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <b>บันทึกการจองทำความสะอาด</b>
            </Typography>
          </Box>
        </Box>
        {/* <Divider /> */}

        <Grid container spacing={1} sx={{ paddingX: 8 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อ - สกุล</p>
              <Select
                sx={{
                  fontFamily: "PK Krung Thep Medium",
                  fontSize: "16px",
                }}
                style={{ borderRadius: "30px" }}
                native
                disabled
                value={cleanings.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                <option value={users?.ID} key={users?.ID}>
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
                  fontSize: "16px",
                }}
                style={{ borderRadius: "30px" }}
                native
                disabled
                value={cleanings.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                <option value={users?.ID} key={users?.ID}>
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
                  fontSize: "16px",
                }}
                style={{ borderRadius: "30px" }}
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
                  fontSize: "16px",
                }}
                style={{ borderRadius: "30px" }}
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
                  fontSize: "16px",
                }}
                style={{ borderRadius: "30px" }}
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
                  minDate={new Date()}
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
                  fontSize: 17,
                }}
                id="CleaningID"
                label=""
                rows={2}
                placeholder=""
                multiline
                onChange={(event) => setDetail(event.target.value)}
              />
              <FormHelperText error></FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: 15,
                mb: "10px",
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
                fontSize: 15,
                mb: "10px",
              }}
              style={{ float: "right" }}
              onClick={update}
              variant="contained"
              color="primary"
            >
              <b>แก้ไขข้อมูล</b>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CleaningUpdate;
