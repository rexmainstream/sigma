let table_main_rows
const delay = ms => new Promise(res => setTimeout(res, ms))

//This subroutine assigns some variables when the webpage loads
function web_page_loaded() {
    table_main_rows = document.querySelectorAll('.main_line');

    for (i = 0; i < table_main_rows.length; i++) {
        table_main_rows[i].addEventListener('mouseover', function () { hover(event); });
        table_main_rows[i].addEventListener('mouseout', function () { time_out(event); });
    }
}

//This subroutine will outline hovered element
function hover(event) {
    event.currentTarget.style.backgroundColor = `rgb(209,231,246)`;
    event.currentTarget.nextElementSibling.style.backgroundColor = `rgb(209,231,246)`;
    console.log('hover.js has been run');
}

// reset the color
function time_out(event) {
    event.currentTarget.style.backgroundColor = `white`;
    event.currentTarget.nextElementSibling.style.backgroundColor = `white`;
    console.log('time_out.js has been run')
}


window.addEventListener('DOMContentLoaded', function () { web_page_loaded(); })
