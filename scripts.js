let myLibrary = [];
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

//submit button adds adds to game list and card display
const submit = document.querySelector(`#submit`);
submit.addEventListener(`click`, addGameToLibrary);

function addGameToLibrary(){
    //prevents creation of incomplete games
    if(document.getElementById(`title`).value == ""){
        console.log('what');
        return;
    }

    //creates values for the constructor
    let title = document.getElementById(`title`).value;
    let hours = document.getElementById(`hours`).value;

    if(document.getElementById(`wish`).checked){
        wish = 'Started game.';
    }
    else{
        wish = `Have not started.`;
    }

    if(document.getElementById(`clear-initial`).checked){
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
}

//post array into table
function populateCard(){
    removeCard(document.querySelector(`.display-game-cards`));
    let container;
    for(let i = 0; i < myLibrary.length; i++){
        //create a flex container
        container = document.createElement(`div`);
        container.className = `card-container`; //for CSS purposes
        container.id = i+1; //id is reference to delete card

        //populate container title
        let contentTitleDiv = document.createElement(`div`)
        let contentTitle = document.createTextNode(`${myLibrary[i].title}`);
        contentTitleDiv.appendChild(contentTitle);

        //populate container hours
        let contentHoursDiv = document.createElement(`div`);
        let contentHours = document.createTextNode(`Hours: ${myLibrary[i].hours}`);
        contentHoursDiv.appendChild(contentHours);

        //populate container started
        let contentStartedDiv = document.createElement(`div`);
        let contentStartedLabel = document.createElement(`label`);
        contentStartedLabel.for = `wish`;
        contentStartedLabel.textContent = `Started: `;
        let contentStartedInput = document.createElement(`input`);
        contentStartedInput.type = `checkbox`;
        contentStartedInput.name = `wish`;
        contentStartedInput.id = `wish`;
        contentStartedDiv.appendChild(contentStartedLabel);contentStartedDiv.appendChild(contentStartedInput);
        if(myLibrary[i].wish == `Started game.`){
            contentStartedInput.checked = true;
        }
        contentStartedInput.addEventListener(`click`, updateStartedStatus);



        //populate container cleared
        let contentClearedDiv = document.createElement(`div`);
        let contentClearedLabel = document.createElement(`label`);
        contentClearedLabel.for = `clear`;
        contentClearedLabel.textContent = `Cleared: `
        let contentClearedInput = document.createElement(`input`);
        contentClearedInput.type = `checkbox`;
        contentClearedInput.name = `clear`;
        contentClearedInput.id = `clear`;
        contentClearedDiv.appendChild(contentClearedLabel);contentClearedDiv.appendChild(contentClearedInput);
        if(myLibrary[i].clear == `Yes.`){
            contentClearedInput.checked = true;
        }
        contentClearedInput.addEventListener(`click`, updateClearedStatus);

        //create a delete button in each container
        let removeButtonDiv = document.createElement(`div`);
        let remove = document.createElement(`button`);
        remove.id = `remove`;
        remove.textContent = `remove`;
        remove.addEventListener(`click`, deleteCard);
        removeButtonDiv.appendChild(remove);


        //attach contents to container
        container.appendChild(contentTitleDiv);
        container.appendChild(contentHoursDiv);
        container.appendChild(contentStartedDiv);
        container.appendChild(contentClearedDiv);
        container.appendChild(removeButtonDiv);
        
        //draw the containers into the page
        document.querySelector(`.display-game-cards`).appendChild(container);
    }
}

function removeCard(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

//populate the TOC
function populateTOC(){
    removeCard(document.querySelector(`.TOC`));
     let container;
    for(let i = 0; i < myLibrary.length; i++){
        container = document.createElement(`div`);
        container.className = `TOC-container`;
        container.id = `toc-${i+1}`;
        const content = document.createTextNode(
            `${i+1}: ${myLibrary[i].title}`
        );

        //attach contents to container 
        container.appendChild(content);

        //draw TOC containers into the page
        document.querySelector(`.TOC`).appendChild(container);
    }

}



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
function deleteCard(){
    let buttonParentID = this.parentElement.id;
    myLibrary.splice(buttonParentID-1, 1);
    populateCard();
    populateTOC();
}