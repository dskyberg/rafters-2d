import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
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
    <TableCell>
      <KeyTypography>{title}</KeyTypography>
    </TableCell>
    <TableCell>
      <ValueTypography>{value}</ValueTypography>
    </TableCell>
  </TableRow>
);

export default function Raftertable({ rafter }) {
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
              <RafterRow title={"Height"} value={toInches(rafter.total_height)} />
              <RafterRow title={"Length"} value={toInches(rafter.total_length)} />
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table>
            <TableBody>
              <RafterRow title={"Angle"} value={`${rafter.angle}°`} />
              <RafterRow title={"Angled Width"} value={toInches(rafter.angled_width)} />
              <RafterRow title={"Height"} value={toInches(rafter.total_height)} />
              <RafterRow title={"Length"} value={toInches(rafter.total_length)} />
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}
