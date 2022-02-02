let table_rows

//This subroutine assigns some variables when the webpage loads
function web_page_loaded() {
    table_rows = document.querySelectorAll('.main_line');
    for (i = 0; i < table_rows.length; i++) {
        table_rows[i].addEventListener('mouseover', function () { hover(event); });
        table_rows[i].addEventListener('mouseout', function () { time_out(event); });
    }
}


//This subroutine will outline hovered element
function hover(event) {
    event.currentTarget.style.backgroundColor = `rgb(209,231,246)`;
    console.log('hover.js has been run');

}

function time_out(event) {
    event.currentTarget.style.backgroundColor = `white`;
    console.log('time_out.js has been run')
}

// reset the color after a short delay


window.addEventListener('DOMContentLoaded', function () { web_page_loaded(); })
