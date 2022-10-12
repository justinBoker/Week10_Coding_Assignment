//Establishes the Pokemon class
class Pokemon {
    constructor(name, level, type) {
        this.name = name;
        this.level = level;
        this.type = type;
    }
}

//Establishes the Trainer class - also includes a method to add Pokemon to that specific Trainer
class Trainer {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.pokemon = [];
    }

    addPokemon(pokemon) {
        this.pokemon.push(pokemon);
    }
}

//Creates an empty trainers array and sets the trainderId to 0
let trainers = [];
let trainerId = 0;

//Activating the onClick function. This takes the given trainer's name and creates a new instance of Trainer and runs the getValue function.
    //Then it activates the drawDOM function. Finally, it clears the Trainer's Name input field on the webpage.
onClick('new-trainer', () => {
    trainers.push(new Trainer(trainerId++, getValue('new-trainer-name')));
    drawDOM();
    document.getElementById('new-trainer-name').value = '';
});

//This function takes an ide and an action as parameters. It creates an variable called element that gets a specific id from the DOM.
    //Then it listens for a click and returns the variable element.
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

//This function just returns the value of whatever is in the input field for a specific id.
function getValue(id) {
    return document.getElementById(id).value;
}

//This function targets the div that holds the Trainer tables. It activates createTrainerTable function. 
    //It also activates the createPokemonRow function.
function drawDOM() {
    let trainerDiv = document.getElementById('trainers');
    clearElement(trainerDiv);
    for (trainer of trainers) {
        let table = createTrainerTable(trainer);
        let title = document.createElement('h2');
        title.innerHTML = trainer.name;
        trainerDiv.appendChild(title);
        trainerDiv.appendChild(table);
        for (pokemon of trainer.pokemon) {
            createPokemonRow(trainer, table, pokemon);
        }
    }
}

//This function fleshes out how the Pokemon rows on the table are structured.
function createPokemonRow(trainer, table, pokemon) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = pokemon.name;
    row.insertCell(1).innerHTML = pokemon.level;
    row.insertCell(2).innerHTML = pokemon.type;
}

//This function creates the button on the trainer's table that allows the user to add a Pokemon row to the table.
function createNewPokemonButton(trainer) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        trainer.pokemon.push(new Pokemon(getValue(`name-input-${trainer.id}`), getValue(`level-input-${trainer.id}`), getValue(`type-input-${trainer.id}`)));
        drawDOM();
    };
    return btn;
}

//This array holds the various types of Pokemon.
const types = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water', 'Mixed'];

//This function creates the entire Trainer table and dictates how it is structured and how it is designed.
function createTrainerTable(trainer) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let levelColumn = document.createElement('th');
    let typeColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    levelColumn.innerHTML = 'Level';
    typeColumn.innerHTML = 'Type';
    row.appendChild(nameColumn);
    row.appendChild(levelColumn);
    row.appendChild(typeColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let levelTh = document.createElement('th');
    let typeTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${trainer.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let levelInput = document.createElement('input');
    levelInput.setAttribute('id', `level-input-${trainer.id}`);
    levelInput.setAttribute('type', 'text');
    levelInput.setAttribute('class', 'form-control');
    let typeInput = document.createElement('select');
    typeInput.setAttribute('id', `type-input-${trainer.id}`);
    typeInput.setAttribute('type', 'option');
    typeInput.setAttribute('class', 'form-control');
    for(const i of types) {
        let option = document.createElement('option');
        option.type = i;
        option.text = i.charAt(0).toUpperCase() + i.slice(1);
        typeInput.appendChild(option); 
    };
    let newPokemonButton = createNewPokemonButton(trainer);
    nameTh.appendChild(nameInput);
    levelTh.appendChild(levelInput);
    typeTh.appendChild(typeInput);
    createTh.appendChild(newPokemonButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(levelTh);
    formRow.appendChild(typeTh);
    formRow.appendChild(createTh);
    return table;
}

//This function clears the previous trainer from the element. This will prevent duplicate trainers from appearing 
    //as the user adds additional trainers.
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}