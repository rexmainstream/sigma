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

// This sort is for the full calendar
export function bubble_sort_events_alphabetically(events_list) {
    let swapped = true;
    const length = events_list.length - 1;
    let pass = 0;

    while (swapped === true) {
        swapped = false;
        for (let i = 0; i < length - pass; i++) {
            // compares events alphabetically
            if (compare_alphabetically(events_list[i].title, events_list[i + 1].title) === false) {

                // Swaps events if out of place
                const temp = events_list[i];
                events_list[i] = events_list[i + 1];
                events_list[i + 1] = temp;
                swapped = true;

                
            }
        }

        // Increments pass
        pass++;
    }
    
    return events_list;
}


// Sorts events by priority
export function bubble_sort_events_priority(events_list) {
    let swapped = true;
    const length = events_list.length - 1;
    let pass = 0;

    while (swapped === true) {
        swapped = false;
        
        for (let i = 0; i < length - pass; i++) {

            // Convert priority strings to integer
            const event_priority_1 = priority_to_integer(events_list[i].priority);
            const event_priority_2 = priority_to_integer(events_list[i + 1].priority);


            // Debug
            // console.log(events_list[i].priority)
            // console.log(event_priority_1, event_priority_2)

            // Compares the priorities
            if (event_priority_1 < event_priority_2) {

                // If out of place swaps
                const temp = events_list[i];
                events_list[i] = events_list[i + 1];
                events_list[i + 1] = temp;
                swapped = true;                
            }
        }

        // Increments pass
        pass++;
    }

    return events_list;
}

// Converts priority to string
function priority_to_integer(priority_str) {
    let return_value;

    switch (priority_str) {
        case 'High':
            return_value = 3;
            break;
        case 'Medium':
            return_value = 2;
            break;
        case 'Low':
            return_value = 1; 
            break;           
    }

    return return_value;
}

// Compares if two strings are alphabetically superior or not
export function compare_alphabetically(string1, string2) {
    if (string1.localeCompare(string2) < 0) {
        return true;
    } else {
        return false;
    }
}

