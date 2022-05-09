//Initialisation module, occurs after DOM has been set.
import { initialise_calendar } from "../../components/dashboard/calendar_mini";
import { initialise_focus } from "../../components/focus/focus";
import { initialise_quotes } from "../../components/dashboard/motivational_quote";
import { initialise_timetable } from "../../components/dashboard/timetable_mini";
import { custom_alert } from "./add_alert";

export default function Initialisation() {
    document.addEventListener("DOMContentLoaded", function (){
        loading_screen();
        initialise_timetable();
        initialise_quotes();
        initialise_focus();
        initialise_calendar();


        
        

        
        //get data from API
    
        //Add lunch lines 
    
       
    })
}
//This function is the loading screen
function loading_screen() {
    
}