class Pokemon {
    constructor(name, level, type) {
        this.name = name;
        this.level = level;
        this.type = type;
    }
}

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

let trainers = [];
let trainerId = 0;

onClick('new-trainer', () => {
    trainers.push(new Trainer(trainerId++, getValue('new-trainer-name')));
    drawDOM();
    document.getElementById('new-trainer-name').value = '';
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

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

function createPokemonRow(trainer, table, pokemon) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = pokemon.name;
    row.insertCell(1).innerHTML = pokemon.level;
    row.insertCell(2).innerHTML = pokemon.type;
}

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
    let typeInput = document.createElement('input');
    typeInput.setAttribute('id', `type-input-${trainer.id}`);
    typeInput.setAttribute('type', 'text');
    typeInput.setAttribute('class', 'form-control');
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

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}