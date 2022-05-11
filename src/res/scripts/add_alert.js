import { create_modal, exit_modal } from "./add_modal";

//Alert the user
//Created by ALEX
export function custom_alert(message_title, message_type, message_description, yes_function) {
    const code = 
    //HTML
        `<div class='content'>
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
    alert.className = 'center_vertical';

    const title = alert.querySelector(`h1`);
    const icon = alert.querySelector('i');
    const description = alert.querySelector(`.alert_desc`)
    const buttons = alert.querySelector(`.button_container`);
    const ok_button = document.createElement('button');
    let alert_width
    const yes_button = document.createElement('button');
    const no_button = document.createElement('button');

    alert.id = 'alert';
    alert.className = 'center_vertical'
    icon.className = 'alert_icon';
    ok_button.classList.add('clickable_button', 'exit_modal');
    icon.innerHTML = message_type;
    title.innerHTML = message_title;
    description.innerHTML = message_description;
    ok_button.innerHTML = "ok";

    //changes icon based on message type
    switch(message_type) {
        case `error`:
            icon.className = `material-icons`;
            buttons.append(ok_button);
            alert.focus();
            break;
        case `warning`:
            icon.className = `material-icons`;
            buttons.append(ok_button);
            alert.focus();
            break;
        case `warning_yes_no`:

            yes_button.classList.add('clickable_button');
            no_button.classList.add('clickable_button', 'delete_button', 'exit_modal');

            yes_button.innerHTML = 'Yes';
            no_button.innerHTML = 'No';

            buttons.append(yes_button, no_button)
            yes_button.addEventListener('click', (e) => {
                yes_function()
                exit_modal(e)
            })
            icon.className = `material-icons`;
            break;
        case `information`:
            icon.className = `fa fa-info-circle`;
            icon.innerHTML = ``;
            break;
    }

    //Adds exit event
    alert.querySelector('.exit_modal').addEventListener('click', (e) => exit_modal(e));
    
    //Changes width of alert based on screen resolution
    if (window.screen.width < 1000) {
        alert_width = '90vw';
    } else {
        alert_width = '50vw'
    }

    create_modal(alert_width, true, alert, false, true);
    ok_button.focus()
    yes_button.focus()
}
