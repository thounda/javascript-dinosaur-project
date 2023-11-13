// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Fetch dino json array using Async Wait
const getDinoJson = async () => {
  const dino_json = await fetch("./dino.json");
  const data = await dino_json.json();
  const dinos_array = data.Dinos.map((dino) => {
    let { species, weight, height, diet, where, when, fact } = dino;
    return new Dino(species, weight, height, diet, where, when, fact);
  });
  generateTile(dinos_array);
};

// Create Dino Object
const dino = new Dino();

// Create Human Object
function Human(name, height, weight, diet) {
  this.species = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}
const human = new Human();

// Use IIFE to get human data from form
const getHumanData = (function () {
  function getData() {
    human.species = document.querySelector("#name").value;
    human.height =
      parseInt(document.querySelector("#feet").value) * 12 +
      parseInt(document.querySelector("#inches").value);
    human.weight = document.querySelector("#weight").value;
    human.diet = document.querySelector("#diet").value.toLowerCase();
  }
  return {
    human: getData,
  };
})();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = (fact) => {
  if (dino.weight > human.weight) {
    dino.fact = `${dino.species} 
          is ${dino.weight - human.weight} lbs heavier than ${human.species}`;
    return dino.fact;
  } else {
    dino.fact = `${dino.species} 
          is ${human.weight - dino.weight} lbs  lighter than ${human.species}`;
    return dino.fact;
  }
};

// Create Dino Compare Method 2
Dino.prototype.compareHeight = (fact) => {
  if (dino.weight > human.weight) {
    dino.fact = `${dino.species} 
          is ${dino.weight - human.weight} inches taller than ${human.species}`;
    return dino.fact;
  } else {
    dino.fact = `${dino.species} 
          is ${human.weight - dino.weight} inches smaller than ${
      human.species
    }`;
    return dino.fact;
  }
};

// Create Dino Compare Method 3
Dino.prototype.compareDiet = (fact) => {
  if (human.diet === dino.diet) {
    dino.fact = `${dino.species} 
          is ${dino.diet} like ${human.species}`;
    return dino.fact;
  } else {
    dino.fact = `${dino.species} 
          is ${dino.diet} but ${human.species} is ${human.diet} `;
    return dino.fact;
  }
};

// Generate Tiles for each Dino in Array
const generateTile = (dinos_array) => {
  let update_dino = [];

  // hack for a fixed dinos_array length
  const sifter_array = [1, 1, 1, 0, 0, 0, 0];
  // Shuffle sifter array to later use it to randomize compare methods.
  shuffle(sifter_array);
  //Getting Pigeon position and adding to sifter_array in order to keep it fact property.
  let pigeon_index = dinos_array.findIndex((dino) => dino.species === "Pigeon");
  sifter_array.splice(pigeon_index, 0, 0);

  dinos_array.forEach((dinos_array_item, i) => {
    // Assign fetched array properties to global array properties.
    dino.species = dinos_array_item.species;
    dino.height = dinos_array_item.height;
    dino.weight = dinos_array_item.weight;
    dino.diet = dinos_array_item.diet;
    if (sifter_array[i]) {
      let get_random_number = Math.floor(Math.random() * 3) + 1;
      if (dinos_array_item instanceof Human) {
        get_random_number = "";
      }
      switch (get_random_number) {
        case 1:
          dino.compareHeight(dinos_array_item.fact);
          break;
        case 2:
          dino.compareWeight(dinos_array_item.fact);
          break;
        case 3:
          dino.compareDiet(dinos_array_item.fact);
          break;
        default:
          break;
      }
    } else {
      dino.fact = dinos_array_item.fact;
    }

    update_dino.push(JSON.parse(JSON.stringify(dino)));
  });

  // Add human object in the middle
  update_dino.splice(4, 0, human);
  update_dino.forEach((dino_element) => {
    addTileToDOM(dino_element);
  });
};

/**
 * Shuffles array in place - referenced program cade
 * @param {Array} An array containing the items.
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

// Add tiles to DOM
const addTileToDOM = (dino_element) => {
  const grid = document.querySelector("#grid");
  const div = document.createElement("div");
  div.className = "grid-item";
  const h3_node = document.createElement("h3");
  const img_node = document.createElement("img");
  const p_node = document.createElement("p");

  if (dino_element instanceof Human) {
    img_node.src = "./images/human.png";
  } else {
    dino_element.species = dino_element.species.toLowerCase();
    img_node.src = `./images/${dino_element.species}.png`;
  }
  h3_node.textContent = dino_element.species;
  p_node.textContent = dino_element.fact;

  div.appendChild(h3_node);
  div.appendChild(img_node);
  div.appendChild(p_node);
  grid.appendChild(div);
};

// Remove form from screen
function removeForm() {
  const form = document.querySelector("#dino-compare");
  form.style.display = "none";
}

// On button click, prepare and display infographic
function compare() {
  // Async call
  getDinoJson();
  // Sync call
  getHumanData.human();
  removeForm();
}
const compare_button = document.querySelector("#btn");
compare_button.addEventListener("click", compare);
