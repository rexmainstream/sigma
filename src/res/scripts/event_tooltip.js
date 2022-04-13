import { return_events_list } from "./rolyart-calendar";

let timeoutID
let timeoutID2
let hovering_over_tooltip = false;

export function event_tooltip(e, index) {
    const tooltip = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('textarea');
    const due_date = document.createElement('p');
    const priority = document.createElement('p');
    const events_list = return_events_list();
    timeoutID = setTimeout(function() {
        clearTimeout(timeoutID2)
        clearTimeout(timeoutID);

        tooltip.classList.add('event_tooltip', 'show_tooltip');
        title.textContent = events_list[index].title;

        if (events_list[index].description.replace(/\r?\n|\r/g, "") === '' || events_list[index].description.replace(/\s+/g, '') === '') {
            description.value = 'This event has no description';
        } else {
            description.value = events_list[index].description;
        }
        priority.textContent = `Priority: ${events_list[index].priority}`;
        due_date.textContent = `Due date: ${events_list[index].due_date}`;
        description.className = 'event_description';
        description.setAttribute('readonly', 'true')

        tooltip.append(title, due_date, priority, description);
        e.target.appendChild(tooltip);

        tooltip.addEventListener('mouseenter', () => {
            hovering_over_tooltip = true;
            tooltip.classList.remove('show_tooltip');
        })
        tooltip.addEventListener('mouseleave', () => {
            hovering_over_tooltip = false;
        })

        tooltip.addEventListener('animationend', function handler() {
            tooltip.classList.remove('show_tooltip');
            tooltip.removeEventListener('animationend', handler);
        })
    }, 750)
}

export function tooltip_time_out() {
    const tooltip = document.querySelector('.event_tooltip');
    clearTimeout(timeoutID);
    if (hovering_over_tooltip === false) {
        timeoutID2 = setTimeout(function() {
            if (document.querySelectorAll('.event_tooltip').length !== 0) {
                tooltip.classList.add('hide_tooltip');
        
                tooltip.addEventListener('animationend', function handler() {
                    tooltip.parentElement.removeChild(document.querySelector('.event_tooltip'));
                    tooltip.removeEventListener('animationend', handler);
                })            
            }
        }, 750)
    }
}