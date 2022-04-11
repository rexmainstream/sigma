import React from "react";
import Vara from "../../res/scripts/vara.js"
import {Add_scroll_event} from "../../res/scripts/scroll"
import {Return_quote_list, Return_quote_list_length} from "../../res/scripts/quotes_list"
import {Quote_list_initialisation} from "../../res/scripts/quotes_list"


//generates random number for the quote
function random_number_generator(min, max) {
    return Math.round(Math.random() *(max - min) + min);
}


// This function gets the quote
function Get_quote () {
    let today_quote = Return_quote_list(random_number_generator(0,Return_quote_list_length() - 1));
    //console.log("get_quote function has been run")
    //console.log(today_quote.quote_author)

    
    //sets text content to the quote of the day
    document.querySelector('#quote_of_the_day').textContent = today_quote['the_quote'];
    Write_quote_author(today_quote)
}

//this function writes the quote
//Too slow maybe just animate the quote author
function Write_quote_author(today_quote) {
    let written_quote = `- ${today_quote['quote_author']} -`
    //console.log(written_quote.length);
    let text_size = 25;
    
    if (window.screen.width < 1000) {
        text_size = 50;
    }
    new Vara("#container", "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json", [{
        text: written_quote,
        y: text_size,
        delay: 200,
        quote_duration: written_quote.length * 250
    }        
    ], {
        fontSize: text_size,
        textAlign: 'center',
        strokeWidth: 1.3
    }  
    )
    //console.log("Write quote has been executed")
}

function play_slide_in_animation() {
    let quote_box = (document.querySelector('.quote')).querySelector('.box');
    //Removes previous animation
    quote_box.style.animation = `none`;
    quote_box.style.animation = null; 
    //plays animation
    quote_box.style.animation = `fade_in 0.5s ease-out both`; 

    //Reveals the quote
    document.querySelector("#quote_of_the_day").style.animation = `fade_in_text 0.5s ease-out both`;  
}

export default function Motivational_quote() {
    return (
        <div className="quote">
            <h1>Quote Generator</h1>   
            <div className="box">                  
                <blockquote id="quote_of_the_day"></blockquote>
                <div id="container"></div>
                {/*<button className="clickable_button"
                    onClick={function() {
                        let old_quote = document.querySelector('#container').querySelector('svg');

                        
                        old_quote.remove();
                        Get_quote();
                        play_slide_in_animation();
                    }}
                    title="Click to generate a new quote">
                    Generate New Quote</button>*/}
            </div>
        </div>
    );
}

export function initialise_quotes() {
    const quote = document.querySelector('.quote');
    const heading = quote.querySelector('h1');
    Quote_list_initialisation();
    //Adds scroll events, change to loop later
    Add_scroll_event(quote.querySelector('.box'), function() {Get_quote(); play_slide_in_animation()}, false, 200, 'down');
    Add_scroll_event(heading, function() {heading.style.animation = `fade_in_text 0.5s ease-out both`;}, false, 200, 'down')
}

 