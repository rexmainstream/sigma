import React from "react";
import { Vara } from "../../res/scripts/vara.js"
import { get_date } from "../calendar/rolyart-calendar";
import { custom_alert } from "../../res/scripts/add_alert.js";
import { faTwitter } from "@fortawesome/fontawesome-free-brands";
import { faWikipediaW } from "@fortawesome/fontawesome-free-brands"
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { check_mobile } from "../../res/scripts/check_mobile.js";
// This function gets the quote
function Get_quote () {
    // Gets the date
    const date1 = new Date('07/19/2022');
    const today = new Date(get_date().today.replace('-', ' '));
    // FInds difference
    const diff_time = Math.abs(today - date1);

    // Gets difference in date
    let diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));

    // Finds the length
    const array_length = Return_quote_list().length - 1;
    let today_quote

    // Minuses it if the array length is smaller
    if (diff_days > array_length) {
        while (diff_days > array_length){
            diff_days -= array_length + 1;
        }
    }
    // sets the todayquote tot the diff_days index
    today_quote = Return_quote_list(diff_days).quote;

    // Debug
    // today_quote = Return_quote_list(675).quote;

    //console.log("get_quote function has been run")
    //console.log(today_quote.quote_author)    
    //sets text content to the quote of the day
    // document.querySelector('#quote_of_the_day').textContent = today_quote.the_quote;
    Write_quote_author(today_quote);
}

//this function writes the quote
//Too slow maybe just animate the quote author
function Write_quote_author(today_quote) {
    // sets the written quote which includes two hyphens
    let written_quote = `- ${today_quote['quote_author']} -`
    // let container = document.querySelector('#container');
    // const wiki_button = document.querySelector('.wiki_icon');
    // let svg;
    // const copy_button = document.querySelector('.copy_quote');
    // const tweet_button = document.querySelector('.twitter');
    // const clipboard_text = `${today_quote['the_quote']} -${today_quote['quote_author']}`
    // const tweet_string = `"${today_quote['the_quote'].replace(/ /g, '%20')}"%0a%0a%23${today_quote['quote_author'].replace(/ /g, '').replaceAll('.',"")}%20%23quotes`;
    //console.log(written_quote.length);
    let text_size = 25;

    let font = require('./fonts/my_font2.json');
    let stroke_width = 0.7;
    let duration = written_quote.length * 200;
    let letter_spacing = 1;
    let color = 'black';


    // Popular quote authors get there own writing styles
    switch (today_quote['quote_author']) {
        case 'Walt Disney':
            // Disney gets his iconic handwriting
            font = require('./fonts/walt_disney.json')
            stroke_width = 0.4;
            duration = written_quote.length * 300;
            break;
        case 'Pablo Picasso':
            // Picasso gets his own font
            font = require('./fonts/picasso.json');
            stroke_width = 0.9;
            break;   
        // Greek dudes
        case 'Aristotle':
        case 'Alexander the Great':
        case 'Socrates':
        case 'Aristotle':
        case 'Plato':
        case 'Archimedes':
        case 'Aesop':
        case 'Euripides':
        case 'Agesilaus':
        case 'Sophocles':
        case 'Greek Proverb':
        case 'Antisthenes':
        case 'Hippocrates':
        case 'Pericles':
        case 'Epicurus':
            font = require('./fonts/greek.json');
            stroke_width = 0.6;
            break;
        //Renaissance
        case 'William Shakespeare':
        case 'Francis Bacon':
        case 'Rene Descartes':
            font = require('./fonts/SatisfySL.json');
            stroke_width = 1.3
            break;
        // Medieval
        case 'Joan of Arc':
        case 'Francis Drake':
        case 'Martin Luther':
        case 'Niccolo Machiavelli':
        case 'Dante Alighieri':
            font = require('./fonts/medieval.json');
            stroke_width = 0.8;
            text_size = 18;
            break;
        // Victorian England 19th century
        case 'John Keats':
        case 'William Wordsworth':
        case 'Alfred Tennyson':
        case 'Charles Dickens':
        case 'Lord Byron':
        case 'Jane Austen':
        case 'Oscar Wilde':
            font = require('./fonts/Pacifico.json');
            text_size = 15;
            stroke_width = 2;
            break;
        // Horror Writers
        case 'Edgar Allan Poe':
        case 'Stephen King':
        case 'H. P. Lovecraft':
            font = require('./fonts/my_font1.json');
            stroke_width = 1.2;
            // color = '#ac0404';
            break;
        case 'Unknown':
            font = require('./fonts/Shadows_into_light.json');
            stroke_width = 1;
            break;
        // The french
        case 'Victor Hugo':
        case 'Antoine de Saint-Exupery':
        case 'Marcel Proust':
        case 'Voltaire':
        case 'Napoleon Bonaparte':
        case 'Claude Debussy':
        case 'Maximilien Robespierre':
        case 'Simone Weil':
        case 'Alexandre Dumas':
        case 'Coco Chanel':
        case 'Jean Luc Godard':
            font = require('./fonts/Parisienne.json');
            stroke_width = 1.5;
            break;
        // Famous Romans
        case 'Marcus Aurelius':
        case 'Virgil':
        case 'Cato the Elder':
        case 'Seneca':
        case 'Julius Caesar':
        case 'Augustus':
        case 'Hypatia':
        case 'Ovid':
        case 'Latin Proverb':
        case 'Titus Maccius Plautus':
        case 'Publilius Syrus':
        case 'Publius Vergilius Maro':
        case 'Quintus Horatius Flaccus':
        case 'Marcus Tullius Cicero':
        case 'Pompey':
            font = require('./fonts/roman.json')
            stroke_width = 0.7;
            text_size = 25;
            letter_spacing = 5;
            break;
        // Russians
        case 'Leo Tolstoy':
        case 'Mikhail Zadornov':
        case 'Aleksandr Solzhenitsyn':
        case 'Fyodor Dostoevsky':
        case 'Anton Chekhov':
        case 'Alexander Pushkin':
        case 'Maxim Gorky':
        case 'Vladimir Nabokov':
        case 'Leon Trotsky':
        case 'Vladimir Ilyich Lenin':
        case 'Joseph Stalin':
        case 'Dmitri Shostakovich':
        case 'Igor Stravinsky':
            font = require('./fonts/russian.json')
            break;
    }

    if (check_mobile()) {
        text_size = text_size * 2;
    }


    new Vara("#container", font, [{
        text: written_quote,
        y: text_size,
        delay: 200,
        duration: duration
    }        
    ], {
        fontSize: text_size,
        textAlign: 'center',
        color: color,
        strokeWidth: stroke_width,
        letterSpacing: letter_spacing,
    }  
    )

    document.querySelector('#quote_of_the_day').textContent = today_quote.quote;
    //console.log("Write quote has been executed")

    // svg = container.querySelector('svg');
    // svg.ariaLabel = "Quote Author";
    // svg.setAttribute('alt', `${today_quote['quote_author']}`)

    // wiki_button.addEventListener('click', () => {
    //     open_wiki_page(today_quote['quote_author'])
    // })

    // copy_button.addEventListener('click', () => {
    //     copy_text_to_clipboard(clipboard_text)
    // });

    // tweet_button.setAttribute('href', `https://twitter.com/intent/tweet?text=${tweet_string}`);
    
}

export default class Motivational_quote extends React.Component {
    componentDidMount() {
        // When component is mounted initialise the quotes
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
    //Adds scroll events, change to loop later
    Get_quote();
    // play_slide_in_animation();
}

// Opens the wiki page
function open_wiki_page(author) {
    let url = `https://en.wikipedia.org/wiki/`
    let quote_author = author.replace(/ /g, '_');

    // Gets url
    url += quote_author;

    if (quote_author != 'unknown') {
        window.open(url, '_blank').focus();
    } else {
        custom_alert('No such article exists', 'warning',`The author of this quote does not have a Wikipedia article.`)
    }
}
 
// Copu to clipboard
function copy_text_to_clipboard(text) {
    if (!navigator.clipboard) {
      return;
    }
    // Adds text to clipboard
    navigator.clipboard.writeText(text).then(function() {

    }, function() {
      custom_alert('Could not copy text', 'error', 'Could not copy quote to clipboard.')
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