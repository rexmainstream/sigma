//Initialisation module, occurs after DOM has been set.
import { initialise_calendar } from "../../components/dashboard/calendar_mini";
import { initialise_focus } from "../../components/focus/focus";
import { initialise_quotes } from "../../components/quote/motivational_quote";
import { initialise_timetable } from "../../components/dashboard/timetable_mini";
import { custom_alert } from "./add_alert";

export default function Initialisation() {
    console.log(
        `
        88                                            
        ""                                            
                                                      
,adPPYba, 88  ,adPPYb,d8 88,dPYba,,adPYba,  ,adPPYYba,  
I8[    "" 88 a8"    'Y88 88P'   "88"    "8a ""     'Y8  
'"Y8ba,  88 8b       88 88      88      88 ,adPPPPP88  
aa    ]8I 88 "8a,   ,d88 88      88      88 88,    ,88  
'"YbbdP"' 88  '"YbbdP"Y8 88      88      88 '"8bbdP"Y8       inc.
            aa,    ,88                                
             "Y8bbdP"                                 
        `
    )
}
//This function is the loading screen
function loading_screen() {
}

document.addEventListener('DOMContentLoaded', () => {
    Initialisation();
})