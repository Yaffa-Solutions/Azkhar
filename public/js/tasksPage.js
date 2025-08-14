const showTaskDetails = (id) => {
  fetchTaskById(id)
    .then((task) => {
      const overlay = createHtmlElement("div", "modal-overlay");
      const modal = createHtmlElement("div", "modal");
      const closeBtn = createHtmlElement("button", "modal-close", "×");
      closeBtn.onclick = () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = "auto";
      };

      const title = createHtmlElement("h2", "modal-title", task.title);

      const status = createHtmlElement(
        "p",
        "modal-status",
        `الحالة: ${task.is_done ? "مكتملة" : "قيد التنفيذ"}`
      );
      const targetCount = createHtmlElement(
        "p",
        "modal-target",
        `🎯 عدد التكرار: ${task.target_count || 0}`
      );

      const btnContainer = createHtmlElement("div", "modal-buttons");
      const updateBtn = createHtmlElement(
        "button",
        "btn-update",
        "تحديث العدد"
      );

      // New: Show modal to update target count
      updateBtn.onclick = (e) => {
        e.stopPropagation();
        showUpdateTargetModal(task, targetCount);
      };

      const deleteBtn = createHtmlElement("button", "btn-delete", "حذف");
      deleteBtn.onclick = () => {
        if (confirm("هل تريد الحذف؟"))
          deleteTask(task.id).then(() => {
            renderTaskGrid();
            document.body.removeChild(overlay);
          });
      };

      btnContainer.append(updateBtn, deleteBtn);

      modal.append(closeBtn, title, status, targetCount, btnContainer);
      overlay.appendChild(modal);

      overlay.onclick = (e) => {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
          document.body.style.overflow = "auto";
        }
      };

      document.body.style.overflow = "hidden";
      document.body.appendChild(overlay);
    })
    .catch((err) => console.error(err));
};

const showUpdateTargetModal = (task, targetCountElement) => {
  const overlay = createHtmlElement("div", "modal-overlay");
  const modal = createHtmlElement("div", "modal");

  const closeBtn = createHtmlElement("button", "modal-close", "×");
  closeBtn.onclick = () => {
    document.body.removeChild(overlay);
    document.body.style.overflow = "auto";
  };

  const title = createHtmlElement(
    "h2",
    "modal-title",
    `تحديث عدد التكرار: ${task.title}`
  );

  const inputLabel = createHtmlElement("label", "", "أدخل العدد الجديد:");
  const input = createHtmlElement("input");
  input.type = "number";
  input.min = "1";
  input.value = task.target_count || 1;

  const saveBtn = createHtmlElement("button", "modal-btn", "تحديث");
  saveBtn.onclick = () => {
    const newCount = parseInt(input.value, 10);
    if (!newCount || newCount <= 0) {
      alert("يرجى إدخال رقم صحيح أكبر من 0");
      return;
    }
    const updatedTask = { ...task, target_count: newCount };

    updateTask(task.id, updatedTask)
      .then((updatedTask) => {
        task.target_count = updatedTask.target_count;
        targetCountElement.textContent = `🎯 عدد التكرار: ${task.target_count}`;
        renderTaskGrid();
        document.body.removeChild(overlay);
      })
      .catch((err) => {
        console.error(err);
        alert("حدث خطأ أثناء التحديث");
      });
  };

  const modalContent = createHtmlElement("div", "modal-content");
  modalContent.append(closeBtn, title, inputLabel, input, saveBtn);

  modal.appendChild(modalContent);
  overlay.appendChild(modal);

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
      document.body.style.overflow = "auto";
    }
  };

  document.body.style.overflow = "hidden";
  document.body.appendChild(overlay);
};

const createTaskCard = (task) => {
  const card = createHtmlElement("div", "task-card");

  const title = createHtmlElement("h3", "task-title", task.title);

  const desc = createHtmlElement(
    "p",
    "task-description",
    task.description
      ? task.description.substring(0, 60) +
          (task.description.length > 60 ? "..." : "")
      : "لا يوجد وصف"
  );

  const meta = createHtmlElement("div", "task-meta");
  // Due date
  if (task.due_date) {
    const due = createHtmlElement(
      "p",
      "task-due",
      `📅  : ${new Date(task.due_date).toLocaleDateString()}`
    );
    meta.appendChild(due);
  }

  // Target count
  if (task.target_count) {
    const target = createHtmlElement(
      "p",
      "task-target",
      `🎯 عدد التكرار: ${task.target_count}`
    );
    meta.appendChild(target);
  }

  const status = createHtmlElement(
    "p",
    "task-status",
    `الحالة: ${task.is_done ? "مكتملة" : "قيد التنفيذ"}`
  );

  const btns = createHtmlElement("div", "task-buttons");
  const updateBtn = createHtmlElement("button", "btn-update", "تحديث");
  updateBtn.onclick = (e) => {
    e.stopPropagation();
    showTaskDetails(task.id);
  };
  const deleteBtn = createHtmlElement("button", "btn-delete", "حذف");
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    if (confirm("هل تريد الحذف؟"))
      deleteTask(task.id).then(() => renderTaskGrid());
  };
  btns.append(updateBtn, deleteBtn);

  card.append(title, desc, meta, status, btns);

  // Clicking on card opens details
  card.onclick = () => showTaskDetails(task.id);

  return card;
};

const renderTaskGrid = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  const container = createHtmlElement("div", "container");
  const grid = createHtmlElement("div", "task-grid");
  fetchTasks()
    .then((tasks) => {
      if (!tasks.length)
        grid.appendChild(
          createHtmlElement("p", "empty-message", "لا توجد مهام")
        );
      else tasks.forEach((t) => grid.appendChild(createTaskCard(t)));
    })
    .catch((err) => {
      console.error(err);
      grid.appendChild(
        createHtmlElement("p", "empty-message", "حدث خطأ أثناء تحميل المهام")
      );
    });
  container.append(grid);
  main.appendChild(container);
};
