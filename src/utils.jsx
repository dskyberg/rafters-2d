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

export function toInches(number) {
  let integer = Math.trunc(number);

  let fract = (number - Math.floor(number)).toFixed(2);
  let feet = Math.trunc(integer / 12.0);
  let inches = integer - feet * 12.0;

  let result = "";
  if (feet > 0.0) {
    result = `${feet}'`;
  }
  if (inches > 0.0) {
    result += `  ${inches}`;
  }
  if (fract > 0.0) {
    let sixteenths = Math.trunc(fract * 16.0);
    if (sixteenths > 0) {
      result += ` ${sixteenths}/16`;
    }
  }
  if (inches > 0 || fract > 0.0) {
    result += '"';
  }
  return result;
}
