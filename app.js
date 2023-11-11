//getting DOM Elements
const button = document.getElementById("btn");
const formRef = document.getElementById("dino-compare");
const clearScreen = (ref) => {
  ref.remove();
};

const humanNameInput = document.getElementById("name");
let humanName = document.getElementById("name").value;
const humanFeet = document.getElementById("feet");
const humanInches = document.getElementById("inches");
const humanWeight = document.getElementById("weight");
const humanDiet = document.getElementById("diet");

//Dinosaur Constructor
function dinosaur(name, species, weight, height, diet, where, when, fact) {
  this.name = name;
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}
debugger;
let height = Number(humanFeet.value) * 12 + Number(humanInches.value);
debugger;
//Human Constructor
function human(name, species, weight, height, diet, fact) {
  this.species = species;
  this.fact = fact;
  this.name = name;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
}

let compareWeight;

//Pulling dino info from json
var dinoArr = [];
fetch("dino.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.Dinos.forEach((dino) => {
      let dinoObj = new dinosaur(
        dino.name,
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact
      );
      dinoArr.push(dinoObj);
    });
  });

var myNewHuman;

function createHuman() {
  debugger;
  let compareArray = [
    compareWeight(humanWeight.value),
    compareHeight(height),
    compareDiet(humanDiet.value),
  ];
  const compareRandomNumber = Math.floor(Math.random() * compareArray.length);

  myNewHuman = new human(
    humanName,
    "human",
    humanWeight.value,
    height,
    humanDiet.value,
    compareArray[compareRandomNumber]
  );
  function compareWeight(humanWeight) {
    let myRandNum = Math.floor(Math.random() * dinoArr.length);
    let myMessage = `You are ${
      dinoArr[myRandNum].weight - humanWeight
    } pounds lighter than a ${dinoArr[myRandNum].name}.`;
    // console.log("I am weight");
    return myMessage;
  }
  function compareHeight(height) {
    debugger;
    let myRandNum = Math.floor(Math.random() * dinoArr.length);
    let myMessage = `You are ${
      dinoArr[myRandNum].height - height
    } inches shorter than a ${dinoArr[myRandNum].name}.`;
    // console.log("I am height");
    debugger;
    return myMessage;
  }
  function compareDiet(humanDiet) {
    let myRandNum = Math.floor(Math.random() * dinoArr.length);
    let myMessage = `You're a ${humanDiet} while ${dinoArr[myRandNum].name} is a ${dinoArr[myRandNum].diet}.`;
    // console.log("I am diet");
    return myMessage;
  }
  console.log(height);
  // console.log(compareRand)
}

// compareWeight(humanWeight.value)

//Creating Tiles
function populateTiles() {
  clearScreen(formRef);
  dinoArr.splice(4, 0, myNewHuman);
  for (let i = 0; i < dinoArr.length; i++) {
    const tile = document.createElement("div");
    tile.className = "grid-item";
    tile.innerHTML = `<h2>${dinoArr[i].name}</h2> <img src="images/${dinoArr[
      i
    ].species.toLowerCase()}.png"/> <h3>${dinoArr[i].fact}</h3>`;
    document.querySelector("#grid").appendChild(tile);
  }
}

humanNameInput.addEventListener("change", (event) => {
  console.log(event.target.value);
  humanName = event.target.value;
  // humanData = getHumanData();
});

//It's a button
button.addEventListener("click", () => {
  createHuman();
  populateTiles();
  console.log(humanName);
  // alert(humanName);
});
