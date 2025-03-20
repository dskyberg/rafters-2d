import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

import { Stage, Layer, Rect, Line } from "react-konva";

import { useTheme } from "@mui/material/styles";
import { Stack, Button } from "@mui/material";

import { useRafterDataStore } from "../stores/rafter_data";

export default function Rafter2D() {
  let theme = useTheme();
  const [rafter, setRafter] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(3);
  const { wall_height, pitch, span, wall_width, beam_thickness, beam_width, overhang, rafter_width } =
    useRafterDataStore((state) => state);

  const windowSize = { width: 1200, height: 800 };
  const padding = parseInt(theme.spacing(2));

  async function getRafter() {
    let rafter = await invoke("get_rafter", {
      cli: { pitch, span, wall_width, beam_thickness, beam_width, overhang, rafter_width },
    });
    console.log("rafter", rafter);
    setRafter(rafter);
  }

  useEffect(() => {
    getRafter();
  }, []);

  const handleCalc = () => {
    getRafter();
  };

  const scale = (inches) => {
    return inches * scaleFactor;
  };

  if (rafter == null) {
    return <div>Waiting for rafter data...</div>;
  }

  let rafter_points = [
    [0, scale(rafter.total_height)],
    [0, scale(rafter.total_height - rafter.angled_width)],
    [scale(rafter.total_length), 0],
    [scale(rafter.total_length), scale(rafter.angled_width)],
  ].flat();

  let birds_mouth_points = [
    [scale(overhang), scale(rafter.total_height - rafter.birds_mouth.seat_start)],
    [scale(overhang), scale(rafter.total_height - rafter.birds_mouth.seat_start - rafter.birds_mouth.heel)],
    [
      scale(overhang + rafter.birds_mouth.seat),
      scale(rafter.total_height - rafter.birds_mouth.seat_start - rafter.birds_mouth.heel),
    ],
  ].flat();

  return (
    <div sx={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
      <Button onClick={handleCalc}>Calculate</Button>
      <div id="rafter-container">
        <Stage container="rafter-container" width={windowSize.width} height={windowSize.height}>
          <Layer>
            <Line points={rafter_points} closed stroke="green" />
            <Rect
              x={scale(rafter.total_length)}
              y={0}
              height={scale(rafter.beam.height)}
              width={scale(rafter.beam.width)}
              stroke="red"
            />
            <Line points={birds_mouth_points} closed stroke="green" />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
