import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { toInches } from "../utils";

const KeyTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "0.8rem",
  color: theme.palette.text.primary,
}));

const RafterRow = ({ title, value }) => (
  <TableRow>
    <TableCell sx={{ width: "100px" }}>
      <KeyTypography>{title}</KeyTypography>
    </TableCell>
    <TableCell sx={{ width: "100px" }}>
      <ValueTypography>{value}</ValueTypography>
    </TableCell>
  </TableRow>
);

export default function RafterTable({ rafter }) {
  const theme = useTheme();

  if (rafter == null) {
    return (
      <Stack sx={{ m: theme.spacing(1) }}>
        <Typography variant="h6">Rafter Dimensions</Typography>
        <CircularProgress size={24} />
      </Stack>
    );
  }

  return (
    <Stack sx={{ m: theme.spacing(1), alignItems: "center" }}>
      <Typography variant="h6">Rafter Dimensions</Typography>
      <Stack direction="row">
        <TableContainer>
          <Table>
            <TableBody>
              <RafterRow title={"Angle"} value={`${rafter.angle}°`} />
              <RafterRow title={"Angled Width"} value={toInches(rafter.angled_width)} />
              <RafterRow title={"Bird's Mouth Heel"} value={toInches(rafter.birds_mouth.heel)} />
              <RafterRow title={"Bird's Mouth Seat"} value={toInches(rafter.birds_mouth.seat)} />
              <RafterRow title="Distance to Bird's Mouth" value={toInches(rafter.run)} />
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table>
            <TableBody>
              <RafterRow title={"Ridge Beam Height"} value={toInches(rafter.ridge_beam_height)} />
              <RafterRow title={"Angled Width"} value={toInches(rafter.angled_width)} />
              <RafterRow title={"Total Height"} value={toInches(rafter.total_height)} />
              <RafterRow title={"Total Length"} value={toInches(rafter.total_length)} />
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}
