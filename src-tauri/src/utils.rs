//! This utility library is partly in support of the rafters project and partly in support
//! of simply learning programmatic trigonometry.  The `dead_code` methods are just for trig fun.

#[allow(dead_code)]
pub const DEGREE_SYMBOL: char = '°';

/// Calculate the angle is for a given pitch.
/// Given pitch is just the rise, when the run is 12, calculate the angle as
/// `tan(θ) = pitch/12`
#[inline(always)]
pub fn angle_from_pitch(pitch: u32) -> f32 {
    (pitch as f32 / 12.0).atan().to_degrees()
}

#[allow(dead_code)]
/// Calculate the pitch for a given angle in degrees.
/// Given angle is the angle of the triangle.  The run is always 12.
/// Calculate the pitch as `pitch = tan(θ) * 12`
#[inline(always)]
pub fn pitch_from_angle(angle: f32) -> u32 {
    (angle.to_radians().tan() * 12.0) as u32
}

/// Given an angle and a side (rise or run), calculate the other side and length
pub fn toa(pitch: u32, rise: Option<f32>, run: Option<f32>) -> (f32, f32) {
    let rad = (pitch as f32 / 12.0).atan();
    let (side, other) = match (rise, run) {
        (Some(opposite), None) => (opposite, opposite / rad.tan()),
        (None, Some(adjacent)) => (adjacent, adjacent * rad.tan()),
        _ => panic!("Either opposite or adjacent must be provided"),
    };

    let hypotenuse = (side.powi(2) + other.powi(2)).sqrt();
    (other, hypotenuse)
}

#[allow(dead_code)]
/// Format a  decimal length in inches
pub fn to_inches(length: f32) -> String {
    let fract = length.fract();
    let length = length as u32;
    let feet = length / 12;
    let inches = length - (feet * 12);

    let mut result = String::new();
    if feet > 0 {
        result.push_str(&format!("{}'", feet));
    }
    if inches > 0 {
        result.push_str(&format!(" {}", inches));
    }
    if fract > 0.0 {
        let sixteenths = (fract * 16.0) as u32;
        result.push_str(&format!(" {}/16", sixteenths));
    }
    if inches > 0 || fract > 0.0 {
        result.push('\'');
    }
    result
}
