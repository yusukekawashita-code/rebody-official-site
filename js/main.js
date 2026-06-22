const drawer = document.querySelector("#js-drawer");
const drawerButtons = document.querySelectorAll(".js-drawer-button");

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

baguetteBox.run(".c-voice-section__gallery");
