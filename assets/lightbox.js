document.addEventListener("DOMContentLoaded", function () {

  const productCards = document.querySelectorAll(".gc-product");

  if (!productCards.length) return;

  const lightbox = document.createElement("div");

  lightbox.innerHTML = `
    <button class="gc-lightbox-close">✕</button>
    <button class="gc-lightbox-prev">‹</button>

    <div class="gc-lightbox-content">
      <img class="gc-lightbox-image" src="" alt="">
      <div class="gc-lightbox-counter"></div>
    </div>

    <button class="gc-lightbox-next">›</button>
  `;

  lightbox.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.92);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    padding: 20px;
  `;

  const style = document.createElement("style");

  style.textContent = `
    .gc-lightbox-content {
      max-width: 92vw;
      max-height: 90vh;
      text-align: center;
    }

    .gc-lightbox-image {
      max-width: 92vw;
      max-height: 82vh;
      object-fit: contain;
      border-radius: 8px;
    }

    .gc-lightbox-close,
    .gc-lightbox-prev,
    .gc-lightbox-next {
      position: fixed;
      border: none;
      background: rgba(255,255,255,.2);
      color: white;
      cursor: pointer;
      z-index: 100000;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      font-size: 28px;
    }

    .gc-lightbox-close {
      top: 20px;
      right: 20px;
    }

    .gc-lightbox-prev {
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }

    .gc-lightbox-next {
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }

    .gc-lightbox-counter {
      color: white;
      margin-top: 10px;
      font-size: 14px;
    }

    @media (max-width: 768px) {

      .gc-lightbox-image {
        max-width: 88vw;
        max-height: 78vh;
      }

      .gc-lightbox-prev {
        left: 8px;
      }

      .gc-lightbox-next {
        right: 8px;
      }

      .gc-lightbox-close {
        top: 10px;
        right: 10px;
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(lightbox);

  const bigImage =
    lightbox.querySelector(".gc-lightbox-image");

  const closeButton =
    lightbox.querySelector(".gc-lightbox-close");

  const prevButton =
    lightbox.querySelector(".gc-lightbox-prev");

  const nextButton =
    lightbox.querySelector(".gc-lightbox-next");

  const counter =
    lightbox.querySelector(".gc-lightbox-counter");

  let currentImages = [];
  let currentIndex = 0;

  productCards.forEach(function (card) {

    const images = card.querySelectorAll(
      ".gc-product-image, .gc-gallery img"
    );

    if (!images.length) return;

    currentImages = [];

    images.forEach(function (image) {
      if (image.src) {
        currentImages.push({
          src: image.src,
          alt: image.alt || "Producto"
        });
      }
    });

    images.forEach(function (image, index) {

      image.style.cursor = "zoom-in";

      image.addEventListener("click", function () {

        currentImages = [];

        images.forEach(function (img) {

          if (img.src) {
            currentImages.push({
              src: img.src,
              alt: img.alt || "Producto"
            });
          }

        });

        currentIndex = index;

        showImage();

        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden";
      });

    });

  });

  function showImage() {

    if (!currentImages.length) return;

    bigImage.src = currentImages[currentIndex].src;
    bigImage.alt = currentImages[currentIndex].alt;

    counter.textContent =
      `${currentIndex + 1} / ${currentImages.length}`;
  }

  function nextImage() {

    if (!currentImages.length) return;

    currentIndex++;

    if (currentIndex >= currentImages.length) {
      currentIndex = 0;
    }

    showImage();
  }

  function previousImage() {

    if (!currentImages.length) return;

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = currentImages.length - 1;
    }

    showImage();
  }

  nextButton.addEventListener("click", function (event) {
    event.stopPropagation();
    nextImage();
  });

  prevButton.addEventListener("click", function (event) {
    event.stopPropagation();
    previousImage();
  });

  closeButton.addEventListener("click", function () {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  });

  lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }

  });

  document.addEventListener("keydown", function (event) {

    if (lightbox.style.display !== "flex") return;

    if (event.key === "Escape") {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }

    if (event.key === "ArrowRight") {
      nextImage();
    }

    if (event.key === "ArrowLeft") {
      previousImage();
    }

  });

});
