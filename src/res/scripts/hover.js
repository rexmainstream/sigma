//This JS file contains hover functionality. When a user hovers over a table row this module is run
//Animations located in styles.css in public

//Default fade in element when hovered over
export function Show_element(e) {
    e.currentTarget.style.animation = `revert`;
    e.currentTarget.style.opacity = `1`;
}

//Default fade out when an element is hovered over
export function Fade_out_element(e) {
    e.currentTarget.style.animation = `fade_out 0.2s forwards`;
}

//When user hovers over table row, it plays a small animation that highlights the row.
export function Hover_table(e) { 
    e.currentTarget.style.animation = `highlight 0.2s ease-out both`
    e.currentTarget.nextElementSibling.style.animation = `highlight 0.2s ease-out both`;
    //console.log('hover function has run')
}

//Hover over secondary table row
export function Hover_table_secondary(e) {
    e.currentTarget.style.animation = `highlight 0.2s ease-out both`
    e.currentTarget.previousElementSibling.style.animation = `highlight 0.2s ease-out both`;
}

//When user's mouse leaves the table rows the row refreshes.
export function Time_out(e) {
    //console.log('time_out function has run')
    e.currentTarget.style.animation = `reset_background 0.3s ease-out both`;
    e.currentTarget.nextElementSibling.style.animation = `reset_background 0.3s ease-out both`;
}

export function Time_out_secondary(e) {
    e.currentTarget.style.animation = `reset_background 0.3s ease-out both`;
    e.currentTarget.previousElementSibling.style.animation = `reset_background 0.3s ease-out both`;
}

//when user hovers over a hidden button
export function Hover_buttons(e) {
    let tab_container = document.querySelector('.tab_container');

    e.currentTarget.querySelector('.slide_button').style.animation = `revert`;
    e.currentTarget.querySelector('.slide_button').style.opacity = `1`;
    tab_container.style.animation = `revert`;
    tab_container.style.opacity = `1`;
}

export function Time_out_button(e) {
    let tab_container = document.querySelector('.tab_container');

    e.currentTarget.querySelector('.slide_button').style.animation = `fade_out 0.2s forwards`;
    tab_container.style.animation = `fade_out 0.2s forwards`;
}


export function Hover_list_item(e) {
    e.currentTarget.classList.add('hovered_item');
}

export function Time_out_list_item(e) {
    e.currentTarget.classList.remove('hovered_item'); 
    e.currentTarget.style.backgroundColor = `rgba(242,242,242,0.7)`;
}

export function Show_checkmark(e) {
    //console.log('show_checkmark has run')
    let checkmark = e.currentTarget.querySelector('.checkmark');
    checkmark.style.borderBottom = `0.22rem solid rgb(124, 124, 124)`;
    checkmark.style.borderRight = `0.22rem solid rgb(124, 124, 124)`;
}


//Hides the checkmark when the user 
export function Hide_checkmark(e) {
    let checkmark = e.currentTarget.querySelector('.checkmark');
    checkmark.style.borderBottom = `0.22rem solid transparent`;
    checkmark.style.borderRight = `0.22rem solid transparent`;
}
