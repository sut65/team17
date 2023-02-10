import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CleaningInterface } from "../../models/ICleaning";
import moment from "moment";

import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

function Cleanings() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [cleanings, setCleanings] = useState<CleaningInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getCleanings = async () => {
    fetch(`${apiUrl}/cleanings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCleanings(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const DeleteCleanings = async (id: string | number | undefined) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/cleanings/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          console.log("ยกเลิกสำเร็จ");
          setErrorMessage("");
        } else {
          setErrorMessage(res.error);
          setError(true);
          console.log("ยกเลิกไม่สำเร็จ");
        }
        getCleanings();
      });
  };

  useEffect(() => {
    getCleanings();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Container sx={{ marginTop: 2 }} > */}
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            sx={{
              fontFamily: "PK Krung Thep Medium",
              fontSize: 30,
            }}
          >
            <b>ระบบจองบริการทำความความสะอาด</b>
          </Typography>
        </Box>
        <Box>
          <Button
            component={RouterLink}
            to="/cleaning/create"
            variant="contained"
            color="primary"
            sx={{
              fontFamily: "PK Krung Thep Medium",
            }}
          >
            จองทำความสะอาด
          </Button>
        </Box>
      </Box>
      <TableContainer
        sx={
          {
            // bgcolor: "skyblue"
          }
        }
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center" width="2%">
                ลำดับ
              </TableCell>
              <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center" width="15%">
                ชื่อ - นามสกุล
              </TableCell>
              <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center" width="8%">
                เบอร์โทร
              </TableCell>
              <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center" width="7%">
                ห้องพัก
              </TableCell>
              <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center" width="19%">
                ประเภทการทำความสะอาด
              </TableCell>
              <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center" width="21%">
                บริเวณที่ต้องการทำความสะอาด
              </TableCell>
              <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center" width="13%">
                เพิ่มเติม
              </TableCell>
              <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center" width="22%">
                วันที่และเวลา
              </TableCell>
              <TableCell align="center" width="1%"></TableCell>
              <TableCell align="center" width="1%"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cleanings.map((item: CleaningInterface) => (
              <TableRow key={item.ID}>
                <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center">{item.ID}</TableCell>
                <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center">{item.User.Name}</TableCell>
                <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center">{item.User.Tel}</TableCell>
                <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center">{item.Room.Number}</TableCell>
                <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center">{item.Kind.Kind}</TableCell>
                <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center">{item.Area.Area}</TableCell>
                <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center">{item.Detail}</TableCell>
                <TableCell sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium"}} align="center">
                  {moment(item.CleaningTime).format("DD MMMM yyyy hh:mm")}
                </TableCell>
                {/* <TableCell align="center">{format((new Date(item.BookingTime)), 'DD MMMM yyyy hh:mm')}</TableCell> */}
                {/* <Box
                  sx={{
                    display: "grid",
                    justifyContent: "center",
                    marginTop: "50%",
                    bgcolor: "green",
                  }}
                > */}
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<SaveAsOutlinedIcon />}
                      sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 10,
                        borderRadius: 20,
                        fontWeight: "bold",
                        color: "black",
                        width: "auto",
                        // marginTop: "50%",
                        marginBottom: "4px",
                        borderColor: "black",
                        "&:hover": {
                          background: "rgba(0, 208, 132, 0.5)",
                          borderColor: "rgba(0, 208, 132, 0.4)",
                        },
                      }}
                      onClick={() => navigate(`${item.ID}`)}
                    >
                      แก้ไข
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 10,
                        borderRadius: 20,
                        fontWeight: "bold",
                        color: "black",
                        width: "auto",
                        borderColor: "black",
                        "&:hover": {
                          background: "rgba(0, 208, 132, 0.5)",
                          borderColor: "rgba(0, 208, 132, 0.4)",
                        },
                      }}
                      onClick={() => DeleteCleanings(`${item.ID}`)}
                    >
                      ลบ
                    </Button>
                  </TableCell>
                {/* </Box> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Container> */}
    </Box>
  );
}
//dw
export default Cleanings;
