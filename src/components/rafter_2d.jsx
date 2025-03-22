import { Stage, Layer, Rect, Line, Text } from "react-konva";

import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import { useRafterDataStore } from "../stores/rafter_data";
import { toInches } from "../utils";

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

  const scale = (inches) => {
    return inches * scaleFactor;
  };

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

  let rafter_points = [
    [start_x, start_y + scale(rafter.rise + rafter.tail.rise + rafter.angled_width)],
    [start_x, start_y + scale(rafter.rise + rafter.tail.rise)],
    [start_x + scale(overhang + rafter.run), start_y],
    [start_x + scale(overhang + rafter.run), start_y + scale(rafter.angled_width)],
  ].flat();

  let x = overhang;
  let y = max_y - rafter.birds_mouth.seat_start;
  let birds_mouth_points = [
    [start_x + scale(x), start_y + scale(y)],
    [start_x + scale(x), start_y + scale(y - rafter.birds_mouth.heel)],
    [start_x + scale(x + rafter.birds_mouth.seat), start_y + scale(y - rafter.birds_mouth.heel)],
  ].flat();

  return (
    <div sx={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
      <div id="rafter-container">
        <Stage container="rafter-container" width={windowSize.width} height={windowSize.height}>
          <Layer visible={dimensionsVisible}>
            <Line
              points={[
                start_x + scale(overhang + rafter.run + beam_thickness + 2),
                start_y + 0,

                start_x + scale(overhang + rafter.run + beam_thickness + 5),
                start_y + 0,

                start_x + scale(overhang + rafter.run + beam_thickness + 5),
                start_y + scale(rafter.total_height),

                start_x + scale(overhang + rafter.run + beam_thickness + 2),
                start_y + scale(rafter.total_height),
              ]}
              stroke="black"
            />
            <Text
              x={start_x + scale(overhang + rafter.run + beam_thickness + 7)}
              y={start_y + scale(rafter.total_height / 2)}
              text={toInches(rafter.total_height)}
              fontSize={12}
              fill="black"
            />
          </Layer>

          <Layer visible={rafterVisible}>
            <Line points={rafter_points} closed strokeWidth={0} fill="grey" />
            <Line points={birds_mouth_points} closed stroke="white" fill="white" />
          </Layer>
          <Layer visible={wallsVisible}>
            <Rect
              x={start_x + scale(overhang + rafter.run)}
              y={start_y}
              height={scale(beam_width)}
              width={scale(beam_thickness)}
              stroke="red"
            />
            <Rect
              x={start_x + scale(overhang)}
              y={start_y + scale(y - rafter.birds_mouth.heel)}
              height={scale(36)}
              width={scale(wall_width)}
              stroke="red"
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
