const showZekerDetails = (zekerId) => {
  fetch(`http://localhost:3000/zeker/${zekerId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((zeker) => {
      const modalOverlay = createHtmlElement("div", "modal-overlay");
      const modal = createHtmlElement("div", "modal");

      const closeBtn = createHtmlElement("button", "modal-close", "×");
      closeBtn.addEventListener("click", () => {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = "auto";
      });

      const modalContent = createHtmlElement("div", "modal-content");
      const title = createHtmlElement(
        "h2",
        "modal-title",
        zeker.title || "ذكر"
      );
      const description = createHtmlElement(
        "p",
        "modal-description",
        zeker.description || ""
      );

      const virtueSection = createHtmlElement("div", "modal-virtue-section");
      const virtueTitle = createHtmlElement(
        "h3",
        "modal-subtitle",
        "فضل الذكر:"
      );
      const virtueText = createHtmlElement(
        "p",
        "modal-virtue",
        zeker.zekervirtue
      );
      virtueSection.append(virtueTitle, virtueText);

      const counterSection = createHtmlElement("div", "modal-counter");
      const counterLabel = createHtmlElement("span", "", "عدد التكرار: ");
      const counterValue = createHtmlElement(
        "span",
        "counter-value",
        zeker.counter || 0
      );

      const btnContainer = createHtmlElement("div", "modal-buttons");
      const incrementBtn = createHtmlElement(
        "button",
        "modal-btn increment",
        "+"
      );
      const decrementBtn = createHtmlElement(
        "button",
        "modal-btn decrement",
        "-"
      );

      const updateCounter = (increment) => {
        if (increment || (!increment && zeker.counter > 0)) {
          updateZekerCounter(zekerId, increment).then((updated) => {
            zeker.counter = updated.counter;
            counterValue.textContent = zeker.counter;
            const cardCounter = document.querySelector(
              `.zeker-card[data-zeker-id="${zekerId}"] .zeker-count`
            );
            if (cardCounter) {
              cardCounter.textContent = `عدد التكرار: ${zeker.counter}`;
            }
          });
        }
      };

      incrementBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateCounter(true);
      });

      decrementBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateCounter(false);
      });

      btnContainer.append(decrementBtn, counterValue, incrementBtn);
      counterSection.append(counterLabel, btnContainer);

      modalContent.append(
        closeBtn,
        title,
        description,
        virtueSection,
        counterSection
      );

      modal.appendChild(modalContent);
      modalOverlay.appendChild(modal);

      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          document.body.removeChild(modalOverlay);
          document.body.style.overflow = "auto";
        }
      });

      document.body.style.overflow = "hidden";
      document.body.appendChild(modalOverlay);
    })
    .catch((error) => {
      console.error("Error loading Zeker details:", error);
      alert("حدث خطأ أثناء تحميل تفاصيل الذكر. يرجى المحاولة مرة أخرى.");
    });
};

const createZekerCard = (zeker) => {
  const card = createHtmlElement("div", "zeker-card");
  card.dataset.zekerId = zeker.id;

  card.classList.add("hover-effect");
  card.addEventListener("click", () => showZekerDetails(zeker.id));

  const iconDiv = createHtmlElement("div", "zeker-icon");
  const icon = createHtmlElement("i", "fas fa-pray");
  iconDiv.appendChild(icon);

  const title = createHtmlElement("h3", "", zeker.title || "ذكر");

  const description = createHtmlElement(
    "p",
    "zeker-description",
    zeker.description || ""
  );
  const fullDescription = zeker.description || "";

  if (fullDescription.length > 80) {
    description.textContent = fullDescription.substring(0, 80) + "...";
    const readMore = createHtmlElement("span", "read-more", " اقرأ المزيد");
    readMore.style.color = "var(--secondary-color)";
    readMore.style.cursor = "pointer";
    readMore.style.fontWeight = "bold";
    description.appendChild(readMore);

    readMore.addEventListener("click", (e) => {
      e.stopPropagation();
      description.textContent = fullDescription;
    });
  }

  const repeatCount = createHtmlElement(
    "div",
    "zeker-count",
    `عدد التكرار: ${zeker.counter || 0}`
  );

  const btnContainer = createHtmlElement("div", "counter-buttons");

  const incrementBtn = createHtmlElement("button", "increment-btn");
  incrementBtn.appendChild(createHtmlElement("i", "fas fa-plus"));

  const decrementBtn = createHtmlElement("button", "decrement-btn");
  decrementBtn.appendChild(createHtmlElement("i", "fas fa-minus"));

  const favBtn = createHtmlElement("button", "fav-btn");
  const heartIcon = createHtmlElement(
    "i",
    zeker.is_fav ? "fas fa-heart" : "far fa-heart"
  );
  heartIcon.style.color = zeker.is_fav ? "#ff4757" : "#666";
  favBtn.appendChild(heartIcon);

  const taskBtn = createHtmlElement("button", "task-btn");
  const taskIcon = createHtmlElement("i", "fas fa-tasks");
  taskBtn.appendChild(taskIcon);

  incrementBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    updateZekerCounter(zeker.id, true).then((updated) => {
      zeker.counter = updated.counter;
      repeatCount.textContent = `عدد التكرار: ${zeker.counter}`;
    });
  });

  decrementBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (zeker.counter > 0) {
      updateZekerCounter(zeker.id, false).then((updated) => {
        zeker.counter = updated.counter;
        repeatCount.textContent = `عدد التكرار: ${zeker.counter}`;
      });
    }
  });

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const newFavStatus = !zeker.is_fav;
    updateZekerFav(zeker.id, newFavStatus).then((updated) => {
      if (updated) {
        zeker.is_fav = updated.is_fav;
        heartIcon.className = zeker.is_fav ? "fas fa-heart" : "far fa-heart";
        heartIcon.style.color = zeker.is_fav ? "#ff4757" : "#666";
      }
    });
  });

  taskBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showCreateTaskModal(zeker);
  });

  btnContainer.append(decrementBtn, incrementBtn, favBtn, taskBtn);
  card.append(iconDiv, title, description, repeatCount, btnContainer);

  return card;
};

const renderZekerSection = () => {
  const section = createHtmlElement("section", "section zeker-section", "", {
    id: "zeker",
  });
  const container = createHtmlElement("div", "container");
  const title = createHtmlElement("h2", "section-title1", "تصفح أذكار المسلم");

  const categoryWrapper = createHtmlElement("div", "zeker-categories");
  const grid = createHtmlElement("div", "zeker-grid");

  const loadingText = createHtmlElement(
    "p",
    "loading-text",
    "جاري تحميل البيانات..."
  );
  grid.appendChild(loadingText);

  fetchZekerData()
    .then((data) => {
      // Remove loader
      grid.innerHTML = "";

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

      renderZekerGrid(data, grid);
    })
    .catch((error) => {
      console.error("Error fetching Zeker data:", error);
      grid.innerHTML = `<p class="empty-message">حدث خطأ أثناء تحميل البيانات.</p>`;
    });

  container.append(title, categoryWrapper, grid);
  section.appendChild(container);

  const main = document.querySelector("main");
  main.innerHTML = "";
  main.appendChild(section);
};

const renderFav = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const section = createHtmlElement("section", "section zeker-section", "", {
    id: "favorites-section",
  });
  const container = createHtmlElement("div", "container");
  const title = createHtmlElement("h2", "section-title1", "الأذكار المفضلة");

  const grid = createHtmlElement("div", "zeker-grid");

  // Show loading text while fetching
  const loadingText = createHtmlElement(
    "p",
    "loading-text",
    "جاري تحميل الأذكار المفضلة..."
  );
  grid.appendChild(loadingText);

  fetch("http://localhost:3000/zeker")
    .then((res) => res.json())
    .then((data) => {
      grid.innerHTML = ""; // Remove loader
      const favZekers = data.filter((z) => z.is_fav); // match DB column
      renderZekerGrid(favZekers, grid);
    })
    .catch((err) => {
      console.error(err);
      grid.innerHTML = `<p class="empty-message">حدث خطأ أثناء تحميل البيانات.</p>`;
    });

  container.append(title, grid);
  section.appendChild(container);
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

const showCreateTaskModal = (zeker) => {
  console.log(zeker);

  const modalOverlay = createHtmlElement("div", "modal-overlay");
  const modal = createHtmlElement("div", "modal");

  const closeBtn = createHtmlElement("button", "modal-close", "×");
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
    document.body.style.overflow = "auto";
  });

  const title = createHtmlElement(
    "h2",
    "modal-title",
    `إنشاء مهمة للذكر: ${zeker.title}`
  );

  const inputLabel = createHtmlElement(
    "label",
    "",
    "أدخل عدد التكرارات المطلوب:"
  );
  const input = createHtmlElement("input");
  input.type = "number";
  input.min = "1";
  input.placeholder = "مثال: 33";

  const createBtn = createHtmlElement("button", "modal-btn", "إنشاء المهمة");
  createBtn.addEventListener("click", () => {
    const targetCount = parseInt(input.value, 10);
    if (!targetCount || targetCount <= 0) {
      alert("يرجى إدخال عدد صحيح أكبر من 0");
      return;
    }

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1,
        zekher_id: zeker.id,
        title: zeker.title,
        due_date: new Date(1755151846673).toISOString().split("T")[0],
        is_done: false,
        target_count: targetCount,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("فشل إنشاء المهمة");
        return res.json();
      })
      .then(() => {
        alert("تم إنشاء المهمة بنجاح");
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = "auto";
      })
      .catch((err) => {
        console.error(err);
        alert("حدث خطأ أثناء إنشاء المهمة");
      });
  });

  const modalContent = createHtmlElement("div", "modal-content");
  modalContent.append(closeBtn, title, inputLabel, input, createBtn);

  modal.appendChild(modalContent);
  modalOverlay.appendChild(modal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
      document.body.style.overflow = "auto";
    }
  });

  document.body.style.overflow = "hidden";
  document.body.appendChild(modalOverlay);
};
