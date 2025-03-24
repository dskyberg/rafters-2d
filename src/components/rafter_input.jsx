import { useEffect } from "react";
import { useRafterDataStore } from "../stores/rafter_data";

import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CalculateIcon from "@mui/icons-material/Calculate";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import RafterTable from "./rafter_table";

const NumberField = styled(TextField)(({ theme }) => ({
  width: 220,
  margin: theme.spacing(1),
}));

export default function RafterInput() {
  const theme = useTheme();
  const {
    rafter,
    getRafter,
    pitch,
    span,
    wall_width,
    beam_thickness,
    beam_width,
    overhang,
    rafter_width,
    setValue,
    getValue,
    scaleFactor,
    zoomIn,
    zoomOut,
  } = useRafterDataStore();

  useEffect(() => {
    getRafter();
  }, []);

  const handleCalc = () => {
    getRafter();
  };

  const handleZoomIn = () => {
    zoomIn();
  };

  const handleZoomOut = () => {
    if (scaleFactor > 0) {
      zoomOut();
    }
  };

  return (
    <Stack>
      <Stack direction="row">
        <Stack>
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
        <RafterTable rafter={rafter} />
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Stack direction="row" justifyContent={"end"}></Stack>
        <Stack direction="row" justifyContent={"end"}>
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
      </Box>
    </Stack>
  );
}
