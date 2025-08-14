const renderHome = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  setupHeaderInteractions();
  main.appendChild(createHeroBanner());
  main.appendChild(createFeaturesSection());
  main.appendChild(createRandomZekrSection());
  main.appendChild(createAzkarSection());
  main.appendChild(createArticlesSection());
  // main.appendChild(createArticleCard())
};

const renderRoute = async () => {
  const main = document.querySelector("main");
  const hash = window.location.hash || "/";

  switch (hash) {
    case "#azkar":
      await renderZekerSection();

      break;
      case "#articles":
      await renderArticlesCard();

      break;

    default:
      renderHome();
      break;
  }
};

const renderPage = () => {
  document.body.prepend(createHeader());
  renderRoute();
  document.body.appendChild(createFooter());
  updateRandomZekr();
  setInterval(updateRandomZekr, 300000);
};

window.addEventListener("hashchange", renderRoute);
renderPage();
