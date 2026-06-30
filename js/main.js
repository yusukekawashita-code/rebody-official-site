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

const qaAccordionButtons = document.querySelectorAll(".js-qa-accordion");

qaAccordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".p-qa-accordion__item");
    if (!item) return;

    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

const interviewMovie = document.querySelector(".js-interview-movie");

if (interviewMovie) {
  const track = interviewMovie.querySelector(".c-interview-movie__track");
  const items = interviewMovie.querySelectorAll(".c-interview-movie__item");
  const prevButton = interviewMovie.querySelector(".c-interview-movie__button--prev");
  const nextButton = interviewMovie.querySelector(".c-interview-movie__button--next");
  const pagination = interviewMovie.querySelector(".c-interview-movie__pagination");

  if (track && items.length && prevButton && nextButton && pagination) {
    let currentIndex = 0;

    const getSlidesPerView = () => {
      return window.innerWidth >= 768 ? 4 : 1;
    };

    const getMaxIndex = () => {
      return Math.max(0, items.length - getSlidesPerView());
    };

    const pauseAllVideos = () => {
      items.forEach((item) => {
        const video = item.querySelector("video");
        if (video) video.pause();
      });
    };

    const updateMovieSlider = () => {
      const itemWidth = items[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${itemWidth * currentIndex}px)`;

      const dots = pagination.querySelectorAll(".c-interview-movie__dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentIndex);
      });

      pauseAllVideos();
    };

    const createDots = () => {
      pagination.innerHTML = "";

      for (let i = 0; i <= getMaxIndex(); i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "c-interview-movie__dot";
        dot.setAttribute("aria-label", `${i + 1}番目の動画へ`);

        dot.addEventListener("click", () => {
          currentIndex = i;
          updateMovieSlider();
        });

        pagination.appendChild(dot);
      }
    };

    prevButton.addEventListener("click", () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateMovieSlider();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
      updateMovieSlider();
    });

    window.addEventListener("resize", () => {
      currentIndex = Math.min(currentIndex, getMaxIndex());
      createDots();
      updateMovieSlider();
    });

    createDots();
    updateMovieSlider();
  }
}
