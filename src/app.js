const board = document.getElementById("board");
const restartButton = document.getElementById("btnRestart");
const info = document.querySelector("#info");
let currentPlayer = 1;
let playerX = document.querySelector("#playerX");
let player0 = document.querySelector("#player0");
let namePlayerX = "X";
let namePlayer0 = "0";
let movesPlayed = 0;
let playersX = [];
let players0 = [];
let isGameStarted = true;
let playerXWins = 0;
let player0Wins = 0;
let empate = 0;
let ulScores = "";

getNamesLocal()
getScoreLocal()

function getNamesLocal(){
    let localNameX = JSON.parse(localStorage.getItem("X")) 
    let localName0 = JSON.parse(localStorage.getItem("0")) 

    localNameX !== null ? namePlayerX = localNameX[0].name : "X"
    localName0 !== null ? namePlayer0 = localName0[0].name : "0"
}

function getScoreLocal(){
    let localScoreX = JSON.parse(localStorage.getItem("X"))
    let localScore0 = JSON.parse(localStorage.getItem("0"))

    localScoreX !== null ? playerXWins = localScoreX[0].wins : 0
    localScore0 !== null ? player0Wins = localScore0[0].wins : 0
}

function players(name, wins) {
  this.name = name;
  this.wins = wins;
}

playerX.addEventListener("change", () => {
  namePlayerX = playerX.value;
  playersX.push(new players(namePlayerX, 0));
  localStorage.clear
  playerXWins = "0"
  resultados();
});

player0.addEventListener("change", () => {
  namePlayer0 = player0.value;
  players0.push(new players(namePlayer0, 0));
  localStorage.clear
  player0Wins = "0"
  resultados();
});

function setCells(board) {
  const cellQuantity = 9;
  const cellContent = `
        <div class="main__cell">
            <p class= "main__cell--text"></p>
        </div>
    `;
  let boardConstructor = "";
  for (let i = 1; i <= cellQuantity; i++) {
    boardConstructor += cellContent;
  }

  board.innerHTML = boardConstructor;
}

setCells(board);
resultados();

function resultados() {
  var xx = document.getElementById("jugador1");
  var oo = document.getElementById("jugador2");
  var ee = document.getElementById("empate");

  xx.textContent = namePlayerX + ": " + playerXWins;
  oo.textContent = namePlayer0 + ": " + player0Wins;
  ee.textContent = "Empate: " + empate;
}

function restartGame() {
  board
    .querySelectorAll(".main__cell")
    .forEach((cell) => (cell.children[0].innerHTML = ""));
  movesPlayed = 0;
  currentPlayer = 1;
  isGameStarted = true;
}

function checkMove(index, value) {
  const babybox = board.children;

  //Check Row
  if (index >= 0 && index <= 2) {
    if (
      babybox[0].children[0].innerHTML === babybox[1].children[0].innerHTML &&
      babybox[1].children[0].innerHTML === babybox[2].children[0].innerHTML &&
      babybox[2].children[0].innerHTML === babybox[index].children[0].innerHTML
    ) {
      isGameStarted = false;
    }
  } else if (index >= 3 && index <= 5) {
    if (
      babybox[3].children[0].innerHTML === babybox[4].children[0].innerHTML &&
      babybox[4].children[0].innerHTML === babybox[5].children[0].innerHTML &&
      babybox[5].children[0].innerHTML === babybox[index].children[0].innerHTML
    ) {
      isGameStarted = false;
    }
  } else {
    if (
      babybox[6].children[0].innerHTML === babybox[7].children[0].innerHTML &&
      babybox[7].children[0].innerHTML === babybox[8].children[0].innerHTML &&
      babybox[8].children[0].innerHTML === babybox[index].children[0].innerHTML
    ) {
      isGameStarted = false;
    }
  }

  //Check Column
  if (
    babybox[0].children[0].innerHTML === babybox[3].children[0].innerHTML &&
    babybox[3].children[0].innerHTML === babybox[6].children[0].innerHTML &&
    babybox[6].children[0].innerHTML === babybox[index].children[0].innerHTML
  ) {
    isGameStarted = false;
  } else if (
    babybox[1].children[0].innerHTML === babybox[4].children[0].innerHTML &&
    babybox[4].children[0].innerHTML === babybox[7].children[0].innerHTML &&
    babybox[7].children[0].innerHTML === babybox[index].children[0].innerHTML
  ) {
    isGameStarted = false;
  } else if (
    babybox[2].children[0].innerHTML === babybox[5].children[0].innerHTML &&
    babybox[5].children[0].innerHTML === babybox[8].children[0].innerHTML &&
    babybox[8].children[0].innerHTML === babybox[index].children[0].innerHTML
  ) {
    isGameStarted = false;
  }

  //Check Diagonal
  if (
    babybox[0].children[0].innerHTML === babybox[4].children[0].innerHTML &&
    babybox[4].children[0].innerHTML === babybox[8].children[0].innerHTML &&
    babybox[8].children[0].innerHTML === babybox[index].children[0].innerHTML
  ) {
    isGameStarted = false;
  } else if (
    babybox[2].children[0].innerHTML === babybox[4].children[0].innerHTML &&
    babybox[4].children[0].innerHTML === babybox[6].children[0].innerHTML &&
    babybox[6].children[0].innerHTML === babybox[index].children[0].innerHTML
  ) {
    isGameStarted = false;
  }

  if (!isGameStarted) {
    swal({ title: `Ganó el jugador ${currentPlayer== 1 ? namePlayerX : namePlayer0}`, icon: "success" });
    if (currentPlayer === 1) {
      playerXWins++;
      let index = playersX.findIndex((player) => player.name === namePlayerX);
      console.log(playerXWins)
      playersX[index].wins = playerXWins;
      
      localStorage.setItem("X", JSON.stringify(playersX));
    } else {
      player0Wins++;
      let index = players0.findIndex((player) => player.name === namePlayer0);
      players0[index].wins = player0Wins;
      localStorage.setItem("0", JSON.stringify(players0));
    }
    resultados();
  } else if (currentPlayer === 1) {
    currentPlayer++;
  } else if (currentPlayer === 2) {
    currentPlayer--;
  }
}

function playerClick(cell, index) {
  let value = cell.children[0].innerHTML;
  if (isGameStarted && value === "") {
    movesPlayed++;
    if (currentPlayer === 1) {
      cell.children[0].innerHTML = "X";
      checkMove(index, "X");
    } else if (currentPlayer === 2) {
      cell.children[0].innerHTML = "O";
      checkMove(index, "X");
    }
    if (movesPlayed === 9 && isGameStarted) {
      swal({ title: "Empate", icon: "success" });
      isGameStarted = false;
      empate++;
      localStorage.setItem("Empate", empate);
      resultados();
    }
  }
}

function setEventListeners(board) {
  for (let i = 0; i < board.children.length; i++) {
    let cell = board.children[i];
    cell.addEventListener("click", function () {
      playerClick(this, i);
    });
  }
  restartButton.addEventListener("click", function () {
    restartGame();
  });
}

setEventListeners(board);

function setCellStyles() {
  const borderSize = 7;
  let borderStyle1 = `border-width: 0 ${borderSize}px ${borderSize}px 0`;
  let borderStyle2 = `border-width: 0 0 ${borderSize}px 0`;
  let borderStyle3 = `border-width: 0 ${borderSize}px 0 0`;

  for (let i = 0; i < board.children.length; i++) {
    switch (i) {
      case 0:
        board.children[i].style = borderStyle1;
        break;
      case 1:
        board.children[i].style = borderStyle1;
        break;
      case 2:
        board.children[i].style = borderStyle2;
        break;
      case 3:
        board.children[i].style = borderStyle1;
        break;
      case 4:
        board.children[i].style = borderStyle1;
        break;
      case 5:
        board.children[i].style = borderStyle2;
        break;
      case 6:
        board.children[i].style = borderStyle3;
        break;
      case 7:
        board.children[i].style = borderStyle3;
        break;
    }
  }
}

setCellStyles();

let sortedData = fetch("src/ganadores.json")
  .then((res) => res.json())
  .then(
    (data) =>
      data.forEach((element) => {
        ulScores += `<li class="item">${element.puntaje} \t ${element.nombre}</li>`;
      }),
    info.addEventListener("click", () => {
      Swal.fire({
        title: "¿Les podes ganar a ellos?",
        html: ulScores,
        confirmButtonText: "Claro que sí",
        showDenyButton: true,
        denyButtonText: "Mejor me voy a otra parte",
      });
    })
  );
