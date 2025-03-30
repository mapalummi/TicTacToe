let fields = [null, "circle", null, "cross", null, null, null, null, null];

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
        symbol = "O";
      } else if (fields[index] === "cross") {
        symbol = "X";
      }
      tableHTML += `<td>${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  content.innerHTML = tableHTML;
}
