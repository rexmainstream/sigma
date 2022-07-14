import React from "react";
import {Vara} from "../../res/scripts/vara.js"
import { get_date } from "../calendar/rolyart-calendar";
import { custom_alert } from "../../res/scripts/add_alert.js";
import { faTwitter } from "@fortawesome/fontawesome-free-brands";
import { faWikipediaW } from "@fortawesome/fontawesome-free-brands"
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SatisfySL = require('./SatisfySL.json')


// This function gets the quote
function Get_quote () {
    const date1 = new Date('07/07/2022');
    const today = new Date(get_date().today.replace('-', ' '));
    const diff_time = Math.abs(today - date1)
    let diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));
    const array_length = Return_quote_list().length - 1;
    let today_quote

    if (diff_days > array_length) {
        while (diff_days > array_length){
            diff_days -= array_length + 1;
        }
    }

    today_quote = Return_quote_list(diff_days).quote;

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
    new Vara("#container", SatisfySL, [{
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
        window.scrollTo(0, 0);
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
                                <FontAwesomeIcon className="wiki_icon" icon = { faWikipediaW } />
                        </a>
                        <a 
                            className="icon_button twitter"
                            title="Tweet it"
                            aria-label="tweet quote"
                            href="https://twitter.com/intent/tweet" target="_blank">
                                <FontAwesomeIcon icon = { faTwitter }/>
                        </a>
                        <a 
                            className="icon_button copy_quote"
                            title="Copy"
                            aria-label="copy to clipboard">
                            <FontAwesomeIcon icon = { faClipboard } />
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

function Return_quote_list(index = 0) {
    const quotes = require('./quotes_lists.json');

    const return_val = {
        quote: quotes[index],
        list_length: quotes.length
    }

    // Debug
    // console.log("There are currently", return_val.list_length, "quotes in database.");
    return return_val;
}