import { Layer, Line } from "react-konva";

import { useTheme } from "@mui/material/styles";

import { useRafterDataStore } from "../stores/rafter_data";

export default function TrianglesLayer() {
  const theme = useTheme();
  const { scaleFactor, rafter, overhang, trianglesVisible } = useRafterDataStore((state) => state);

  // Add space to show dimensions.  This needs to be added to all
  // the x and y coordinates.
  const dimensionPadding = parseInt(theme.spacing(2));

  const scale = (inches) => {
    return inches * scaleFactor;
  };

  let start_y = dimensionPadding;
  let start_x = dimensionPadding;
  let max_y = rafter.rise + rafter.tail.rise + rafter.angled_width;
  let y = max_y - rafter.birds_mouth.seat_start;

  let big_t = [
    [start_x + scale(overhang), start_y + scale(max_y - rafter.birds_mouth.seat_start)],
    [start_x + scale(overhang + rafter.run), start_y + scale(max_y - rafter.birds_mouth.seat_start)],
    [start_x + scale(overhang + rafter.run), start_y + scale(rafter.angled_width)],
  ].flat();

  let little_t = [
    [start_x, start_y + scale(max_y)],
    [start_x + scale(overhang), start_y + scale(max_y)],
    [start_x + scale(overhang), start_y + scale(max_y - rafter.birds_mouth.seat_start)],
  ].flat();

  return (
    <Layer visible={trianglesVisible}>
      <Line points={big_t} stroke="yellow" />
      <Line points={little_t} stroke="yellow" />
    </Layer>
  );
}
