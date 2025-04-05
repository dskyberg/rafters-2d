use rafter_lib::{Rafter, RafterInput};
use tauri::Manager;
mod utils;

#[tauri::command]
fn get_rafter(input: RafterInput) -> Rafter {
    eprintln!("Got RafterInput from frontend: {:?}", &input);
    let rafter = Rafter::from_input(&input);
    eprintln!("Retuning Rafter: {:?}", &rafter);
    rafter
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
