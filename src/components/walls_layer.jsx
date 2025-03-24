import { Stage, Layer, Rect, Line, Text } from "react-konva";

import { useTheme } from "@mui/material/styles";

import { useRafterDataStore } from "../stores/rafter_data";

import { toInches } from "../utils";

export default function WallsLayer() {
  const theme = useTheme();
  const {
    scaleFactor,
    rafter,
    getRafter,
    wall_height,
    pitch,
    span,
    wall_width,
    beam_thickness,
    beam_width,
    overhang,
    rafter_width,
    rafterVisible,
    wallsVisible,
    dimensionsVisible,
  } = useRafterDataStore((state) => state);

  // Add space to show dimensions.  This needs to be added to all
  // the x and y coordinates.
  const dimensionPadding = parseInt(theme.spacing(2));

  let start_y = dimensionPadding;
  let start_x = dimensionPadding;
  let max_y = rafter.rise + rafter.tail.rise + rafter.angled_width;
  let y = max_y - rafter.birds_mouth.seat_start;

  return (
    <Layer visible={wallsVisible}>
      <Rect
        x={start_x + overhang + rafter.run}
        y={start_y}
        height={beam_width}
        width={beam_thickness}
        strokeWidth={1}
        stroke="red"
      />
      <Rect
        x={start_x + overhang}
        y={start_y + y - rafter.birds_mouth.heel}
        height={36}
        width={wall_width}
        stroke="red"
        strokeWidth={1}
      />
    </Layer>
  );
}
