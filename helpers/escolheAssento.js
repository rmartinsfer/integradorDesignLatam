// let assentosSelecionados = [];

// function mudarCorPoltrona(poltrona) {
//   poltrona.classList.toggle("clicado");
//   const poltronaId = parseInt(poltrona.id); // Converter o ID da poltrona para número

//   const assentoIndex = assentosSelecionados.indexOf(poltronaId);
//   if (assentoIndex === -1) {
//     assentosSelecionados.push(poltronaId);
//   } else {
//     assentosSelecionados.splice(assentoIndex, 1);
//   }
// }

// document
//   .getElementById("purchaseForm")
//   .addEventListener("submit", function (event) {
//     if (assentosSelecionados.length === 0) {
//       event.preventDefault();
//     } else {
//       const inputAssentos = document.createElement("input");
//       inputAssentos.setAttribute("type", "hidden");
//       inputAssentos.setAttribute("name", "assentosSelecionados[]"); // Utilize colchetes para enviar um array

//       // Adicionar cada assento como um elemento separado no formulário
//       assentosSelecionados.forEach(function (assentoId) {
//         const inputAssento = document.createElement("input");
//         inputAssento.setAttribute("type", "hidden");
//         inputAssento.setAttribute("name", "assentosSelecionados[]");
//         inputAssento.setAttribute("value", assentoId);
//         inputAssentos.appendChild(inputAssento);
//       });

//       this.appendChild(inputAssentos);
//     }
//   });
// const btnGenerate = document.querySelector("#btnImprimir");
// while (btnGenerate) {
//   btnGenerate.addEventListener("click", () => {
//     const content = document.querySelector("#imprimir-pdf");
//     const options = {
//       margin: [10, 10, 10, 10],
//       filename: "bilhete.pdf",
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     };
//     html2pdf().set(options).from(content).save();
//   });
// }
const btnGenerate = document.querySelector("#btnImprimir");
btnGenerate.addEventListener("click", () => {
  const boardingPasses = document.querySelectorAll(".boarding-pass");

  boardingPasses.forEach((pass, index) => {
    const nome = pass.querySelector(`#nome${index + 1}`);

    const content = pass.querySelector(".left-section");
    const options = {
      margin: [10, 10, 10, 10],
      filename: `${nome.value}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(content).save();
  });
});
