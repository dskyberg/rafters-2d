import { useEffect } from "react";
import { useRafterDataStore } from "../stores/rafter_data";

import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CalculateIcon from "@mui/icons-material/Calculate";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";

import Raftertable from "./rafter_table";
import { ToggleOn } from "@mui/icons-material";

const NumberField = styled(TextField)(({ theme }) => ({
  width: 220,
  margin: theme.spacing(1),
}));

const MetricGroup = styled(RadioGroup)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export default function RafterInput() {
  const theme = useTheme();
  const {
    rafter,
    getRafter,
    metric,
    pitch,
    span,
    wall_width,
    beam_thickness,
    beam_width,
    overhang,
    rafter_width,
    setValue,
    getValue,
    zoomIn,
    zoomOut,
    rafterVisible,
    wallsVisible,
    dimensionsVisible,
    toggleRafterVisible,
    toggleWallsVisible,
    toggleDimensionsVisible,
  } = useRafterDataStore();

  useEffect(() => {
    getRafter();
    console.log("rafter", rafter);
  }, []);

  const handleCalc = () => {
    getRafter();
    console.log("Rafter", rafter);
  };

  const handleZoomIn = () => {
    zoomIn();
  };

  const handleZoomOut = () => {
    zoomOut();
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

  const handleMetricChange = (e) => {
    setValue("metric", e.target.value == "metric");
  };

  return (
    <Stack>
      <Stack direction="row">
        <Stack>
          <MetricGroup
            row
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

          <NumberField
            id="pitch"
            size="small"
            label="Pitch"
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">:12</InputAdornment>,
              },
            }}
            sx={{ width: "10ch" }}
            value={pitch}
            onChange={(e) => setValue("pitch", e.target.value)}
          />

          <NumberField
            id="span"
            size="small"
            label="Span"
            value={span}
            onChange={(e) => setValue("span", e.target.value)}
          />
          <NumberField
            id="wall-width"
            size="small"
            label="Wall Width"
            value={wall_width}
            onChange={(e) => setValue("wall_width", e.target.value)}
          />
        </Stack>
        <Stack>
          <NumberField
            id="beam-thickness"
            size="small"
            label="Beam Thickness"
            value={beam_thickness}
            onChange={(e) => setValue("beam_thickness", e.target.value)}
          />
          <NumberField
            id="beam-width"
            size="small"
            label="Beam Width"
            value={beam_width}
            onChange={(e) => setValue("beam_width", e.target.value)}
          />
          <NumberField
            id="overhang"
            size="small"
            label="Overhang"
            value={overhang}
            onChange={(e) => setValue("overhang", e.target.value)}
          />
          <NumberField
            id="rafter-width"
            size="small"
            label="Rafter Width"
            value={rafter_width}
            onChange={(e) => setValue("rafter_width", e.target.value)}
          />
        </Stack>
        <Raftertable rafter={rafter} />
      </Stack>
      <Stack direction="row" justifyContent={"end"}>
        <Tooltip title="Toggle Rafter Visibility">
          <FormControlLabel
            label="Show Rafter"
            control={
              <Checkbox
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
                checked={dimensionsVisible}
                onChange={handleDimensionsVisible}
                inputProps={{ "aria-label": "show-dimensions" }}
              />
            }
          />
        </Tooltip>

        <Tooltip title="Calculate">
          <IconButton aria-label="calculate" onClick={handleCalc}>
            <CalculateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom In">
          <IconButton arial-label="zoom-in" onClick={handleZoomIn}>
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <IconButton arial-label="zoom-out" onClick={handleZoomOut}>
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
