let assentosSelecionados = [];

function mudarCorPoltrona(poltrona) {
  poltrona.classList.toggle("clicado");
  const poltronaId = parseInt(poltrona.id); // Converter o ID da poltrona para número

  const assentoIndex = assentosSelecionados.indexOf(poltronaId);
  if (assentoIndex === -1) {
    assentosSelecionados.push(poltronaId);
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
      inputAssentos.setAttribute("name", "assentosSelecionados[]"); // Utilize colchetes para enviar um array

      // Adicionar cada assento como um elemento separado no formulário
      assentosSelecionados.forEach(function (assentoId) {
        const inputAssento = document.createElement("input");
        inputAssento.setAttribute("type", "hidden");
        inputAssento.setAttribute("name", "assentosSelecionados[]");
        inputAssento.setAttribute("value", assentoId);
        inputAssentos.appendChild(inputAssento);
      });

      this.appendChild(inputAssentos);
    }
  });
