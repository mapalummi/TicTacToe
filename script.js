let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";
let gameOver = false;
let winningCombination = null;

function init() {
  render();
}

function render() {
  let content = document.getElementById("content");
  let tableHTML = '<table class="tic-tac-toe">';

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let symbol = "";
      if (fields[index] === "circle") {
        symbol = generateCircleSVG();
      } else if (fields[index] === "cross") {
        symbol = generateCrossSVG();
      }
      let className = winningCombination && winningCombination.includes(index) ? "winner" : "";
      tableHTML += `<td onclick="setSymbol(this, ${index})" class="${className}" id="cell-${index}">${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  content.innerHTML = tableHTML;
  if (gameOver) {
    drawWinningLine();
  }
}

function setSymbol(cell, index) {
  if (gameOver || fields[index]) return; // Verhindert weitere Züge nach dem Spielende

  fields[index] = currentPlayer;
  cell.innerHTML = currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG();
  if (checkWinner()) {
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
  }
  if (gameOver) {
    drawWinningLine();
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      winningCombination = combination;
      return true;
    }
  }

  if (fields.every((field) => field !== null)) {
    // Unentschieden, falls alle Felder belegt sind
    gameOver = true;
  }

  return false;
}

function drawWinningLine() {
  if (!winningCombination) return;

  let table = document.querySelector(".tic-tac-toe");
  let firstCell = document.getElementById(`cell-${winningCombination[0]}`);
  let lastCell = document.getElementById(`cell-${winningCombination[2]}`);

  if (!firstCell || !lastCell) return;

  let tableRect = table.getBoundingClientRect();
  let firstRect = firstCell.getBoundingClientRect();
  let lastRect = lastCell.getBoundingClientRect();

  // Prüfen, ob eine bestehende Linie entfernt werden muss
  let existingLine = document.querySelector(".winning-line");
  if (existingLine) existingLine.remove();

  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "winning-line");
  svg.setAttribute("viewBox", `0 0 ${tableRect.width} ${tableRect.height}`);

  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", firstRect.left - tableRect.left + firstRect.width / 2);
  line.setAttribute("y1", firstRect.top - tableRect.top + firstRect.height / 2);
  line.setAttribute("x2", lastRect.left - tableRect.left + lastRect.width / 2);
  line.setAttribute("y2", lastRect.top - tableRect.top + lastRect.height / 2);

  // Keine direkten Stile in JavaScript setzen – alles wird über CSS geregelt
  line.setAttribute("class", "winning-line-stroke");

  svg.appendChild(line);
  table.appendChild(svg);
}

function getCellPosition(index) {
  // Diese Funktion gibt die Positionen der Zellen als Prozentwerte zurück
  let row = Math.floor(index / 3);
  let col = index % 3;
  return {
    x: col * 33.33 + 16.66, // Zentriert innerhalb der Zelle
    y: row * 33.33 + 16.66, // Zentriert innerhalb der Zelle
  };
}

function generateCircleSVG() {
  return `
      <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#00B0EF" stroke-width="10" fill="none"
              stroke-dasharray="251.2" stroke-dashoffset="251.2">
              <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="0.6s" fill="freeze" />
          </circle>
      </svg>
  `;
}

function generateCrossSVG() {
  return `
      <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="10" stroke-dasharray="84.85" stroke-dashoffset="84.85">
              <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.6s" fill="freeze" />
          </line>
          <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="10" stroke-dasharray="84.85" stroke-dashoffset="84.85">
              <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.6s" fill="freeze" />
          </line>
      </svg>
  `;
}

function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "circle"; // Startspieler zurücksetzen
  winningCombination = null; // Wichtige Änderung: Gewinnkombination löschen

  // Alle vorhandenen Linien entfernen
  document.querySelectorAll(".winning-line").forEach((line) => line.remove());

  render();
}
