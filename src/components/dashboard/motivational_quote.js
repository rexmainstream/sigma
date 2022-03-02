import React from "react";
import Vara from "../../res/scripts/vara.js"
import {Add_scroll_event} from "../../res/scripts/scroll"


let quote = {
    the_quote: "Me, We", //Default quote
    quote_author: "Muhammad Ali"
}

// This function gets the quote
function Get_quote () {
    //Gets the quote from database
    quote['the_quote'] = "To live is to suffer, to survive is to find meaning in suffering."
    quote['quote_author'] = "Friedrich Nietzsche"


    //sets text content to the quote of the day
    document.querySelector('#quote_of_the_day').textContent = quote['the_quote'];
    console.log("get_quote function has been run")
}

//this function writes the quote
//Too slow maybe just animate the quote author
function Write_quote_author() {
    let text_size = 25;
    let quote_duration = quote['quote_author'].length * 250
    if (window.screen.width < 1000) {
        text_size = 50;
    }
    new Vara("#container", "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json", [{
        text: quote['quote_author'],
        y: text_size,
        delay: 1000,
        quote_duration: quote_duration
    }        
    ], {
        fontSize: text_size,
        textAlign: 'center',
        strokeWidth: 1.3
    }  
    )
    console.log("Write quote has been executed")
}
export default function Motivational_quote() {
    return (
        <div className="box quote">
            <p><b>Quote of the Day</b></p>
            <blockquote id="quote_of_the_day"></blockquote>
            <div id="container"></div>
        </div>
    );
}

//Document load
document.addEventListener("DOMContentLoaded", function(){
    Get_quote(); //Gets the quote

    //Adds scroll events, change to loop later
    Add_scroll_event(document.querySelector('.quote'), function() {
        //plays animation
        document.querySelector(".quote").style.animation = `fade_in 0.5s ease-out both`; 
        document.querySelector(".quote").style.visibility = "visible";

        //Reveals the quote
        document.querySelector("#quote_of_the_day").style.animation = `fade_in_text 0.5s ease-out both`;   
        
        Write_quote_author()
    }, false)
})


 