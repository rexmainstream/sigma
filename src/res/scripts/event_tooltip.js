import { return_events_list } from "./rolyart-calendar";

let timeoutID
let timeoutID2
let currently_mouse_over = false

export function event_tooltip(e, index) {
    const tooltip = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('textarea');
    const due_date = document.createElement('p');
    const priority = document.createElement('p');
    const events_list = return_events_list();
    const existing_tooltips = document.querySelectorAll('.event_tooltip');
        timeoutID = setTimeout(function() {
            if (document.querySelectorAll('.event_tooltip').length === 0) {
                clearTimeout(timeoutID);
                clearTimeout(timeoutID2);        
                
                tooltip.addEventListener('mouseenter', () => {
                    currently_mouse_over = true;
                }) 
                
                tooltip.addEventListener('mouseleave', (e) => {
                    currently_mouse_over = false;
                    tooltip_time_out(e)
                })

            } else if (currently_mouse_over === false) {
                for (const existing_tooltip of existing_tooltips) {
                    existing_tooltip.classList.add('hide_tooltip');
                    existing_tooltip.addEventListener('animationend', function handler() {
                        existing_tooltip.removeEventListener('animationend', handler);
                    }) 
                };
            }

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
                description.setAttribute('readonly', 'true');

                tooltip.append(title, due_date, priority, description);
                e.target.parentNode.appendChild(tooltip);

                tooltip.addEventListener('animationend', function handler() {
                    tooltip.classList.remove('show_tooltip');
                    tooltip.removeEventListener('animationend', handler);
                })
                
        }, 750);
   
}

export function tooltip_time_out(e) {
    e.stopPropagation();
    const tooltips = document.querySelectorAll('.event_tooltip');
    clearTimeout(timeoutID);
    clearTimeout(timeoutID2)
    timeoutID2 = setTimeout(function() { 
        if (tooltips.length !== 0 && currently_mouse_over === false) {
            for (const tooltip of tooltips) {
                tooltip.classList.add('hide_tooltip');
                tooltip.addEventListener('animationend', function handler() {
                    tooltip.parentNode.removeChild(tooltip);
                    clearTimeout(timeoutID2);
                    tooltip.removeEventListener('animationend', handler);
                }) 
            };       
        };
    }, 600)
}