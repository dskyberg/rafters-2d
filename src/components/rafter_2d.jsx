import { Stage, Layer, Rect, Line, Text } from "react-konva";

import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import { useRafterDataStore } from "../stores/rafter_data";
import { toInches } from "../utils";
import DimensionsLayer from "./dimensions_layer";
import WallsLayer from "./walls_layer";
import TrianglesLayer from "./triangles_layer";

export default function Rafter2D() {
  let theme = useTheme();
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

  const windowSize = { width: 1200, height: 800 };

  // Add space to show dimensions.  This needs to be added to all
  // the x and y coordinates.
  const dimensionPadding = parseInt(theme.spacing(2));

  if (rafter == null) {
    return (
      <div sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  let start_y = dimensionPadding;
  let start_x = dimensionPadding;
  let max_y = rafter.rise + rafter.tail.rise + rafter.angled_width;

  let x = overhang;
  let y = max_y - rafter.birds_mouth.seat_start;

  let rafter_points = [
    [start_x, start_y + rafter.rise + rafter.tail.rise + rafter.angled_width],
    [start_x, start_y + rafter.rise + rafter.tail.rise],
    [start_x + overhang + rafter.run, start_y],
    [start_x + overhang + rafter.run, start_y + rafter.angled_width],
  ].flat();

  let birds_mouth_points = [
    [start_x + x, start_y + y],
    [start_x + x, start_y + y - rafter.birds_mouth.heel],
    [start_x + x + rafter.birds_mouth.seat, start_y + y - rafter.birds_mouth.heel],
  ].flat();

  return (
    <div sx={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
      <div id="rafter-container">
        <Stage
          container="rafter-container"
          width={windowSize.width}
          height={windowSize.height}
          scaleX={scaleFactor}
          scaleY={scaleFactor}
        >
          <DimensionsLayer />
          <Layer visible={rafterVisible}>
            <Line points={rafter_points} closed strokeWidth={0} fill="grey" />
            <Line points={birds_mouth_points} closed strokeWidth={0} stroke="white" fill="white" />
          </Layer>
          <WallsLayer />
          <TrianglesLayer />
        </Stage>
      </div>
    </div>
  );
}
