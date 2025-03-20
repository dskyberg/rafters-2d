use crate::cli::Cli;
use crate::right_angle::RightAngle;
use crate::utils::*;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct BirdsMouth {
    /// The rise of the triangle
    heel: f32,
    /// The run of the triangle
    seat: f32,
    /// The hypotenuse of the triangle
    length: f32,
    /// The angle is based on the rafter pitch
    angle: f32,
    /// Where, on the length of the rafter, does the bird's mouth start
    seat_start: f32,
}

impl BirdsMouth {
    pub fn from_cli(cli: &Cli) -> Self {
        Self::check_code(cli)
    }

    /// Ensure that the birds mouth heel is no more than 25% of rafter height,
    /// and the seat is not greater than the top plate width.  Adjust the
    /// bird's mouth accordingly
    fn check_code(cli: &Cli) -> Self {
        let _max_heel = cli.rafter_width / 4.0;
        let max_seat = cli.wall_width;

        let (rise, length) = calculate_rise_and_length(cli.pitch, max_seat);
        if rise > max_seat {
            panic!("Birds mouth seat is greater than top plate width");
        }

        // Calculate the distance to the start of the bird's mout heal
        // The run of this triangle is the overhang of the rafter.
        let (seat_start, _) = calculate_rise_and_length(cli.pitch, cli.overhang);

        Self {
            heel: rise,
            seat: max_seat,
            length,
            angle: angle_from_pitch(cli.pitch),
            seat_start,
        }
    }
}
impl RightAngle<f32> for BirdsMouth {
    fn rise(&self) -> f32 {
        self.heel
    }
    fn run(&self) -> f32 {
        self.seat
    }
    fn length(&self) -> f32 {
        self.length
    }
    fn angle(&self) -> f32 {
        self.angle
    }
}
