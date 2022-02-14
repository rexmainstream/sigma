function hover(e) { //When user hovers over table row, it highlights the whole row. Can add more features later.
    console.log('hover function has run')
    e.currentTarget.style.backgroundColor = `rgb(209,231,246)`;
    e.currentTarget.nextElementSibling.style.backgroundColor = `rgb(209,231,246)`;
}

function time_out(e) {//When user's mouse leaves the table rows the row refreshes.
    console.log('time_out function has run')
    e.currentTarget.style.backgroundColor = `white`;
    e.currentTarget.nextElementSibling.style.backgroundColor = `white`;
}

