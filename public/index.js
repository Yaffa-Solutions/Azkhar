const renderHome = () => {
  document.body.prepend(createHeader());
  setupHeaderInteractions();
  document.body.appendChild(createHeroBanner());
  document.body.appendChild(createFeaturesSection());
  document.body.appendChild(createRandomZekrSection());
  document.body.appendChild(createArticlesSection());
  document.body.appendChild(createFooter());
};

renderHome();
updateRandomZekr();
setInterval(updateRandomZekr, 300000);
