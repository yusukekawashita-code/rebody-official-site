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

const videoSliderEl = document.querySelector(".js-video-slider");

if (videoSliderEl && typeof Swiper !== "undefined") {
  // Swiper初期化前に、動画クリックがSwiperへ伝わらないようにする
  videoSliderEl.querySelectorAll(".c-video-slider__video").forEach((video) => {
    ["pointerdown", "mousedown", "touchstart", "click"].forEach((eventName) => {
      video.addEventListener(
        eventName,
        (event) => {
          event.stopImmediatePropagation();
        },
        true,
      );
    });
  });

  const videoSlider = document.querySelector(".js-video-slider");

  if (videoSlider) {
    const wrapper = videoSlider.querySelector(".swiper-wrapper");
    const slides = videoSlider.querySelectorAll(".swiper-slide");
    const root = videoSlider.closest(".c-video-slider");
    const prevButton = root.querySelector(".c-video-slider__button--prev");
    const nextButton = root.querySelector(".c-video-slider__button--next");
    const pagination = root.querySelector(".c-video-slider__pagination");

    let currentIndex = 0;

    const getSlidesPerView = () => {
      return window.innerWidth >= 768 ? 4 : 1;
    };

    const getMaxIndex = () => {
      return Math.max(0, slides.length - Math.ceil(getSlidesPerView()));
    };

    const createDots = () => {
      pagination.innerHTML = "";

      for (let i = 0; i <= getMaxIndex(); i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "c-video-slider__dot";
        dot.setAttribute("aria-label", `${i + 1}番目のスライドへ`);

        dot.addEventListener("click", () => {
          currentIndex = i;
          updateSlider();
        });

        pagination.appendChild(dot);
      }
    };

    const updateSlider = () => {
      const slideWidth = slides[0].getBoundingClientRect().width;
      wrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

      const dots = pagination.querySelectorAll(".c-video-slider__dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentIndex);
      });

      slides.forEach((slide) => {
        const video = slide.querySelector("video");
        if (video) video.pause();
      });
    };

    prevButton.addEventListener("click", () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateSlider();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
      updateSlider();
    });

    window.addEventListener("resize", () => {
      currentIndex = Math.min(currentIndex, getMaxIndex());
      createDots();
      updateSlider();
    });

    createDots();
    updateSlider();
  }
}
