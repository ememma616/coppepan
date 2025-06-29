document.addEventListener("DOMContentLoaded", () => {
  const labelMap = {
    alphabet: "アルファベット",
    element: "元素記号",
    greek: "ギリシャ文字",
    hiragana: "ひらがな",
    eto: "干支",
    italian: "イタリア語",
    russian: "ロシア語",
    spanish: "スペイン語"
  };

  const table = document.getElementById("cipher-table");
  const menuContainer = document.getElementById("menu");
  const activeCols = new Set(Object.keys(labelMap));

  function updateRowVisibility() {
    const headers = table.querySelectorAll("thead th");
    const rows = table.querySelectorAll("tbody tr");

    const colIndexes = {};
    headers.forEach((th, index) => {
      Object.keys(labelMap).forEach((key) => {
        if (th.classList.contains(`col-${key}`)) {
          colIndexes[key] = index;
        }
      });
    });

    rows.forEach((row) => {
      let shouldHide = false;

      Object.keys(colIndexes).forEach((key) => {
        if (!activeCols.has(key)) {
          const cell = row.cells[colIndexes[key]];
          if (!cell || cell.textContent.trim() === "") {
            shouldHide = true;
          }
        }
      });

      row.style.display = shouldHide ? "none" : "";
    });
  }

  Object.keys(labelMap).forEach((key) => {
    const button = document.createElement("button");
    button.textContent = labelMap[key];
    button.classList.add("toggle-btn");
    button.dataset.column = key;

    button.addEventListener("click", () => {
      button.classList.toggle("inactive");
      if (button.classList.contains("inactive")) {
        activeCols.delete(key);
      } else {
        activeCols.add(key);
      }
      updateRowVisibility();
    });

    menuContainer.appendChild(button);
  });

  updateRowVisibility();
});
