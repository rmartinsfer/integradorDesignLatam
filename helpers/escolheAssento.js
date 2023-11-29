let assentosSelecionados = [];

function mudarCorPoltrona(poltrona) {
  poltrona.classList.toggle("clicado");
  const assentoIndex = assentosSelecionados.indexOf(poltrona.id);
  if (assentoIndex === -1) {
    assentosSelecionados.push(poltrona.id);
  } else {
    assentosSelecionados.splice(assentoIndex, 1);
  }
}

document
  .getElementById("purchaseForm")
  .addEventListener("submit", function (event) {
    if (assentosSelecionados.length === 0) {
      event.preventDefault();
    } else {
      const inputAssentos = document.createElement("input");
      inputAssentos.setAttribute("type", "hidden");
      inputAssentos.setAttribute("name", "assentosSelecionados");
      inputAssentos.setAttribute("value", JSON.stringify(assentosSelecionados));
      this.appendChild(inputAssentos);
    }
  });
