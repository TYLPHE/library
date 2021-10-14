let myLibrary = [];
let sortedTOC = [];
class game {
    constructor(title, hours, wish, clear) {
        this.title = title;
        this.hours = hours;
        this.wish = wish;
        this.clear = clear;
        this.sayGame = function () {
            console.log(title);
        };
    }
}

loadArray();
populateCard();
populateTOC();

//loadArray() if local storage exists
function loadArray(){
    ////add a few games to library by default if array is empty
    if(myLibrary = JSON.parse(localStorage.getItem(`user-TYLPHE`)) !== null){
        myLibrary = JSON.parse(localStorage.getItem(`user-TYLPHE`));
    }
    else if(localStorage.getItem(`user-TYLPHE`) == null){
        myLibrary = [];
        myLibrary[0] = new game(`Diablo II: Resurrected`, `250`, `Started game.`, `Yes.`);
        myLibrary[1] = new game(`Monster Hunter Rise`, `500`, `Started game.`, `Yes.`);
        myLibrary[2] = new game(`DJMAX Respect V`, `75`, `Started game.`, `No.`);
        myLibrary[3] = new game(`Metroid Dread`, `0`, `Have not started.`, `No.`);
        myLibrary[4] = new game(`Ori and the Blind Forest`, `100`, `Started game.`, `Yes.`);
        myLibrary[5] = new game(`Monster Hunter World`, `1200`, `Started game.`, `Yes.`);
        myLibrary[6] = new game(`Metal Gear Solid 3`, `50`, `Started game.`, `Yes.`);
        myLibrary[7] = new game(`Half-Life 2`, `50`, `Started game.`, `Yes.`);
        
    }
    else{
        return console.log(`Error with loadArray()`)
    }
}

//saves array to local storage
function saveArray(){
    localStorage.setItem(`user-TYLPHE`, JSON.stringify(myLibrary));
    console.log(`saved`);
}

//submit button adds adds to game list and card display
const submit = document.querySelector(`#submit`);
submit.addEventListener(`click`, addGameToLibrary);

function addGameToLibrary(){
    let titleArray = myLibrary.map(x => x.title);
    //prevents creation of incomplete games
    if(document.getElementById(`title`).value == ""){
        console.log('what');
        return;
    }
    if(titleArray.indexOf(document.getElementById(`title`).value) !== -1){
        console.log(`match`);
        matchedEdit(document.getElementById(`title`).value);
        saveArray();
        clearInputs();
        return;
    }
    else{
        //creates values for the constructor
        let title = document.getElementById(`title`).value;
        let hours = document.getElementById(`hours`).value;
        if(document.getElementById(`add-wish`).checked){
            wish = 'Started game.';
        }
        else{
            wish = `Have not started.`;
        }
        if(document.getElementById(`add-clear`).checked){
            clear = `Yes.`;
        }
        else{
            clear = `No.`;
        }

        //push the form to the array
        myLibrary.push(new game(title, hours, wish, clear));

        //populate array to website
        populateCard();
        populateTOC();

        //debug
        console.table(myLibrary);

        //save submission to local storage
        saveArray();

        //clear all inputs for extra feedback
        clearInputs();
    }
}

//after the match is 
function matchedEdit(title){
    let titleArray = myLibrary.map(x => x.title);
    let index = titleArray.findIndex(x => x === title);
    console.log(index);
    myLibrary[index].hours = document.getElementById(`hours`).value;

    if(document.getElementById(`add-wish`).checked){
        myLibrary[index].wish = 'Started game.';
    }
    else{
        myLibrary[index].wish = `Have not started.`;
    }
    if(document.getElementById(`add-clear`).checked){
        myLibrary[index].clear = `Yes.`;
    }
    else{
        myLibrary[index].clear = `No.`;
    }
    //populate array to website
    populateCard();
    populateTOC();
}

function clearInputs(){
    document.getElementById(`title`).value = ``;
    document.getElementById(`hours`).value = ``;
    document.getElementById(`add-wish`).checked = false;
    document.getElementById(`add-clear`).checked = false;
}

//post array into table
function populateCard(){
    removeCard(document.querySelector(`.display-game-cards`));
    sortArray();
    let container;
    for(let i = 0; i < myLibrary.length; i++){
        //create a flex container
        container = document.createElement(`div`);
        container.className = `card-container`; //for CSS purposes
        container.id = i+1; //id is reference to delete card

        //populate container title
        let contentTitleDiv = document.createElement(`div`);
        contentTitleDiv.className = `card-title`;
        let contentTitle = document.createTextNode(`${myLibrary[i].title}`);
        contentTitleDiv.appendChild(contentTitle);

        //populate container hours
        let contentHoursDiv = document.createElement(`div`);
        contentHoursDiv.className = `hours-flex`;
        let contentHoursVariable = document.createElement(`div`);
        contentHoursVariable.textContent= myLibrary[i].hours;
        let contentHoursLabel = document.createElement(`div`);
        contentHoursLabel.textContent= `Hours: `;
        contentHoursDiv.appendChild(contentHoursLabel);
        contentHoursDiv.appendChild(contentHoursVariable);

        //populate container started
        let contentStartedDiv = document.createElement(`div`);
        contentStartedDiv.className = `checkbox`;
        let contentStartedLabel = document.createElement(`label`);
        contentStartedLabel.setAttribute(`for`, `wish${i}`);
        contentStartedLabel.textContent = `Started: `;
        let contentStartedInput = document.createElement(`input`);
        contentStartedInput.type = `checkbox`;
        contentStartedInput.name = `wish${i}`;
        contentStartedInput.id = `wish${i}`;
        contentStartedDiv.appendChild(contentStartedLabel);contentStartedDiv.appendChild(contentStartedInput);
        if(myLibrary[i].wish == `Started game.`){
            contentStartedInput.checked = true;
        }
        contentStartedInput.addEventListener(`click`, updateStartedStatus);

        //populate container cleared
        let contentClearedDiv = document.createElement(`div`);
        contentClearedDiv.className = `checkbox`;
        let contentClearedLabel = document.createElement(`label`);
        contentClearedLabel.setAttribute(`for`, `clear${i}`);
        contentClearedLabel.textContent = `Cleared: `
        let contentClearedInput = document.createElement(`input`);
        contentClearedInput.type = `checkbox`;
        contentClearedInput.name = `clear${i}`;
        contentClearedInput.id = `clear${i}`;
        contentClearedDiv.appendChild(contentClearedLabel);contentClearedDiv.appendChild(contentClearedInput);
        if(myLibrary[i].clear == `Yes.`){
            contentClearedInput.checked = true;
        }
        contentClearedInput.addEventListener(`click`, updateClearedStatus);

        //create a delete button in each container
        let removeButtonDiv = document.createElement(`div`);
        let remove = document.createElement(`button`);
        remove.id = `remove`;
        remove.textContent = `Remove`;
        remove.addEventListener(`click`, deleteCard);
        removeButtonDiv.appendChild(remove);
        
        //create an edit button in each container
        let editButtonDiv = document.createElement(`div`);
        let edit = document.createElement(`button`);
        edit.id = `edit`;
        edit.textContent = `Edit`;
        edit.addEventListener(`click`, editCard);
        editButtonDiv.appendChild(edit);

        //create a div and attach buttons so they sit horizontally in a flex
        let editRemoveDiv = document.createElement(`div`);
        editRemoveDiv.className = `edit-remove`;
        editRemoveDiv.appendChild(editButtonDiv);
        editRemoveDiv.appendChild(removeButtonDiv);

        //attach contents to container
        container.appendChild(contentTitleDiv);
        container.appendChild(contentHoursDiv);
        container.appendChild(contentStartedDiv);
        container.appendChild(contentClearedDiv);
        container.appendChild(editRemoveDiv);

        //draw the containers into the page
        document.querySelector(`.display-game-cards`).appendChild(container);
    }
}

//removeCard(parent) removes all the elements on the webpage to redraw the array
function removeCard(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

//populate the TOC. Maybe I can add an alphabetize and event listener to highlight cards on right
function populateTOC(){
    removeCard(document.querySelector(`.TOC`));
    let container;
    for(let i = 0; i < myLibrary.length; i++){
        container = document.createElement(`div`);
        container.className = `TOC-container`;
        container.id = `toc-${i+1}`;
        const content = document.createTextNode(`${myLibrary[i].title}`);

        //attach contents to container 
        container.appendChild(content);

        //draw TOC containers into the page
        document.querySelector(`.TOC`).appendChild(container);
    }
    hoverHighlight();
}

//updateStartedStatus() if you check the box, then it updates the array.
function updateStartedStatus(){
    if(this.checked){
        let buttonParentID = this.parentElement.parentElement.id-1;
        console.log(buttonParentID);
        myLibrary[buttonParentID].wish = `Started game.`;
        console.table(myLibrary);
    }
    else{
        let buttonParentID = this.parentElement.parentElement.id-1;
        console.log(buttonParentID);
        myLibrary[buttonParentID].wish = `Have not started.`;
        console.table(myLibrary);
    }
}

//updateClearedStatus() if you check the box, then it updates the array.
function updateClearedStatus(){
    if(this.checked){
        let buttonParentID = this.parentElement.parentElement.id-1;
        console.log(buttonParentID);
        myLibrary[buttonParentID].clear = `Yes.`;
        console.table(myLibrary);
    }
    else{
        let buttonParentID = this.parentElement.parentElement.id-1;
        console.log(buttonParentID);
        myLibrary[buttonParentID].clear = `No.`;
        console.table(myLibrary);
    }
}

//deleteCard() deletes the card and updates the array
function deleteCard(){
    let buttonParentID = this.parentElement.parentElement.parentElement.id - 1;
    myLibrary.splice(buttonParentID, 1);
    saveArray();
    populateCard();
    populateTOC();
}

//editCard() throws all values in array back into add game section. Submit updates cards
function editCard(){
    let buttonParentID = this.parentElement.parentElement.parentElement.id - 1;
    document.getElementById(`title`).value = myLibrary[buttonParentID].title;
    document.getElementById(`hours`).value = myLibrary[buttonParentID].hours;

    if(myLibrary[buttonParentID].wish == 'Started game.'){
        document.getElementById(`add-wish`).checked = true;
    }
    else{
        document.getElementById(`add-wish`).checked = false;
    }
    if(myLibrary[buttonParentID].clear == `Yes.`){
        document.getElementById(`add-clear`).checked = true;
    }
    else{
        document.getElementById(`add-clear`).checked = false;
    }
}

//sortArray() sorts the TOC and hopefully make it easier to find cards
function sortArray(){
    myLibrary.sort((a,b) => a.title.localeCompare(b.title));
}

//hoverHighlight() hover over the TOC item to highlight the corresponding card
function hoverHighlight(){
    let classNames = document.getElementsByClassName(`TOC-container`);
    for(i = 0; i < classNames.length; i++){
        classNames[i].addEventListener(`mouseover`, x => {
            document.getElementById(x.target.id.substring(4)).classList.add(`TOC-hover`);
        })
    }
    for(i = 0; i < classNames.length; i++){
        classNames[i].addEventListener(`mouseout`, x => {
            document.getElementById(x.target.id.substring(4)).classList.remove(`TOC-hover`);
        })
    }
}