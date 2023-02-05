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


import { UserInterface } from "../models/IUser";
import { AdminInterface } from "../models/IAdmin";
import { RoomInterface } from "../models/IRoom";
import { EquipmentInterface } from "../models/IEquipment";
import { AmountInterface } from "../models/IAmount";
import { FurnitureInterface } from "../models/IFurniture";

function FurnitureCreate() {
  const [SelectedDate, setSelectedDate] = useState<Date | null>();
  const [Admins, setAdmins] = useState<AdminInterface>();
  const [Users, setUsers] = useState<UserInterface[]>([]);
  const [Rooms, setRooms] = useState<RoomInterface[]>([]);
  const [Equipments, setEquipments] = useState<EquipmentInterface[]>([]);
  const [Amounts, setAmounts] = useState<AmountInterface[]>([]);
  const [Totals, setTotals] = useState<string>("");
  const [Prices, setPrices] = useState<string>("");
  const [Furnitures, setFurnitures] = useState<Partial<FurnitureInterface>>({});
  const [Success, setSuccess] = useState(false);
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
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
    const name = event.target.name as keyof typeof Furnitures;
    setFurnitures({
      ...Furnitures,
      [name]: event.target.value,
    });
    console.log(event.target.value);

    if(name=='EquipmentID'){
      // setPrices(item.)
    }

  };


  const getUsers = async () => {
    fetch(`${apiUrl}/users`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        Furnitures.UserID = res.data.ID
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

  const getAmount = async () => {
    fetch(`${apiUrl}/amounts`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAmounts(res.data);
        } else {
          console.log("else");
        }
      });
        // setTotals((Number(equipments.Price)));
  };

  const getEquipment = async () => {
    fetch(`${apiUrl}/equipment`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setEquipments(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getUsers();
    getRoom();
    getEquipment();
    getAmount();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    const Amountselect = Amounts.find(item => item.ID === Number(Furnitures.AmountID))
    console.log(Amounts," ",Furnitures.AmountID)
    const Equipmentselect = Equipments.find(item => item.ID === Number(Furnitures.EquipmentID))
    console.log(Equipmentselect)
    const total = Number(Amountselect?.Amount)*Number(Equipmentselect?.Price)
    let data = {
        UserID: convertType(Furnitures.UserID),
        RoomID: convertType(Furnitures.RoomID),
        EquipmentID: convertType(Furnitures.EquipmentID),
        AmountID: convertType(Furnitures.AmountID),
        furnitureTime: SelectedDate,        
        Total: total
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

    fetch(`${apiUrl}/furnitures`, requestOptionsPost)
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
        open={Success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={Error}
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
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกเบิกจ่ายอุปกรณ์ในห้องพัก

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
                value={Furnitures.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {Users.map((item: UserInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>เบอร์โทรศัพท์</p>
              <Select
                native
                disabled
                value={Furnitures.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                  <option aria-label="None" value="">
                </option>
                {Users.map((item: UserInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Tel}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกห้อง</p>
              <Select
                native
                labelId="RoomID"
                id="RoomID"
                label=""
                placeholder=""
                value={Furnitures.RoomID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoomID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {Rooms.map((item: RoomInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Number}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกเฟอร์นิเจอร์</p>
              <Select
                native
                labelId="EquipmentID"
                id="EquipmentID"
                placeholder=""
                value={Furnitures.EquipmentID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EquipmentID",
                }}
                >
                <option aria-label="None" value="">
                </option>
                {Equipments.map((item: EquipmentInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Equipment}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกจำนวน</p>
              <Select
                native
                value={Furnitures.AmountID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "AmountID",
                }}
                
              >
                <option aria-label="None" value="">
                </option>
                {Amounts.map((item: AmountInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Amount}
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
                labelId="EquipmentID"
                id="EquipmentID"
                placeholder=""
                value={Furnitures.EquipmentID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EquipmentID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {Equipments.map((item: EquipmentInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Price}
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
                 value={SelectedDate}
                 onChange={(newValue) => setSelectedDate(newValue)}
                //  minDate={(new Date('31-12-2022T09:00'))}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>       
        </Grid>
        <Grid container spacing={3} sx={{padding:2}}> 
        <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/furnitures"
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
//dw
export default FurnitureCreate;