import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
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

const CheckboxGroup = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
}));

export default function Drawer() {
  const theme = useTheme();
  const open = useAppStore((state) => state.open);
  const setOpen = useAppStore((state) => state.setOpen);
  const {
    metric,
    setMetric,
    rafterVisible,
    wallsVisible,
    dimensionsVisible,
    trianglesVisible,
    toggleRafterVisible,
    toggleWallsVisible,
    toggleDimensionsVisible,
    toggleTrianglesVisible,
  } = useRafterDataStore();

  const handleMetricChange = (e) => {
    setMetric(e.target.value == "metric");
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRafterVisible = () => {
    toggleRafterVisible();
  };

  const handleWallsVisible = () => {
    toggleWallsVisible();
  };

  const handleDimensionsVisible = () => {
    toggleDimensionsVisible();
  };
  const handleTrianglesVisible = () => {
    toggleTrianglesVisible();
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
      <Divider />
      <CheckboxGroup>
        <Tooltip title="Toggle Rafter Visibility">
          <FormControlLabel
            label="Show Rafter"
            control={
              <Checkbox
                size="small"
                checked={rafterVisible}
                onChange={handleRafterVisible}
                inputProps={{ "aria-label": "show-rafter" }}
              />
            }
          />
        </Tooltip>

        <Tooltip title="Toggle Walls Visibility">
          <FormControlLabel
            label="Show Walls"
            control={
              <Checkbox
                size="small"
                checked={wallsVisible}
                onChange={handleWallsVisible}
                inputProps={{ "aria-label": "show-walls" }}
              />
            }
          />
        </Tooltip>

        <Tooltip title="Toggle Dimensions Visibility">
          <FormControlLabel
            label="Show Dimensions"
            control={
              <Checkbox
                size="small"
                checked={dimensionsVisible}
                onChange={handleDimensionsVisible}
                inputProps={{ "aria-label": "show-dimensions" }}
              />
            }
          />
        </Tooltip>

        <Tooltip title="Toggle Triangles Visibility">
          <FormControlLabel
            label="Show Triangles"
            control={
              <Checkbox
                size="small"
                checked={trianglesVisible}
                onChange={handleTrianglesVisible}
                inputProps={{ "aria-label": "show-triangles" }}
              />
            }
          />
        </Tooltip>
      </CheckboxGroup>
    </MuiDrawer>
  );
}
