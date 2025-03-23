//! This utility library is partly in support of the rafters project and partly in support
//! of simply learning programmatic trigonometry.  The `dead_code` methods are just for trig fun.
use pythagoras::{RightAngle, RightAngleInput};

#[allow(dead_code)]
pub const DEGREE_SYMBOL: char = '°';

/// Calculate the angle is for a given pitch.
/// Given pitch is just the rise, when the run is 12, calculate the angle as
/// `tan(θ) = pitch/12`
#[inline(always)]
pub fn pitch_to_angle(pitch: u32) -> f32 {
    pitch_to_radians(pitch).to_degrees()
}

#[inline(always)]
pub fn pitch_to_radians(pitch: u32) -> f32 {
    (pitch as f32 / 12.0).atan()
}

#[inline(always)]
pub fn radians_to_pitch(radians: f32) -> u32 {
    (radians.tan() * 12.0) as u32
}

#[allow(dead_code)]
/// Calculate the pitch for a given angle in degrees.
/// Given angle is the angle of the triangle.  The run is always 12.
/// Calculate the pitch as `pitch = tan(θ) * 12`
#[inline(always)]
pub fn angle_to_pitch(angle: f32) -> u32 {
    radians_to_pitch(angle.to_radians())
}

/// Given an angle and a side (rise or run), calculate the other side and length
pub fn toa(pitch: u32, rise: Option<f32>, run: Option<f32>) -> (f32, f32) {
    let input = RightAngleInput {
        rise,
        run,
        diagonal: None,
        radians: Some(pitch_to_radians(pitch)),
    };
    let ra = RightAngle::try_from(&input).unwrap();
    match (rise, run) {
        (Some(_), _) => (ra.run, ra.diagonal),
        _ => (ra.rise, ra.diagonal),
    }
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
