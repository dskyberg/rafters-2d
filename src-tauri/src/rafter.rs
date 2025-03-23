use serde::Serialize;

use crate::beam::Beam;
use crate::birds_mouth::BirdsMouth;
use crate::cli::Cli;
use crate::right_angle::RightAngle;
use crate::tail::Tail;
use crate::utils::*;

#[derive(Debug, Clone, Serialize)]
pub struct Rafter {
    width: f32,
    rise: f32,
    run: f32,
    length: f32,
    pitch: u32,
    angle: f32,
    beam: Beam,
    birds_mouth: BirdsMouth,
    tail: Tail,
    angled_width: f32,
    ridge_beam_height: f32,
    total_length: f32,
    total_height: f32,
}

impl RightAngle<f32> for Rafter {
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
        pitch_to_angle(self.pitch)
    }
}

/// The run of the rafter is calculated from the outside of the wall (including sheathing) to
/// the center of the structure, minuse 1/2 the thickness of the ridge board/beam.
///
/// The ridge beam height is then the rafter rise - the bird's mouth rise.
///
/// And finally, the total length is the tail length + the rafter length
impl Rafter {
    pub fn from_cli(cli: &Cli) -> Self {
        // First calculate the big triangle
        let run = (cli.span / 2.0) - (cli.beam_thickness / 2.0);
        let (rise, length) = toa(cli.pitch, None, Some(run));
        let angle = pitch_to_angle(cli.pitch);
        let beam = Beam::new(cli.beam_thickness, cli.beam_width);
        // The bird's mouth is pretty standard.  We just need to adjust for the
        // width of the rafter, and wall to ensure it meets code.
        let birds_mouth = BirdsMouth::from_cli(cli);
        let tail = Tail::from_pitch_and_run(cli.pitch, cli.overhang);

        // Calculate the angled rafter width, so that we can calculate the ridge beam height
        let (_, angled_width) = toa(cli.pitch, None, Some(cli.rafter_width));
        let ridge_beam_height = rise + angled_width - birds_mouth.rise();
        let total_length = tail.length() + length;
        let total_height = rise + angled_width - birds_mouth.rise();
        Rafter {
            width: cli.rafter_width,
            rise,
            run,
            length,
            pitch: cli.pitch,
            angle,
            beam,
            birds_mouth,
            tail,
            angled_width,
            ridge_beam_height,
            total_length,
            total_height,
        }
    }
}
