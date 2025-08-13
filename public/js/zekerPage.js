const createZekerCard = (zeker) => {
  const card = createHtmlElement("div", "zeker-card");

  const iconDiv = createHtmlElement("div", "zeker-icon");
  const icon = createHtmlElement("i", "fas fa-pray");
  iconDiv.appendChild(icon);

  const title = createHtmlElement("h3", "", zeker.title || "ذكر");
  const description = createHtmlElement("p", "", zeker.description || "");

  const repeatCount = createHtmlElement(
    "div",
    "zeker-count",
    `عدد التكرار: ${zeker.counter || 0}`
  );

  const btnContainer = createHtmlElement("div", "counter-buttons");

  const incrementBtn = createHtmlElement("button", "increment-btn", "+");
  const decrementBtn = createHtmlElement("button", "decrement-btn", "-");

  incrementBtn.addEventListener("click", () => {
    updateZekerCounter(zeker.id, true).then((updated) => {
      zeker.counter = updated.counter;
      repeatCount.textContent = `عدد التكرار: ${zeker.counter}`;
    });
  });

  decrementBtn.addEventListener("click", () => {
    if (zeker.counter > 0) {
      updateZekerCounter(zeker.id, false).then((updated) => {
        zeker.counter = updated.counter;
        repeatCount.textContent = `عدد التكرار: ${zeker.counter}`;
      });
    }
  });

  btnContainer.append(incrementBtn, decrementBtn);

  card.append(iconDiv, title, description, repeatCount, btnContainer);
  return card;
};

const renderZekerSection = async () => {
  const section = createHtmlElement("section", "section zeker-section", "", {
    id: "zeker",
  });
  const container = createHtmlElement("div", "container");
  const title = createHtmlElement("h2", "section-title", "تصفح أذكار المسلم");

  const categoryWrapper = createHtmlElement("div", "zeker-categories");

  const data = await fetchZekerData();

  const categories = ["الكل", ...new Set(data.map((d) => d.category))];

  categories.forEach((cat, index) => {
    const label = createHtmlElement("button", "category-label", cat);
    if (index === 0) label.classList.add("active");

    label.addEventListener("click", () => {
      document.querySelectorAll(".category-label").forEach((btn) => {
        btn.classList.remove("active");
      });
      label.classList.add("active");

      const filteredData =
        cat === "الكل" ? data : data.filter((d) => d.category === cat);
      renderZekerGrid(filteredData, grid);
    });
    categoryWrapper.appendChild(label);
  });

  const grid = createHtmlElement("div", "zeker-grid");
  renderZekerGrid(data, grid);

  container.append(title, categoryWrapper, grid);
  section.appendChild(container);

  const main = document.querySelector("main");
  main.innerHTML = "";
  main.appendChild(section);
};

const renderZekerGrid = (data, grid) => {
  grid.innerHTML = "";
  if (data.length === 0) {
    const emptyMessage = createHtmlElement(
      "p",
      "empty-message",
      "لا توجد أذكار للعرض حالياً."
    );
    grid.appendChild(emptyMessage);
  } else {
    data.forEach((zeker) => grid.appendChild(createZekerCard(zeker)));
  }
};
