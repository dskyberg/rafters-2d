import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAppStore } from "../stores/app";
import { useRafterDataStore } from "../stores/rafter_data";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const drawerWidth = 240;

const MetricGroup = styled(RadioGroup)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export default function Drawer() {
  const theme = useTheme();
  const open = useAppStore((state) => state.open);
  const setOpen = useAppStore((state) => state.setOpen);
  const { metric, setMetric } = useRafterDataStore();

  const handleMetricChange = (e) => {
    setMetric(e.target.value == "metric");
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <MetricGroup
        name="metric-radio-group"
        value={metric == true ? "metric" : "freedom_units"}
        onChange={handleMetricChange}
      >
        <FormControlLabel
          id="metric-radio-freedom-units"
          value="freedom_units"
          control={<Radio size="small" />}
          label="Freedom Units"
        />
        <FormControlLabel id="metric-radio-metric" value="metric" control={<Radio size="small" />} label="Metric" />
      </MetricGroup>
    </MuiDrawer>
  );
}
