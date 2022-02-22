//THis function adds an scroll event that executes whenever the user scrolls past a specified element
//Requires parameters for the element that will be scrolled to, the ouput function when it is scrolled and if it repeats or not
export function Add_scroll_event(the_element, output_function, repeat) {
    window.addEventListener('scroll', function handler() {
        //Gets the position of the element and the position of the user
        let current_position = (document.body.getBoundingClientRect()).top;
        let element_position = (the_element.getBoundingClientRect()).top;
                
        console.log(current_position)
        console.log(element_position)
        if (current_position <= element_position) {
            if (repeat === true) {
                output_function()
            } else {
                output_function()
                //If the event is not repeated then it deletes the event listener
                window.removeEventListener('scroll', handler)
            }
        }
    })
}