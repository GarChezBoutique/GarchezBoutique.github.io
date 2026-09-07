document.addEventListener("DOMContentLoaded", function () {

  const images = document.querySelectorAll(
    ".gc-product img, .gc-product-image, .gc-gallery img"
  );

  if (!images.length) return;

  const lightbox = document.createElement("div");

  lightbox.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.88);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    padding: 20px;
    cursor: zoom-out;
  `;

  const bigImage = document.createElement("img");

  bigImage.style.cssText = `
    max-width: 95%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 5px 30px rgba(0,0,0,.5);
  `;

  lightbox.appendChild(bigImage);
  document.body.appendChild(lightbox);

  images.forEach(function (image) {

    image.style.cursor = "zoom-in";

    image.addEventListener("click", function () {

      bigImage.src = image.src;
      bigImage.alt = image.alt || "Producto";

      lightbox.style.display = "flex";
    });

  });

  lightbox.addEventListener("click", function () {
    lightbox.style.display = "none";
    bigImage.src = "";
  });

});
