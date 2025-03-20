use tauri::Manager;

mod beam;
mod birds_mouth;
mod cli;
mod rafter;
mod right_angle;
mod tail;
mod utils;

use rafter::Rafter;

#[tauri::command]
fn get_rafter(cli: cli::Cli) -> Rafter {
    eprintln!("Got CLI from frontend: {:?}", cli);
    Rafter::from_cli(&cli)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            {
                let handle = app.handle();
                let window = handle.get_webview_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_rafter])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
