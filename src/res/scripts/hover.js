//This JS file contains hover functionality. When a user hovers over a table row this module is run
//Animations located in styles.css in public
export function Hover(e) { //When user hovers over table row, it plays a small animation that highlights the row.
    e.currentTarget.style.animation = `highlight 0.4s ease-out both`
    e.currentTarget.nextElementSibling.style.animation = `highlight 0.4s ease-out both`;
    console.log('hover function has run')
}

export function Time_out(e) {//When user's mouse leaves the table rows the row refreshes.
    console.log('time_out function has run')
    e.currentTarget.style.animation = `remove_highlight 0.3s ease-out both`;
    e.currentTarget.nextElementSibling.style.animation = `remove_highlight 0.3s ease-out both`;
}