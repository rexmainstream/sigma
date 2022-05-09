
//This function adds a css inline animation to an element, 
//This is used because the classes are not sufficent enough for repeating animations
export default function add_inline_animation(element, animation_name, duration, timing, direction, fill_mode, animation_end_function) {
    let animation = "";
    const animation_properties = [];
    animation_properties.push(animation_name, duration, timing, direction, fill_mode);

    for (const property of animation_properties) {
        if (property !== "") {
            animation += ` ${property}`;
        }
    }
    //console.log(animation);
    if (element.style.animation !== "") {
        element.style.animation = ""
    }
    
    element.style.animation = animation;

    //Removes the inline animation when it ends
    element.addEventListener("animationend", function handler() {
        if (animation_end_function !== false) {
            animation_end_function()
        }
        element.style.animation = "";
        element.removeEventListener('animationend', handler)
    })
}