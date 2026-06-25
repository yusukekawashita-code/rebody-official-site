const drawer = document.querySelector("#js-drawer");
const drawerButtons = document.querySelectorAll(".js-drawer-button");

if (drawer && drawerButtons.length) {
  drawerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isOpen = drawer.classList.toggle("is-open");

      drawer.setAttribute("aria-hidden", !isOpen);

      drawerButtons.forEach((btn) => {
        btn.classList.toggle("is-open", isOpen);
        btn.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
      });

      document.body.classList.toggle("is-drawer-open", isOpen);
    });
  });
}

if (typeof baguetteBox !== "undefined") {
  baguetteBox.run(".c-voice-section__gallery");
}

const drawerAccordionButtons = document.querySelectorAll(".js-drawer-accordion");

drawerAccordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".p-drawer__item");

    if (item) {
      item.classList.toggle("is-open");
    }
  });
});

const toolModalOpenButtons = document.querySelectorAll(".js-tool-modal-open");
const toolModalCloseButtons = document.querySelectorAll(".js-tool-modal-close");

toolModalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.modalTarget;
    const modal = document.getElementById(targetId);

    if (!modal) return;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");
  });
});

toolModalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".c-tool-modal");

    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const openModal = document.querySelector(".c-tool-modal.is-open");

  if (!openModal) return;

  openModal.classList.remove("is-open");
  openModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-modal-open");
});
