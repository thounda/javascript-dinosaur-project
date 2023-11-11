// Create Dino Constructor
function Dino(name, species, weight, height, diet, where, when, url) {
  this.name = name;
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.url = url;
}

// Create Dino Objects
const dinos = [];

// Fetch JSON data to populate into local JS script
fetch("dino.json")
  .then((response) => response.json())
  .then((data) => {
    for (const dino of data) {
      dinos.push(
        new Dino(
          dino.name,
          dino.species,
          dino.weight,
          dino.height,
          dino.diet,
          dino.where,
          dino.when,
          dino.url
        )
      );
    }

    // Create Human Object
    // Use IIFE to get human data from form
    const human = (function () {
      const form = document.querySelector("form");
      const nameInput = form.querySelector("#name");
      const heightInput = form.querySelector("#height");
      const weightInput = form.querySelector("#weight");

      return {
        name: nameInput.value,
        height: heightInput.value,
        weight: weightInput.value,
      };
    })();

    // Create Dino Compare Method 1
    function compareWeight(dino1, dino2) {
      return dino1.weight - dino2.weight;
    }
    // NOTE: Weight in JSON file is in lbs, height in inches.

    // Create Dino Compare Method 2
    function compareHeight(dino1, dino2) {
      return dino1.height - dino2.height;
    }
    // NOTE: Weight in JSON file is in lbs, height in inches.

    // Create Dino Compare Method 3
    function compareDiet(dino1, dino2) {
      return dino1.diet.localeCompare(dino2.diet);
    }
    // NOTE: Weight in JSON file is in lbs, height in inches.

    // Generate Tiles for each Dino in Array
    function generateTiles() {
      const tileContainer = document.querySelector("#tile-container");

      for (const dino of dinos) {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        const image = document.createElement("img");
        image.src = dino.url;
        tile.appendChild(image);

        const name = document.createElement("h3");
        name.textContent = dino.name;
        tile.appendChild(name);

        tileContainer.appendChild(tile);
      }
    }

    // Add tiles to DOM
    generateTiles();

    // Remove form from screen
    const form = document.querySelector("form");
    form.remove();

    // On button click, prepare and display infographic
    const button = document.querySelector("#button");
    button.addEventListener("click", function () {
      // Prepare infographic data
      const infographicData = {
        human: human,
        dinos: dinos,
      };

      // Display infographic
      displayInfographic(infographicData);
    });
  });

// Display infographic
function displayInfographic(infographicData) {
  // Get infographic elements
  const infographicContainer = document.querySelector("#infographic-container");
  const humanName = document.querySelector("#human-name");
  const humanHeight = document.querySelector("#human-height");
  const humanWeight = document.querySelector("#human-weight");
  const dinoTable = document.querySelector("#dino-table");

  // Update infographic data
  humanName.textContent = infographicData.human.name;
  humanHeight.textContent = infographicData.human.height;
  humanWeight.textContent = infographicData.human.weight;

  // Clear dino table
  dinoTable.innerHTML = "";

  // Add dinos to dino table
  for (const dino of infographicData.dinos) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = dino.name;
    row.appendChild(nameCell);

    const weightCell = document.createElement("td");
    weightCell.textContent = dino.weight;
    row.appendChild(weightCell);
  }
}
