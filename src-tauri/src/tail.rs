use crate::right_angle::RightAngle;
use crate::utils::*;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct Tail {
    rise: f32,
    run: f32,
    length: f32,
    angle: f32,
}

impl Tail {
    pub fn from_pitch_and_run(pitch: u32, run: f32) -> Self {
        let angle = angle_from_pitch(pitch);
        let (rise, length) = toa(pitch, None, Some(run));
        Self {
            rise,
            run,
            length,
            angle,
        }
    }
}

impl RightAngle<f32> for Tail {
    fn rise(&self) -> f32 {
        self.rise
    }
    fn run(&self) -> f32 {
        self.run
    }
    fn length(&self) -> f32 {
        self.length
    }
    fn angle(&self) -> f32 {
        self.angle
    }
}
