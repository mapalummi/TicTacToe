let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";

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
      tableHTML += `<td onclick="setSymbol(this, ${index})">${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  content.innerHTML = tableHTML;
}

function setSymbol(cell, index) {
  if (!fields[index]) {
    fields[index] = currentPlayer;
    cell.innerHTML = currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG();
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
  }
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