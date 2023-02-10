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

import { MeterInterface } from "../../models/IMeter";
import { AdminInterface } from "../../models/IAdmin";
import { FurnitureInterface } from "../../models/IFurniture";
import { BillInterface } from "../../models/IBill";

import { InputLabel } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BillCreate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [admins, setAdmins] = useState<AdminInterface>();
  const [furnitures, setFurnitures] = useState<FurnitureInterface[]>([]);
  const [meters, setMeters] = useState<MeterInterface[]>([]);
  const [bills, setBills] = useState<Partial<BillInterface>>({});
  const [costs, setCosts] = useState<string>("");

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
    const name = event.target.name as keyof typeof bills;
    setBills({
      ...bills,
      [name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const getMeters = async () => {
    fetch(`${apiUrl}/meters`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMeters(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getFurniture = async () => {
    fetch(`${apiUrl}/furnitures`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setFurnitures(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const totalvalue = () => {
    const room = meters.find((item) => item.ID === bills.MeterID);
    console.log(
      Number(room?.Manage.Price) + Number(room?.Water) + Number(room?.Electric)
    );
  };

  useEffect(() => {
    getMeters();
    getFurniture();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      MeterID: convertType(bills.MeterID),
      FurnitureID: convertType(bills.FurnitureID),
      Cost: Number(costs),
      BillTime: selectedDate,
    };
    console.log("DATA", data);

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/bills`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้");
          console.log(res.data)
          setSuccess(true);
          setErrorMessage("");
        } else {
          console.log("บันทึกไม่ได้");
          setError(true);
          setErrorMessage(res.error);
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
              บันทึกบิลชำระค่าเช่า
            </Typography>
          </Box>
        </Box>
        <Divider />
      </Paper>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              disabled
              variant="outlined"
              value={bills.AdminID + ""}
              // label="ชื่อ - นามสกุล"
              onChange={handleChange}
              inputProps={{
                name: "AdminID",
              }}
            >
              <option value={admins?.ID} key={admins?.ID}>
                {admins?.Name}
              </option>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>เลขห้อง</p>
            {/* <InputLabel id="MeterID">ห้อง</InputLabel> */}
            <Select
              native
              variant="outlined"
              value={bills.MeterID + ""}
              // label="ห้อง"
              onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Manage.Room.Number}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ผู้เช่า</p>
            {/* <InputLabel id="MeterID">ผู้เช่า</InputLabel> */}
            <Select
              native
              variant="outlined"
              value={bills.MeterID + ""}
              // label="ระบุผู้เช่า"
            //   onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.User.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>เบอร์โทรศัพท์</p>
            {/* <InputLabel id="MeterID">เบอร์โทรศัพท์</InputLabel> */}
            <Select
              native
              variant="outlined"
              value={bills.MeterID + ""}
              // label="ระบุเบอร์โทรศัพท์"
            //   onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.User.Tel}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ค่าเช่าห้อง</p>
            {/* <InputLabel id="MeterID">ค่าเช่าห้อง</InputLabel> */}
            <Select
              native
              variant="outlined"
              value={bills.MeterID + ""}
              // label="ระบุค่าเช่าห้อง"
            //   onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Manage.Price}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ค่าเช่าเฟอร์นิเจอร์</p>
            {/* <InputLabel id="FurnitureID">ค่าเช่าเฟอร์นิเจอร์</InputLabel> */}
            <Select
              variant="outlined"
              native
              value={bills.FurnitureID + ""}
              // label="ระบุค่าเช่าเฟอร์นิเจอร์"
              onChange={handleChange}
              inputProps={{
                name: "FurnitureID",
              }}
            >
              <option aria-label="None" value=""></option>
              {furnitures.map((item: FurnitureInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Equipment.Price}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>มิเตอร์ครั้งก่อน</p>
            {/* <InputLabel id="MeterID">บิลครั้งก่อน</InputLabel> */}
            <Select
              variant="outlined"
              native
              value={bills.MeterID + ""}
              // label="ระบุบิลครั้งก่อน"
            //   onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Before}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>มิเตอร์ที่จดได้</p>
            {/* <InputLabel id="MeterID">บิลที่จดได้</InputLabel> */}
            <Select
              variant="outlined"
              native
              value={bills.MeterID + ""}
              // label="ระบุบิลที่จดได้"
            //   onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.After}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>มิเตอร์ที่ใช้ไป</p>
            {/* <InputLabel id="MeterID">หน่วยที่ใช้</InputLabel> */}
            <Select
              native
              variant="outlined"
              value={bills.MeterID + ""}
              // label="ระบุหน่วยที่ใช้ไป"
            //   onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Total}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>หน่วยละ</p>
            {/* <InputLabel id="MeterID">หน่วยละ</InputLabel> */}
            <Select
              native
              value={bills.MeterID + ""}
              // label="ระบุหน่วยละ"
            //   onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Unit}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ค่าไฟ</p>
            {/* <InputLabel id="MeterID">รวมค่าไฟ</InputLabel> */}
            <Select
              native
              variant="outlined"
              value={bills.MeterID + ""}
              // label="ระบุรวมค่าไฟ"
            //   onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Electric}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ค่านํ้าเหมา</p>
            {/* <InputLabel id="MeterID">ค่าน้ำ(เหมา)</InputLabel> */}
            <Select
              native
              disabled
              value={bills.MeterID + ""}
              // label="ค่าน้ำ(เหมา)"
            //   onChange={handleChange}
              inputProps={{
                name: "MeterID",
              }}
            >
              <option aria-label="None" value=""></option>
              {meters.map((item: MeterInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Water}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={5}>
          <FormControl fullWidth variant="outlined">
            <p>รวม</p>
            <TextField
              variant="outlined"
              id="BillID"
              onChange={(event) => setCosts(event.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>วันที่</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                // disabled
                label="เดือน/วัน/ปี"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                minDate={new Date()}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button component={RouterLink} to="/bills" variant="contained">
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
    </Container>
  );
}
export default BillCreate;