import { create } from "zustand";
import { invoke } from "@tauri-apps/api/core";

const toZero = (value) => (value == "" ? "0" : value);
const toNumber = (value) => (typeof value === "string" ? parseFloat(toZero(value)) : value);
const toInt = (value) => (typeof value === "string" ? parseInt(toZero(value), 10) : value);

export const useRafterDataStore = create((set, get) => ({
  pitch: 7,
  span: 360.0,
  wall_width: 5.5,
  beam_thickness: 5.5,
  beam_width: 11.25,
  overhang: 18.0,
  rafter_width: 9.25,
  metric: false,
  rafter: null,
  scaleFactor: 3,
  rafterVisible: true,
  wallsVisible: true,
  dimensionsVisible: true,
  trianglesVisible: false,

  setMetric: (value) => set({ metric: value }),

  toggleRafterVisible: () => set({ rafterVisible: !get().rafterVisible }),
  toggleWallsVisible: () => set({ wallsVisible: !get().wallsVisible }),
  toggleDimensionsVisible: () => set({ dimensionsVisible: !get().dimensionsVisible }),
  toggleTrianglesVisible: () => set({ trianglesVisible: !get().trianglesVisible }),

  zoomIn: () => set({ scaleFactor: get().scaleFactor + 1 }),
  zoomOut: () => set({ scaleFactor: get().scaleFactor - 1 }),

  getRafter: async () => {
    const { pitch, span, wall_width, beam_thickness, beam_width, overhang, rafter_width } = get();

    set({
      rafter: await invoke("get_rafter", {
        cli: { pitch, span, wall_width, beam_thickness, beam_width, overhang, rafter_width },
      }),
    });
  },

  setValue: (value, input) => {
    switch (value) {
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
