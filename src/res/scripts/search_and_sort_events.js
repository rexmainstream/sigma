import { custom_alert } from "./add_alert";
import { return_events_list } from "./rolyart-calendar"

//Requires an event. Serches for exact event in event_list and returns index
//Linear Search since the events_list is unsorted
export function return_event_index1(the_event){
    const events_list = return_events_list();

    for (let arr_index = 0; arr_index<=events_list.length-1; arr_index++) {
        if (the_event.title === events_list[arr_index].title 
            && the_event.description === events_list[arr_index].description
            && the_event.priority === events_list[arr_index].priority
            && the_event.completed === events_list[arr_index].completed) {
            return arr_index
        }
    }

}


//Binary search for the event list which is sorted by date
export function return_event_index(the_event){
    const events_list = return_events_list();
    let low = 0;
    let high = events_list.length - 1;
    let found = false;

    //This loop finds the range
    while(high >= low && found === false) {
        let middle = Math.floor((low + high)/2);
        const searched_event_due_date = new Date(the_event.due_date);
        const index_date = new Date(events_list[middle].due_date);
        const date_diff = searched_event_due_date - index_date;

        if (date_diff < 0) {
            high = middle - 1;
        } else if (date_diff === 0) {
            found = true;
            if (equal_event(the_event, middle)) {
                //Prevents worse case scenario where middle is the index.
                //Cuts the events searched at least down to half
                return middle;
            } else {
                //This loop finds the correct index within the range
                for (let arr_index = low; arr_index<=high; arr_index++) {
                    if (equal_event(the_event, arr_index)) {
                        return arr_index
                    }
                }
            }

        } else {
            low = middle + 1;
        }
    }    
}

//Binary search for date. Returns range
export function return_event_range(date) {
    const events_list = return_events_list();
    let low = 0;
    let high = events_list.length - 1;
    let found = false;

    while(high >= low && found === false) {
        let middle = Math.floor((low + high)/2);
        const searched_event_due_date = new Date(date);
        const index_date = new Date(events_list[middle].due_date);
        const date_diff = searched_event_due_date - index_date;

        if (date_diff < 0) {
            high = middle - 1;
        } else if (date_diff === 0) {
            found = true;
            let range = {
                high: high,
                low: low
            }  
            return range; 
        } else {
            low = middle + 1;
        }
    }  

    //Returns 0 if no range is found
    if (found === false) {
        const range = {
            high: 0,
            low: 0
        }
        return range;
    }

}
//Checks for equal events
function equal_event(the_event, index) {
    const events_list = return_events_list();
    if (the_event.title === events_list[index].title
        && the_event.due_date === events_list[index].due_date 
        && the_event.description === events_list[index].description
        && the_event.priority === events_list[index].priority
        && the_event.completed === events_list[index].completed) {
        return true;
    } else {
        return false;
    }
}

//Bubble sort, sorts the local array by date
//Reduces processing for searching and sorting later on
export function sort_events_by_date() {
    const events_list = return_events_list();
    let swapped = true;
    let pass = 1;
    

    while (swapped === true) {
        swapped = false;
        let comparison = 0;

        //Arranges events_list into ascending date (nearest to current date first)
        while (comparison < events_list.length - pass) {
            const first_date = new Date(events_list[comparison].due_date);
            const second_date = new Date(events_list[comparison + 1].due_date);
            const difference = first_date - second_date;
            const temp = events_list[comparison];
            if(difference >= 0) {
                //Sort title by alphabetical order
                if (difference === 0 && temp.title.localeCompare(events_list[comparison + 1].title) > 0) {
                    events_list[comparison] = events_list[comparison + 1];
                    events_list[comparison + 1] = temp;
                    swapped = true;
                } else if(difference > 0) {
                    //Swap dates if due_date is closer
                    events_list[comparison] = events_list[comparison + 1];
                    events_list[comparison + 1] = temp;
                    swapped = true;
                }
            } else {

            }
            comparison += 1;
        }
        pass += 1;
    }
}

export function event_insertion_sort(the_event) {
    const events_list = return_events_list();
    let comparison = 1;
    let num_items = events_list.length - 1;
    let finish = false;

    while (comparison < num_items && finish === false) {
        const the_event_due_date = new Date(the_event.due_date);
        const compared_item_due_date = new Date(events_list[comparison].due_date)
        const date_diff = the_event_due_date - compared_item_due_date;

        if (date_diff > 0) {
            
        }
        comparison += 1;
    }
}