const renderHome = () => {
  document.body.prepend(createHeader());
  setupHeaderInteractions();
  document.body.appendChild(createFooter());
};

renderHome();
