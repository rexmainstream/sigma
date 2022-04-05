//THis function adds an scroll event that executes whenever the user scrolls past a specified element
//Requires parameters for the element that will be scrolled to, the ouput function when it is scrolled and if it repeats or not
export function Add_scroll_event(the_element, output_function, repeat, extra_position) {
    window.addEventListener('scroll', function handler() {
        //Gets the position of the element and the position of the user
        let current_position = window.innerHeight;
        let element_position = the_element.getBoundingClientRect().top;
                
        //console.log(`Current position is at ${current_position}`);
        //console.log(`Element position is at ${element_position}`);


        if (current_position >= element_position+extra_position) {
            if (repeat === true) {
                output_function()
            } else {
                output_function()
                //If the event is not repeated then it deletes the event listener, which improves performance
                window.removeEventListener('scroll', handler)
            }
        }
    })
}

//Function adds a simple scroll event, e.g. scrolling down or scrolling up or just scrolling
export function Scrolling_event(element, up_down_both, output_function){
    let last_scroll = 0;
    element.addEventListener('scroll', (e) => {
        //gets current scroll position
        let current_scroll = element.pageYOffset;

        //if current position is smaller than last scroll position it is going down
        if(current_scroll > 0 && last_scroll <= current_scroll){
            // Scrolling Down with mouse
            if (up_down_both === 'down' || up_down_both === 'both') {
                output_function()
            }
            //console.log('Scroll Down');
          } else {
            // Scrolling Up with mouse
            if (up_down_both === 'up'|| up_down_both === 'both') {
                output_function()
            }
            //console.log('Scroll Up');
        }

        //sets last scroll to current
        last_scroll = current_scroll;
    })

}
