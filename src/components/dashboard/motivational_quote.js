import React from "react";
import Vara from "../../res/scripts/vara.js"
import {Add_scroll_event} from "../../res/scripts/scroll"
import {Return_quote_list, Return_quote_list_length} from "../../res/scripts/quotes_list"
import {Quote_list_initialisation} from "../../res/scripts/quotes_list"
import { get_date } from "../../res/scripts/rolyart-calendar.js";
import { custom_alert } from "../../res/scripts/add_alert.js";
import { useState } from "react/cjs/react.production.min";


// This function gets the quote
function Get_quote () {
    const date1 = new Date('04/22/2022');
    const today = new Date(get_date().today.replace('-', ' '));
    const diff_time = Math.abs(today - date1)
    let diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));
    const array_length = Return_quote_list_length() - 1;
    let today_quote

    if (diff_days > array_length) {
        while (diff_days > array_length){
            diff_days -= array_length + 1;
        }
    }

    today_quote = Return_quote_list(diff_days);

    //console.log("get_quote function has been run")
    //console.log(today_quote.quote_author)    
    //sets text content to the quote of the day
    document.querySelector('#quote_of_the_day').textContent = today_quote['the_quote'];
    Write_quote_author(today_quote);
}

//this function writes the quote
//Too slow maybe just animate the quote author
function Write_quote_author(today_quote) {
    let written_quote = `- ${today_quote['quote_author']} -`
    let container = document.querySelector('#container');
    const wiki_button = document.querySelector('.wiki_icon');
    let svg;
    const copy_button = document.querySelector('.copy_quote');
    const tweet_button = document.querySelector('.twitter');
    const clipboard_text = `${today_quote['the_quote']} -${today_quote['quote_author']}`
    const tweet_string = `"${today_quote['the_quote'].replace(/ /g, '%20')}"%0a%0a%23${today_quote['quote_author'].replace(/ /g, '').replaceAll('.',"")}%20%23quotes`;
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

    svg = container.querySelector('svg');
    svg.role = "img"
    svg.ariaLabel = "Quote Author";
    svg.setAttribute('alt', `${today_quote['quote_author']}`)

    wiki_button.addEventListener('click', () => {
        open_wiki_page(today_quote['quote_author'])
    })

    copy_button.addEventListener('click', () => {
        copy_text_to_clipboard(clipboard_text)
    });

    tweet_button.setAttribute('href', `https://twitter.com/intent/tweet?text=${tweet_string}`);
    
}


function play_slide_in_animation() {
    let quote_box = (document.querySelector('.quote')).querySelector('.box');
    const icons = quote_box.querySelectorAll('.icon_button');
    //Removes previous animation
    quote_box.style.animation = `none`;
    quote_box.style.animation = null; 
    //plays animation
    quote_box.style.animation = `bounce 1s ease-out both`; 

    //Reveals the quote
    document.querySelector("#quote_of_the_day").style.animation = `fade_in_text 0.5s ease-out both`;

    for(const icon of icons) {
        icon.classList.add('span');
    }
}

export default class Motivational_quote extends React.Component {
    componentDidMount() {
        initialise_quotes();
    }
    render() {
        return (
            <div className="quote">
                <h1>Quote of the Day</h1>   
                <div className="box">                  
                    <blockquote id="quote_of_the_day"></blockquote>
                    <div id="container"></div>
                    <div className="button_container">
                        <a 
                            className="icon_button"
                            aria-label="open wiki page"
                            title="Open Wiki page">
                            <svg 
                                version="1.1" 
                                id="Layer_1"
                                role={'img'} 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                x="0px" y="0px"
                                viewBox="0 0 458.723 458.723" 
                                style={{enableBackground:'new 0 0 458.723 458.723', fill:'currentcolor'}}
                                xmlSpace="preserve"
                                className="wiki_icon">
                                <path 
                                    style={{fill:"currentcolor"}}
                                    d="M455.724,93.489H367.32h-3v3v9.613v3h3h6.143c7.145,0,13.588,3.667,17.237,9.81
                                    c3.648,6.143,3.786,13.555,0.368,19.829l-98.3,180.432l-44.769-106.727l42.169-77.382c8.727-16.014,25.477-25.962,43.714-25.962
                                    h1.992h3v-3v-9.613v-3h-3H247.47h-3v3v9.613v3h3h6.143c7.145,0,13.588,3.667,17.237,9.81c3.648,6.143,3.786,13.555,0.368,19.829
                                    l-30.587,56.143L213.372,129.9c-1.976-4.71-1.487-9.852,1.341-14.105s7.38-6.693,12.488-6.693h6.988h3v-3v-9.613v-3h-3H128.46h-3v3
                                    v9.613v3h3h1.454c20.857,0,39.546,12.428,47.615,31.661l40.277,96.018l-44.887,82.392L93.523,129.9
                                    c-1.976-4.71-1.487-9.852,1.341-14.105s7.38-6.693,12.488-6.693h10.737h3v-3v-9.613v-3h-3H3H0v3v9.613v3h3h7.064
                                    c20.857,0,39.547,12.428,47.615,31.661l91.526,218.191c1.601,3.816,5.313,6.282,9.458,6.282c3.804,0,7.163-1.998,8.986-5.344
                                    l11.939-21.91l45.582-83.646l43.884,104.617c1.601,3.816,5.313,6.282,9.458,6.282c3.804,0,7.163-1.998,8.986-5.344l11.939-21.91
                                    l110.58-202.919c8.727-16.014,25.477-25.962,43.714-25.962h1.992h3v-3v-9.613v-3h-2.999V93.489z"
                                />
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                            </svg>
                        </a>
                    <a 
                        className="icon_button twitter"
                        title="Tweet it"
                        aria-label="tweet quote"
                        href="https://twitter.com/intent/tweet" target="_blank">
                            <i className="fa fa-twitter"></i>
                    </a>
                    <a 
                        className="icon_button copy_quote"
                        title="Copy"
                        aria-label="copy to clipboard">
                        <i className="fa fa-clipboard"></i>
                    </a>
                    </div>
                </div>
            </div>
        );
    }
}

export function initialise_quotes() {
    const quote = document.querySelector('.quote');
    const heading = quote.querySelector('h1');
    Quote_list_initialisation();
    //Adds scroll events, change to loop later
    Get_quote();
    play_slide_in_animation();
}

function open_wiki_page(author) {
    let url = `https://en.wikipedia.org/wiki/`
    let quote_author = author.replace(/ /g, '_');

    url += quote_author;

    if (quote_author != 'unknown') {
        window.open(url, '_blank').focus();
    } else {
        custom_alert('No such article exists', 'warning',`The author of this quote does not have a Wikipedia article.`)
    }
}
 
function copy_text_to_clipboard(text) {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(text).then(function() {

    }, function() {
      custom_alert('Could not copy text', 'error', 'This operation could not be completed.')
    });
  }