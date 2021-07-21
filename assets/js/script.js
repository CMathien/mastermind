//Variables

const gameboard = document.getElementById("gameboard");
const message = document.getElementById("message");
const bouton = document.getElementById("bouton");

let solution = [];
let randomColor = [];

let compteurTentatives = 0;

//Création du plateau

function createGameboard() {
  for (let i = 0; i < 10; i++) {
    gameboard.innerHTML +=
      '<div class="row d-flex justify-content-around m-3" id="proposition-' +
      i +
      '"></div>';
  }
  gameboard.innerHTML +=
    '<div class="row d-flex justify-content-around m-3" id="solution"></div>';
}
window.onload = createGameboard();

//Définition de la combinaison à deviner

for (let index = 0; index < 4; index++) {
  randomColor[index] = 6;
  while (randomColor[index] < 0 || randomColor[index] > 5) {
    randomColor[index] = Math.floor(Math.random() * 10);
  }
  solution[index] = randomColor[index];
}

//Apparence de la combinaison à deviner

const solutionField = document.getElementById("solution");

for (let index = 0; index < solution.length; index++) {
  solutionField.innerHTML +=
    '<div class="col-3 solution color' + solution[index] + '"></div>';
}
solutionField.style.visibility = "hidden";

//Vérification et affichage des combinaisons proposées
function verifyColor() {
  //Définition du stock de billes par couleur (chaque fois qu'on trouvera une couleur (bien ou mal placée), on retire une bille du stock. Ainsi, si un joueur propose deux billes noires dans l'emplacement 1 et 2, et qu'on attend une seule bille noire dans l'emplacement 3, seule une des deux billes proposées sera entourée en orange. )
  let stockBilleCouleur = [0, 0, 0, 0, 0, 0];
  let colorVerified = ["incorrect", "incorrect", "incorrect", "incorrect"];
  let proposedColor = [];
  let row = document.getElementById("proposition-" + compteurTentatives);

  for (let index = 0; index < 4; index++) {
    switch (solution[index]) {
      case 0:
        stockBilleCouleur[0] += 1;
        break;
      case 1:
        stockBilleCouleur[1] += 1;
        break;
      case 2:
        stockBilleCouleur[2] += 1;
        break;
      case 3:
        stockBilleCouleur[3] += 1;
        break;
      case 4:
        stockBilleCouleur[4] += 1;
        break;
      case 5:
        stockBilleCouleur[5] += 1;
        break;
      default:
        break;
    }
  }

  for (let index = 0; index < 4; index++) {
    proposedColor[index] = parseInt(
      document.getElementById("bille" + index).value
    );
    row.innerHTML +=
      '<div class="col-3 bille color' +
      proposedColor[index] +
      '" id="' +
      compteurTentatives +
      index +
      '"></div>';
    if (proposedColor[index] == solution[index]) {
      colorVerified[index] = "correct";
      stockBilleCouleur[proposedColor[index]] -= 1;
    }
  }

  //Affichage des bordures de couleur

  for (let index = 0; index < 4; index++) {
    if (
      proposedColor[index] != solution[index] &&
      solution.includes(proposedColor[index]) &&
      colorVerified[index] == "incorrect" &&
      stockBilleCouleur[proposedColor[index]] > 0
    ) {
      colorVerified[index] = "almostCorrect";
      stockBilleCouleur[proposedColor[index]] -= 1;
    }
    let bille = document.getElementById("" + compteurTentatives + index + "");
    if (colorVerified[index] == "correct") {
      bille.style.width = "57px";
      bille.style.height = "57px";
      bille.style.border = "solid 7px darkgreen";
    } else if (colorVerified[index] == "almostCorrect") {
      bille.style.width = "57px";
      bille.style.height = "57px";
      bille.style.border = "solid 7px darkorange";
    }
  }

  //Messages échec/victoire
  compteurTentatives += 1;
  if (
    (solution[0] != proposedColor[0] ||
      solution[1] != proposedColor[1] ||
      solution[2] != proposedColor[2] ||
      solution[3] != proposedColor[3]) &&
    compteurTentatives == 10
  ) {
    message.innerText =
      "Vous avez épuisé vos 10 tentatives. La solution est affichée ci-dessous. Cliquez sur le bouton pour lancer une nouvelle partie !";
    bouton.innerHTML =
      '<input type="button" value="Nouvelle partie" class="btn btn-secondary my-3" onclick="window.location.reload()" />';
    solutionField.style.visibility = "visible";
  } else if (
    solution[0] == proposedColor[0] &&
    solution[1] == proposedColor[1] &&
    solution[2] == proposedColor[2] &&
    solution[3] == proposedColor[3]
  ) {
    if (compteurTentatives == 1) {
      message.innerText =
        "Bravo, vous avez trouvé la combinaison en " +
        compteurTentatives +
        " tentative ! Cliquez sur le bouton pour lancer une nouvelle partie !";
      bouton.innerHTML =
        '<input type="button" value="Nouvelle partie" class="btn btn-secondary my-3" onclick="window.location.reload()" />';
      solutionField.style.visibility = "visible";
    } else {
      message.innerText =
        "Bravo, vous avez trouvé la combinaison en " +
        compteurTentatives +
        " tentatives ! Cliquez sur le bouton pour lancer une nouvelle partie !";
      bouton.innerHTML =
        '<input type="button" value="Nouvelle partie" class="btn btn-secondary my-3" onclick="window.location.reload()" />';
      solutionField.style.visibility = "visible";
    }
  } else {
    if (compteurTentatives == 9) {
      message.innerText =
        "Il vous reste " + (10 - compteurTentatives) + " tentative.";
    } else {
      message.innerText =
        "Il vous reste " + (10 - compteurTentatives) + " tentatives.";
    }
  }
}
