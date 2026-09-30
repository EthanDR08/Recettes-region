const recipes = [
  {
    nom: "La gardiane de taureau",
    type: "Spécialité de Camargue",
    description: "Plat traditionnel camarguais à base de viande de taureau marinée dans du vin rouge, accompagnée de légumes, d’herbes et de condiments, puis mijotée longuement afin d’obtenir une viande tendre et une sauce riche en saveurs.",
    image: "images/gardiane.png",
    video: "https://www.youtube.com/embed/8ub_wUS5KCA",
    youtube: "https://www.youtube.com/watch?v=8ub_wUS5KCA",
    info: "La vidéo proposée est une recette présentée par Les Carnets de Julie / France Télévisions."
  },
  {
    nom: "L’aïoli",
    type: "Spécialité de Provence",
    description: "Spécialité provençale composée de poissons, de légumes et souvent d’œufs durs, accompagnés d’une sauce onctueuse préparée principalement avec de l’ail et de l’huile d’olive. Ce plat convivial est traditionnellement servi au centre de la table pour être partagé.",
    image: "images/aioli.png",
    video: "https://www.youtube.com/embed/J0P3g1yfJpI",
    youtube: "https://www.youtube.com/watch?v=J0P3g1yfJpI",
    info: "La vidéo permet de découvrir la préparation d’un aïoli provençal."
  },
  {
    nom: "La daube de sanglier",
    type: "Spécialité du Sud de la France",
    description: "Plat traditionnel à base de viande de sanglier marinée dans du vin rouge, puis mijotée longuement avec des carottes, des oignons, de l’ail et des herbes aromatiques. Cette cuisson lente permet d’obtenir une viande tendre et une sauce généreuse.",
    image: "images/daube-sanglier.png",
    video: "https://www.youtube.com/embed/7MBt8uV8JxA",
    youtube: "https://www.youtube.com/watch?v=7MBt8uV8JxA",
    info: "La vidéo proposée présente une daube de sanglier préparée à l’ancienne."
  },
  {
    nom: "La Picholine",
    type: "Produit régional du Gard",
    description: "La Picholine est une variété d’olive particulièrement associée au Gard et au pays de Nîmes. Elle est appréciée comme olive de table et entre également dans la production d’huile d’olive de Nîmes.",
    image: "images/picholine.png",
    video: "https://www.youtube.com/embed/HCb0G4hAiu0",
    youtube: "https://www.youtube.com/watch?v=HCb0G4hAiu0",
    info: "Ici, la vidéo montre la cueillette de la Picholine à Bezouce. La Picholine est un produit régional plutôt qu’un plat."
  },
  {
    nom: "L’aligot",
    type: "Spécialité de l’Aubrac",
    description: "Spécialité de l’Aubrac préparée avec une purée de pommes de terre, de la tome fraîche, du beurre, de la crème et de l’ail. Sa particularité est sa texture très filante obtenue en mélangeant longuement la tome à la purée chaude.",
    image: "images/aligot.png",
    video: "https://www.youtube.com/embed/yaEXf-IsbLQ",
    youtube: "https://www.youtube.com/watch?v=yaEXf-IsbLQ",
    info: "La vidéo proposée est une recette d’aligot traditionnel par Fabrice Mignot pour France 3 Occitanie."
  },
  {
    nom: "La tielle sétoise",
    type: "Spécialité de Sète",
    description: "Spécialité de Sète composée d’une pâte garnie de poulpe, de tomates, d’oignons, d’ail et d’épices, puis cuite au four. Cette tourte salée est reconnaissable à sa pâte dorée et à sa garniture généreuse.",
    image: "images/tielle-setoise.png",
    video: "https://www.youtube.com/embed/_A9xpK1rKNs",
    youtube: "https://www.youtube.com/watch?v=_A9xpK1rKNs",
    info: "La vidéo proposée présente la recette de la tielle sétoise avec Europe 1."
  }
];

const grid = document.getElementById("recipe-grid");
const count = document.getElementById("recipe-count");
const modal = document.getElementById("recipe-modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

count.textContent = `${recipes.length} spécialités`;

function thumbFromVideo(url) {
  const id = url.split("/embed/")[1];
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function renderCards() {
  grid.innerHTML = recipes.map((recipe, index) => `
    <article class="recipe-card" tabindex="0" role="button" data-index="${index}">
      <img class="recipe-image" src="${recipe.image}" alt="Image de ${recipe.nom}" loading="lazy">
      <div class="recipe-card-content">
        <p class="eyebrow">${recipe.type}</p>
        <h3>${recipe.nom}</h3>
        <p>${recipe.description}</p>
        <span class="watch">▶ Voir la présentation vidéo</span>
      </div>
    </article>
  `).join("");
}

function openRecipe(index) {
  const recipe = recipes[index];
  modalBody.innerHTML = `
    <p class="eyebrow">${recipe.type}</p>
    <h2 class="modal-title" id="modal-title">${recipe.nom}</h2>
    <p class="modal-description">${recipe.description}</p>
    <div class="video-wrapper">
      <iframe
        src="${recipe.video}"
        title="Vidéo sur ${recipe.nom}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    </div>
    <a class="video-link" href="${recipe.youtube}" target="_blank" rel="noopener noreferrer">↗ Ouvrir la vidéo sur YouTube</a>
    <div class="info-box">${recipe.info}</div>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeRecipe() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalBody.innerHTML = "";
  document.body.style.overflow = "";
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".recipe-card");
  if (card) openRecipe(Number(card.dataset.index));
});

grid.addEventListener("keydown", (event) => {
  const card = event.target.closest(".recipe-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openRecipe(Number(card.dataset.index));
  }
});

closeModal.addEventListener("click", closeRecipe);
modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") closeRecipe();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeRecipe();
});

renderCards();
