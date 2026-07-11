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

const accordionButtons = document.querySelectorAll(".js-accordion");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".c-accordion");

    if (!item) return;

    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
    const item = button.closest(".c-qa-accordion__item");
    if (!item) return;

    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

const interviewMovie = document.querySelector(".js-interview-movie");

if (interviewMovie) {
  const viewport = interviewMovie.querySelector(".c-interview-movie__viewport");
  const track = interviewMovie.querySelector(".c-interview-movie__track");
  const items = interviewMovie.querySelectorAll(".c-interview-movie__item");
  const prevButton = interviewMovie.querySelector(".c-interview-movie__button--prev");
  const nextButton = interviewMovie.querySelector(".c-interview-movie__button--next");
  const pagination = interviewMovie.querySelector(".c-interview-movie__pagination");

  if (viewport && track && items.length && prevButton && nextButton && pagination) {
    let currentIndex = 0;

    const isDesktop = () => {
      return window.innerWidth >= 768;
    };

    const getSlidesPerView = () => {
      return isDesktop() ? 4 : 1;
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

    const updateDots = () => {
      const dots = pagination.querySelectorAll(".c-interview-movie__dot");

      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentIndex);
      });
    };

    const updateMovieSlider = () => {
      const itemWidth = items[0].getBoundingClientRect().width;

      if (isDesktop()) {
        track.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
      } else {
        track.style.transform = "none";
        viewport.scrollTo({
          left: itemWidth * currentIndex,
          behavior: "smooth",
        });
      }

      updateDots();
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

    viewport.addEventListener("scroll", () => {
      if (isDesktop()) return;

      const itemWidth = items[0].getBoundingClientRect().width;
      const newIndex = Math.round(viewport.scrollLeft / itemWidth);

      if (newIndex !== currentIndex) {
        currentIndex = Math.min(getMaxIndex(), Math.max(0, newIndex));
        updateDots();
      }
    });

    window.addEventListener("resize", () => {
      currentIndex = Math.min(currentIndex, getMaxIndex());
      createDots();

      if (isDesktop()) {
        updateMovieSlider();
      } else {
        track.style.transform = "none";
        updateDots();
      }
    });

    createDots();

    if (isDesktop()) {
      updateMovieSlider();
    } else {
      track.style.transform = "none";
      updateDots();
    }
  }
}

const pageTop = document.querySelector(".js-page-top");
const footer = document.querySelector(".js-footer");
const spFixedBanner = document.querySelector(".p-sp-fixed-banner");

if (pageTop) {
  const showPoint = 100;

  const updatePageTop = () => {
    const scroll = window.scrollY;

    if (scroll > showPoint) {
      pageTop.classList.remove("is-hide");
      pageTop.classList.add("is-show");
    } else {
      pageTop.classList.remove("is-show");
      pageTop.classList.add("is-hide");
    }

    let baseBottom = 20;

    if (window.innerWidth <= 768) {
      const bannerHeight = spFixedBanner ? spFixedBanner.offsetHeight : 0;
      baseBottom = bannerHeight + 2;
    }

    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top;
        pageTop.style.bottom = `${baseBottom + overlap - 40}px`;
      } else {
        pageTop.style.bottom = `${baseBottom}px`;
      }
    } else {
      pageTop.style.bottom = `${baseBottom}px`;
    }
  };

  window.addEventListener("scroll", updatePageTop);
  window.addEventListener("resize", updatePageTop);

  updatePageTop();

  const pageTopLink = pageTop.querySelector(".c-page-top__link");

  if (pageTopLink) {
    pageTopLink.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    setTimeout(() => {
      const header = document.querySelector(".l-header");
      const headerHeight = header ? header.offsetHeight : 0;

      const position = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }, 300);
  });
});
window.addEventListener("load", () => {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);

  if (!target) return;

  // ブラウザの自動スクロールをリセット
  window.scrollTo(0, 0);

  setTimeout(() => {
    requestAnimationFrame(() => {
      const header = document.querySelector(".l-header");
      const headerHeight = header ? header.offsetHeight : 0;

      const position = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    });
  }, 500);
});
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("form") !== "1") return;

  const target = document.querySelector("#seminar-form");
  if (!target) return;

  const header = document.querySelector(".l-header");
  const headerHeight = header ? header.offsetHeight : 0;

  // フォームより少し上で止める余白
  const extraOffset = window.innerWidth <= 640 ? 80 : 100;

  const position = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraOffset;

  window.scrollTo({
    top: position,
    behavior: "auto",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForms = document.querySelectorAll(".wpcf7 form");

  contactForms.forEach((form) => {
    const checkbox = form.querySelector('input[name="privacy-agree"][type="checkbox"]');
    const submitButton = form.querySelector(".wpcf7-submit");

    if (!checkbox || !submitButton) return;

    const updateSubmitButton = () => {
      const isChecked = checkbox.checked;

      submitButton.disabled = !isChecked;
      submitButton.classList.toggle("is-active", isChecked);
    };

    updateSubmitButton();

    checkbox.addEventListener("change", updateSubmitButton);

    form.addEventListener("reset", () => {
      window.setTimeout(updateSubmitButton, 0);
    });
  });
});
