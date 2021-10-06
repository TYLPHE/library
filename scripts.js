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
        console.log('wished');
        wish = 'Started game.';
    }
    else{
        wish = `Have not started.`;
    }

    if(document.getElementById(`clear`).checked){
        console.log(`checked`)
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
    let container;

    for(let i = 0; i < myLibrary.length; i++){
        //create a flex container
        container = document.createElement(`div`);
        container.className = `card-container`; //for CSS purposes
        container.id = i+1; //id is reference to delete card

        //create a delete button in each container
        let remove = document.createElement(`button`);
        remove.id = `remove`;
        remove.textContent = `remove`;
        remove.addEventListener(`click`, removeCard);


        //populate container with stuff
        const content = document.createTextNode(
            `Game ${i+1}: ${myLibrary[i].title} // ` +
            `Hours played: ${myLibrary[i].hours} hours`
        );

        //attach contents to container
        container.appendChild(content);
        container.appendChild(remove);
    }

    document.querySelector(`.display-game-cards`).appendChild(container);
}

//populate the TOC
function populateTOC(){
    let container;
    for(let i = 0; i < myLibrary.length; i++){
        container = document.createElement(`div`);
        container.className = `card-container`;
        const content = document.createTextNode(
            `Game ${i+1}: ${myLibrary[i].title}`
        );
        container.appendChild(content);
    }
    document.querySelector(`.TOC`).appendChild(container);
}

function removeCard(){
    let test = this.parentElement.id;
    console.log(test);

}