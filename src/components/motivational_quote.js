import React from "react";
import Vara from "../res/scripts/vara.js"

let quote = {
    the_quote: "Defeat, my Defeat, my solitude and my aloofness. You are dearer to me than a thousand triumphs, And sweeter to my heart than all world-glory.",
    quote_author: "Khalil Gibran"
}

// This function gets the quote
function Get_quote () {
    //Gets the quote from database
    quote['the_quote'] = "Defeat, my Defeat, my solitude and my aloofness. You are dearer to me than a thousand triumphs, And sweeter to my heart than all world-glory."
    quote['quote_author'] = "Khalil Gibran"
    console.log("get_quote function has been run")
}

//this function writes the quote
//Too slow maybe just animate the quote author
function Write_quote() {
    let text_size = 25;
    let quote_duration = quote['the_quote'].length * 75
    let author_duration = quote['quote_author'].length * 200
    if (window.screen.width < 1000) {
        text_size = 40;
    }
    new Vara("#container", "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json", [{
        text: quote['the_quote'],
        quote_duration: quote_duration
    },{
        text: quote['quote_author'],
        y: 50,
        duration: author_duration
    }
        
    ], {
        fontSize: text_size,
        textAlign: 'center',
        strokeWidth: 1.2
    }  
    )
    console.log("Write quote has been executed")
}
export default function Motivational_quote() {
    return (
        <div className="box quote" onClick={() => Write_quote()} onAnimationStart={Get_quote}>
            <p><b>Quote of the Day</b></p>
            <blockquote id="quote_of_the_day">
                <div id="container">
                </div>
            </blockquote>
        </div>
    );
}

