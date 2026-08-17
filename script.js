const themeButton = document.querySelector(".theme");

themeButton.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  themeButton.textContent = dark ? "◐" : "◑";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

const collections = [
  {
    name: "Dhanak",
    desc: "Collection direction and visual story",
    images: [
      "Dhanak/0878ab254389371.6a82bb6aed983.jpg",
      "Dhanak/5c18fe254389371.6a82bb6aed2d9.jpg",
    ],
  },
  {
    name: "Layout",
    desc: "Editorial layout and visual composition",
    images: [
      "Layout/0cb2a1254391887.6a82c97f7b838.jpg",
      "Layout/71e4fe254391887.6a82ca3940685.jpg",
      "Layout/c31345254388815.6a82b80d3d572.jpg",
      "Layout/editorial.jpg",
      "Layout/main Image.jpg",
    ],
  },
  {
    name: "Minimal Khaddar",
    desc: "Campaign and collection direction",
    images: [
      "Minimal Khaddar/32a5ef254389901.6a82be6e87f60.jpg",
    ],
  },
  {
    name: "Shoots",
    desc: "Model shoots and campaign photography",
    images: [
      "Shoots/012020254392409.6a82cc28b4bcd.png",
      "Shoots/0a8015254392409.6a82cc28ac822.png",
      "Shoots/2a01ea254392409.6a82cc28afd75.png",
      "Shoots/321b05254392409.6a82cc28b150a.png",
      "Shoots/352021254392409.6a82cc28ab6b4.png",
      "Shoots/4012b1254392409.6a82cc28b2153.png",
      "Shoots/43f343254392409.6a82cc28b1b14.png",
      "Shoots/44a998254392409.6a82cc28b0453.png",
      "Shoots/49c3ec254392409.6a82cc28ae0ec.png",
      "Shoots/4cdfa2254392409.6a82cc28adadc.png",
      "Shoots/5a3e66254392409.6a82cc28af741.png",
      "Shoots/5d5caa254392409.6a82fafadc718.png",
      "Shoots/60e38f254392409.6a82cc28b3413.png",
      "Shoots/6ae312254392409.6a82fafadd190.png",
      "Shoots/6e5230254392409.6a82cc28af1b1.png",
      "Shoots/79bee9254392409.6a82fafadda6a.png",
      "Shoots/7ab3cd254392409.6a82cc28abccd.png",
      "Shoots/7f2bcc254392409.6a82cc28b279a.png",
      "Shoots/8323b4254392409.6a82fafadb761.png",
      "Shoots/8da459254392409.6a82cc28acdc9.png",
      "Shoots/981944254392409.6a82cc28b2e52.png",
      "Shoots/ad183a254392409.6a82cc28b460e.png",
      "Shoots/b4f4eb254392409.6a82cc28ac25b.png",
      "Shoots/b9b61b254392409.6a82cc28ad3db.png",
      "Shoots/baf213254392409.6a82fafadadcf.png",
      "Shoots/c1a45b254392409.6a82cc28b4068.png",
      "Shoots/c47372254392409.6a82cc28b0f85.png",
      "Shoots/cc6d9b254392409.6a82fafadbf56.png",
      "Shoots/d193e7254392409.6a82cc28b3ac5.png",
      "Shoots/d624e5254392409.6a82cc28b0a16.png",
      "Shoots/e0ece9254392409.6a82cc28ae66c.png",
      "Shoots/f9ed59254392409.6a82cc28aec03.png",
    ],
  },
  {
    name: "Silk Luxe",
    desc: "Silk Luxe collection",
    images: ["Silk Luxe/081f81254391701.6a82c88fb90ab.jpg"],
  },
  {
    name: "Tech Pack",
    desc: "Technical design and development",
    images: [
      "Tech Pack/6904cd254393245.6a82d0c4dbed5.jpg",
      "Tech Pack/b500c6254393245.6a82d4b04d5ce.jpg",
      "Tech Pack/e58dac254393245.6a82d0c4db81f.jpg",
    ],
  },
];

const collectionsNode = document.querySelector("#collections");
const gallery = document.querySelector("#gallery");
const galleryGrid = document.querySelector("#gallery-grid");
const galleryTitle = document.querySelector("#gallery-title");
const galleryCount = document.querySelector("#gallery-count");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const galleryClose = document.querySelector(".gallery-close");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const lightboxClose = document.querySelector(".lightbox-close");

let activeCollectionIndex = 0;
let activeImageIndex = 0;

collections.forEach((collection, index) => {
  const card = document.createElement("button");
  card.className = "collection reveal";
  card.type = "button";
  card.innerHTML = `
    <span class="collection-number">${String(index + 1).padStart(2, "0")}</span>
    <span class="collection-name">${collection.name}</span>
    <span class="collection-desc">${collection.desc}</span>
    <span class="collection-preview"><img src="${assetUrl(collection.images[0])}" alt="${collection.name} preview"></span>
    <span class="collection-count">${collection.images.length} images</span>
  `;
  card.addEventListener("click", () => openGallery(index));
  collectionsNode.appendChild(card);
  observer.observe(card);
});

function assetUrl(file) {
  return `assets/${file.split("/").map(encodeURIComponent).join("/")}`;
}

function getActiveCollection() {
  return collections[activeCollectionIndex];
}

function showGalleryCollection() {
  const collection = getActiveCollection();
  galleryTitle.textContent = collection.name;
  galleryCount.textContent = `${activeCollectionIndex + 1} / ${collections.length} - ${collection.images.length} images`;
  galleryGrid.innerHTML = collection.images
    .map(
      (file, index) => `
        <figure>
          <button class="gallery-image" type="button" data-image-index="${index}" aria-label="Open ${collection.name} image ${index + 1} full view">
            <img loading="${index > 8 ? "lazy" : "eager"}" src="${assetUrl(file)}" alt="${collection.name}, image ${index + 1}">
          </button>
        </figure>
      `
    )
    .join("");
}

function openGallery(collectionIndex) {
  activeCollectionIndex = collectionIndex;
  showGalleryCollection();
  gallery.showModal();
  document.body.style.overflow = "hidden";
}

function moveCollection(direction) {
  activeCollectionIndex = (activeCollectionIndex + direction + collections.length) % collections.length;
  galleryGrid.classList.remove("gallery-swap");
  void galleryGrid.offsetWidth;
  showGalleryCollection();
  galleryGrid.classList.add("gallery-swap");
}

function openLightbox(imageIndex) {
  activeImageIndex = imageIndex;
  renderLightbox();
  lightbox.showModal();
}

function renderLightbox() {
  const collection = getActiveCollection();
  const image = collection.images[activeImageIndex];
  lightboxImage.src = assetUrl(image);
  lightboxImage.alt = `${collection.name}, full view image ${activeImageIndex + 1}`;
  lightboxCaption.textContent = `${collection.name} - ${activeImageIndex + 1} / ${collection.images.length}`;
}

function moveImage(direction) {
  const collection = getActiveCollection();
  activeImageIndex = (activeImageIndex + direction + collection.images.length) % collection.images.length;
  lightboxImage.classList.remove("lightbox-swap");
  void lightboxImage.offsetWidth;
  renderLightbox();
  lightboxImage.classList.add("lightbox-swap");
}

galleryGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".gallery-image");
  if (!button) return;
  openLightbox(Number(button.dataset.imageIndex));
});

galleryPrev.addEventListener("click", () => moveCollection(-1));
galleryNext.addEventListener("click", () => moveCollection(1));
galleryClose.addEventListener("click", () => gallery.close());
lightboxPrev.addEventListener("click", () => moveImage(-1));
lightboxNext.addEventListener("click", () => moveImage(1));
lightboxClose.addEventListener("click", () => lightbox.close());

gallery.addEventListener("close", () => {
  document.body.style.overflow = "";
  if (lightbox.open) lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

gallery.addEventListener("click", (event) => {
  if (event.target === gallery) gallery.close();
});

document.addEventListener("keydown", (event) => {
  if (lightbox.open) {
    if (event.key === "ArrowLeft") moveImage(-1);
    if (event.key === "ArrowRight") moveImage(1);
    return;
  }

  if (gallery.open) {
    if (event.key === "ArrowLeft") moveCollection(-1);
    if (event.key === "ArrowRight") moveCollection(1);
  }
});
