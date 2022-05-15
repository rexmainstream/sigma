import { return_events_list } from "./rolyart-calendar"

//Requires an event. Serches for exact event in event_list and returns index
//Linear Search since the events_list is unsorted
export function return_event_index(the_event){
    const events_list = return_events_list();

    for (let arr_index = 0; arr_index<=events_list.length-1; arr_index++) {
        if (the_event.title === events_list[arr_index].title 
            && the_event.description === events_list[arr_index].description
            && the_event.priority === events_list[arr_index].priority
            && the_event.completed === events_list[arr_index].completed) {
            return arr_index
            break;
        }
    }

}

export function sort_events_by_date() {
}
