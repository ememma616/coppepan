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

  function updateColumnVisibility() {
    const headers = table.querySelectorAll("thead th");
    const rows = table.querySelectorAll("tr");

    // 対象の列インデックスを取得
    const colIndexes = {};
    headers.forEach((th, index) => {
      const classList = th.classList;
      Object.keys(labelMap).forEach((key) => {
        if (classList.contains(`col-${key}`)) {
          colIndexes[key] = index;
        }
      });
    });

    // 各行の表示・非表示を判定
    rows.forEach((row, rowIndex) => {
      let shouldHide = false;

      Object.keys(labelMap).forEach((key) => {
        const colIndex = colIndexes[key];
        if (colIndex === undefined) return;

        const cell = row.cells[colIndex];
        if (!activeCols.has(key)) {
          const isEmpty = !cell || cell.textContent.trim() === "";
          if (isEmpty) {
            shouldHide = true;
          }
        }
      });

      row.style.display = shouldHide ? "none" : "";
    });
  }

  // ボタン生成
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
      updateColumnVisibility();
    });

    menuContainer.appendChild(button);
  });

  // 初期表示時の行判定
  updateColumnVisibility();
});
