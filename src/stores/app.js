import { create } from "zustand";

export const useAppStore = create((set) => ({
  open: false,
  setOpen: (input) => set({ open: input }),
}));

export const useRafterDataStore = create((set, get) => ({
  pitch: 7,
  span: 360,
  wall_width: 6,
  beam_thickness: 2,
  beam_width: 10,
  overhang: 18,
  rafter_width: 10,
  wall_height: 120,

  setValue: (value, input) => {
    switch (value) {
      case "pitch":
        set({ pitch: input });
        break;
      case "span":
        set({ span: input });
        break;
      case "wall_width":
        set({ wall_width: input });
        break;
      case "beam_thickness":
        set({ beam_thickness: input });
        break;
      case "beam_width":
        set({ beam_width: input });
        break;
      case "overhang":
        set({ overhang: input });
        break;
      case "rafter_width":
        set({ rafter_width: input });
        break;
      case "wall_height":
        set({ wall_height: input });
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
      case "wall_height":
        return get().wall_height;
      default:
        console.error("Invalid value");
        break;
    }
  },
}));
