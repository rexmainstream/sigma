//This function adds a specified amount of tabs to the html nodelist
export function Add_tabs(amount_of_tabs) {
    const container = document.querySelector(".tab_container")
    //Adds in the amount of tabs by appending element
    for (let i = 0; i <= amount_of_tabs - 1; i++) {
        let Tab = document.createElement('button');
        Tab.title = `Slide ${i + 1}`; //Sets the tooltip to Slide number
        Tab.role = "tab";
        if (i === 0) {
            Tab.className = "current tab"
        } else {
            Tab.className = "tab";
        }      
        container.append(Tab);
    }
}

//This function runs when the user presses a tab or the previous or next button, it changes the tab
function Change_tab(){

}