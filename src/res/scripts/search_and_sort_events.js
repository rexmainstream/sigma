import { custom_alert } from "./add_alert";

// Insertion sort for events
export function sort_events_alphabetically(events_array, the_event) {
    let position;
    // Found position flag if the correct index has been found
    let found_position = false

    // Previous item is stored in a variable to swap
    let prev_item


    for (let i = 0; i < events_array.length; i++) {

        // If not found yet then it keeps checking
        if (found_position === false) {
            
            // Compares the event titles alphabetically
            if (compare_alphabetically(the_event.title, events_array[i].title)) {

                found_position = true;
                prev_item = events_array[i];
                events_array[i] = the_event;
                position = i;

                for (let c = i + 1; c < events_array.length; c++) {
                    // Shuffles the following items to make space for item
                    const temp = events_array[c];
                    events_array[c] = prev_item;
                    prev_item = temp;
                }
            }
        }
    }

    // Appends to the end if the not found position
    if (found_position === false) {
        events_array.push(the_event);
        position = events_array.length - 1;
    } else {

        // Puts the final previous item at the end of array.
        events_array.push(prev_item);
    }

    return position;
}

// Compares if two strings are alphabetically superior or not
export function compare_alphabetically(string1, string2) {
    if (string1.localeCompare(string2) < 0) {
        return true;
    } else {
        return false;
    }
}
