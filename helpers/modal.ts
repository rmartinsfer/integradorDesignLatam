document.addEventListener("DOMContentLoaded", () => {
  const openModalButton = document.getElementById(
    "buscarTrechoButton"
  ) as HTMLButtonElement;
  const modal = document.getElementById("myModal") as HTMLElement;
  const closeModal = modal.querySelector(".close") as HTMLElement;

  if (openModalButton && modal && closeModal) {
    openModalButton.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});
