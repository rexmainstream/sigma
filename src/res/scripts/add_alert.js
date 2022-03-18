import { create_modal, exit_modal } from "./add_modal";

//Alert the user
//Created by ALEX
export function custom_alert(message_title, message_type, message_description) {
    const code = 
    //HTML
        `<div>
            <div>
                <i inline></i>
                <h1 class="alert_title">
                        
                </h1>
            </div>
            <p class='alert_desc'>
                
            </p>
            <div class='button_container center_vertical'>
            
            </div>
        </div>`


    const alert = document.createElement('div');
    alert.innerHTML = code;

    const title = alert.querySelector(`h1`);
    const icon = alert.querySelector('i');
    const description = alert.querySelector(`.alert_desc`)
    const buttons = alert.querySelector(`.button_container`);
    let alert_width

    alert.id = 'alert';
    alert.className = 'center_vertical'
    icon.className = 'alert_icon';
    icon.innerHTML = message_type;
    title.innerHTML = message_title;
    description.innerHTML = message_description;

    //changes icon based on message type
    switch(message_type) {
        case `error`:
            icon.className = `material-icons`;
            buttons.innerHTML = 
                `<button class='clickable_button exit_modal'>Yes</button>
                <button class='clickable_button exit_modal delete_button'>No</button>`
            break;
        case `warning`:
            icon.className = `material-icons`;
            buttons.innerHTML = `<button class='clickable_button exit_modal'>OK</button>`
            break;
        case `information`:
            icon.className = `fa fa-info-circle`;
            icon.innerHTML = ``;
            break;
    }

    //Adds exit event
    alert.querySelector('.exit_modal').addEventListener('click', exit_modal);
    
    //Changes width of alert based on screen resolution
    if (window.screen.width < 1000) {
        alert_width = '75vw';
    } else {
        alert_width = '50vw'
    }

    create_modal(alert_width, true, alert, false);


}
