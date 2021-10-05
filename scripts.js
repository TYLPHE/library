let myLibrary = [];
class book {
    constructor(title, author, readStatus) {
        this.title = title;
        this.author = author;
        this.readStatus = readStatus;
        this.sayBook = function () {
            console.log(title);
        };
    }
}

const submit = document.querySelector(`#submit`);
submit.addEventListener(`click`, addBookToLibrary);

function addBookToLibrary(){
    //prevents creation of incomplete books
    if(document.getElementById(`title`).value == "" || document.getElementById(`author`).value == ""){
        console.log('what')
        return;
    }

    //creates values for the constructor
    let title = document.getElementById(`title`).value;
    let author = document.getElementById(`author`).value;
    if(document.getElementById(`read`).checked){
        console.log(`checked`)
        readStatus = `yes`;
    }
    else{
        readStatus = `no`;
    }

    //push the form to the array
    myLibrary.push(new book(title, author, readStatus));

    //debug
    console.table(myLibrary);
}