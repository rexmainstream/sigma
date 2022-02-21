import React from "react";

function hover(e) { //When user hovers over table row, it plays a small animation that highlights the row.
    //Maybe add extra features such as changing the other font colours to a lighter colour to focus on the highlighted one
    e.currentTarget.style.animation = `highlight 0.4s ease-out both`
    e.currentTarget.nextElementSibling.style.animation = `highlight 0.4s ease-out both`;
    console.log('hover function has run')
}

function time_out(e) {//When user's mouse leaves the table rows the row refreshes.
    console.log('time_out function has run')
    e.currentTarget.style.animation = `remove_highlight 0.3s ease-out both`;
    e.currentTarget.nextElementSibling.style.animation = `remove_highlight 0.3s ease-out both`;
}


export default function Main_line() {
    return (        
        <tr className="main_line"
            onMouseOver={(e) => hover(e)} //This causes a lot of errors on the console but it still works
            onMouseLeave={(e) => time_out(e)}
            >
            <td className="period">Period</td>
            <td className="room">69</td>                                  
        </tr>
    );
}
