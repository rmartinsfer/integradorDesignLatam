document.addEventListener("DOMContentLoaded", function () {
  let openModalButton = document.getElementById("buscarTrechoButton");
  let modal = document.getElementById("myModal");
  let closeModal = modal.querySelector(".close");

  // Variáveis para armazenar origem, destino e idTrecho selecionados
  let origemSelecionada = "";
  let destinoSelecionado = "";
  let idTrecho = "";

  if (openModalButton && modal && closeModal) {
    openModalButton.addEventListener("click", function () {
      modal.style.display = "block";
    });

    closeModal.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    // Adicionando o evento de clique nos botões "Selecionar"
    document.querySelectorAll(".search-modal ").forEach((button) => {
      button.addEventListener("click", function () {
        // Obtendo origem, destino e idTrecho selecionados do modal
        idTrecho = this.closest("tr")
          .querySelector("td:nth-child(1)")
          .textContent.trim();
        origemSelecionada = this.closest("tr")
          .querySelector("td:nth-child(2)")
          .textContent.trim();
        destinoSelecionado = this.closest("tr")
          .querySelector("td:nth-child(3)")
          .textContent.trim();

        // Atualizando os campos de "id", "Origem" e "Destino" no formulário principal ao selecionar
        document.querySelector("form").action = `/resultsVoos/${idTrecho}`;

        document.querySelector('input[name="origem"]').value =
          origemSelecionada;
        document.querySelector('input[name="destino"]').value =
          destinoSelecionado;

        modal.style.display = "none";
      });
    });
  }
});
