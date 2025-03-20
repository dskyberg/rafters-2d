export const to_radians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const to_degrees = (radians) => {
  return radians * (180 / Math.PI);
};

// Returns angle in radians
export const from_pitch = (pitch) => {
  return Math.atan(pitch / 12);
};
