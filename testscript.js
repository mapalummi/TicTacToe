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
      let className = winningCombination && winningCombination.includes(index) ? 'winner' : '';
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
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      winningCombination = combination;
      return true;
    }
  }

  if (fields.every(field => field !== null)) {
    // Unentschieden, falls alle Felder belegt sind
    gameOver = true;
  }

  return false;
}

function drawWinningLine() {
  if (!winningCombination) return;

  let cells = document.querySelectorAll('td');
  let [a, b, c] = winningCombination;

  // Berechnung der Positionen der Zellen für das SVG Line
  let startPos = getCellPosition(a);
  let endPos = getCellPosition(c);

  // Berechnung der Eigenschaften für die Linie
  let startCell = document.getElementById(`cell-${a}`);
  let endCell = document.getElementById(`cell-${c}`);

  // SVG-Linie als Hintergrund in die Zellen einfügen
  startCell.style.position = 'relative';
  endCell.style.position = 'relative';

  // Die Linie wird nun direkt in den Content-Bereich eingefügt, nicht in einzelne Zellen
  document.querySelector('.tic-tac-toe').insertAdjacentHTML('beforeend', `
    <svg class="winning-line" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="${startPos.x}" y1="${startPos.y}" x2="${endPos.x}" y2="${endPos.y}" 
            stroke="#FF0000" stroke-width="10" />
    </svg>
  `);
}

function getCellPosition(index) {
  // Diese Funktion gibt die Positionen der Zellen als Prozentwerte zurück
  let row = Math.floor(index / 3);
  let col = index % 3;
  return { 
    x: col * 33.33 + 16.66,  // Zentriert innerhalb der Zelle
    y: row * 33.33 + 16.66   // Zentriert innerhalb der Zelle
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
