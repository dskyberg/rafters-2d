import { useState } from "react";
import { useRafterDataStore } from "../stores/rafter_data";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";

const NumberField = styled(TextField)(({ theme }) => ({
  width: 220,
  margin: theme.spacing(1),
}));

const MetricGroup = styled(RadioGroup)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export default function RafterInput() {
  const { metric, pitch, span, wall_width, beam_thickness, beam_width, overhang, rafter_width, setValue, getValue } =
    useRafterDataStore();

  const handleMetricChange = (e) => {
    setValue("metric", e.target.value == "metric");
  };

  return (
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
    </Stack>
  );
}
