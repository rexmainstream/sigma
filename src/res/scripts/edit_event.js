import { custom_alert } from "./add_alert";
import { add_event_to_db, edit_event_to_db, Event_constructor, Event_form, insert_event_to_DOM } from "./add_event";
import { exit_modal } from "./add_modal";
import { string_validation } from "./data_validation";
import { get_date, return_events_list, show_events_today, user_selected_date } from "./rolyart-calendar";
import { return_event_index, sort_events_by_date } from "./search_and_sort_events";

let db

//Edits the event
export function edit_event(e, index) {
}
