import { Stage, Layer, Rect, Line, Text } from "react-konva";

import { useTheme } from "@mui/material/styles";

import { useRafterDataStore } from "../stores/rafter_data";

import { toInches } from "../utils";

export default function DimensionsLayer() {
  const theme = useTheme();
  const { scaleFactor, rafter, beam_thickness, overhang, dimensionsVisible } = useRafterDataStore((state) => state);

  // Add space to show dimensions.  This needs to be added to all
  // the x and y coordinates.
  const dimensionPadding = parseInt(theme.spacing(2));

  const scale = (inches) => {
    return inches * scaleFactor;
  };

  let start_y = dimensionPadding;
  let start_x = dimensionPadding;

  let tailPoints = [
    [start_x, scale(rafter.rise + rafter.angled_width) + 10],
    [start_x, scale(rafter.rise + rafter.angled_width)],
    [start_x + scale(overhang), scale(rafter.rise)],
    [start_x + scale(overhang), scale(rafter.rise) + 10],
  ].flat();

  let runPoints = [
    [start_x + scale(overhang), scale(rafter.rise) + 10],

    [start_x + scale(overhang), scale(rafter.rise)],

    [start_x + scale(overhang + rafter.run), 0],
    [start_x + scale(overhang + rafter.run), 10],
  ].flat();

  let heightPoints = [
    [start_x + scale(overhang + rafter.run + beam_thickness + 2), start_y + 0],

    [start_x + scale(overhang + rafter.run + beam_thickness + 5), start_y + 0],

    [start_x + scale(overhang + rafter.run + beam_thickness + 5), start_y + scale(rafter.total_height)],

    [start_x + scale(overhang + rafter.run + beam_thickness + 2), start_y + scale(rafter.total_height)],
  ].flat();

  return (
    <Layer visible={dimensionsVisible}>
      <Line points={tailPoints} stroke="black" />
      <Text
        x={start_x - 10}
        y={scale(rafter.rise) + 10}
        text={toInches(rafter.tail.length)}
        fontSize={12}
        fill="black"
        rotation={-rafter.angle}
      />

      <Line points={runPoints} stroke="black" />
      <Text
        x={scale((overhang + rafter.run) / 2)}
        y={scale(rafter.rise / 2)}
        text={toInches(rafter.run)}
        fontSize={12}
        fill="black"
        rotation={-rafter.angle}
      />
      <Line points={heightPoints} stroke="black" />
      <Text
        x={start_x + 30 + scale(overhang + rafter.run + beam_thickness)}
        y={start_y + scale(rafter.total_height / 2)}
        text={toInches(rafter.total_height)}
        fontSize={12}
        fill="black"
        rotation={90}
      />
    </Layer>
  );
}
