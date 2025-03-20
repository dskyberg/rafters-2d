import { create } from "zustand";
import Rafter2D from "../components/rafter_2d";

const toZero = (value) => (value == "" ? "0" : value);
const toNumber = (value) => (typeof value === "string" ? parseFloat(toZero(value)) : value);
const toInt = (value) => (typeof value === "string" ? parseInt(toZero(value), 10) : value);

export const useRafterDataStore = create((set, get) => ({
  pitch: 7,
  span: 360,
  wall_width: 6,
  beam_thickness: 6,
  beam_width: 12,
  overhang: 18,
  rafter_width: 10,
  metric: false,
  setValue: (value, input) => {
    switch (value) {
      case "metric":
        set({ metric: input });
        break;
      case "pitch":
        set({ pitch: toInt(input) });
        break;
      case "span":
        set({ span: toNumber(input) });
        break;
      case "wall_width":
        set({ wall_width: toNumber(input) });
        break;
      case "beam_thickness":
        set({ beam_thickness: toNumber(input) });
        break;
      case "beam_width":
        set({ beam_width: toNumber(input) });
        break;
      case "overhang":
        set({ overhang: toNumber(input) });
        break;
      case "rafter_width":
        set({ rafter_width: toNumber(input) });
        break;
      default:
        console.error("Invalid value");
        break;
    }
  },
  getValue: (value) => {
    switch (value) {
      case "metric":
        return get().metric;
      case "pitch":
        return get().pitch;
      case "span":
        return get().span;
      case "wall_width":
        return get().wall_width;
      case "beam_thickness":
        return get().beam_thickness;
      case "beam_width":
        return get().beam_width;
      case "overhang":
        return get().overhang;
      case "rafter_width":
        return get().rafter_width;
      default:
        console.error("Invalid value");
        break;
    }
  },
}));
