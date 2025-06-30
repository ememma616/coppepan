document.addEventListener("DOMContentLoaded", () => {
  const labelMap = {
    number: "数字",
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
  const activeCols = new Set(Object.keys(labelMap).filter(key => key !== "number")); // 数字以外全表示

  function updateColumnVisibility() {
    const headers = table.querySelectorAll("thead th");
    const rows = table.querySelectorAll("tbody tr");

    // 列インデックス取得
    const colIndexes = {};
    headers.forEach((th, idx) => {
      Object.keys(labelMap).forEach((key) => {
        if (th.classList.contains(`col-${key}`)) {
          colIndexes[key] = idx;
        }
      });
    });

    // 各列のthとtdを操作
    Object.entries(colIndexes).forEach(([key, idx]) => {
      const hide = (key !== "number") && !activeCols.has(key); // 数字以外で非アクティブなら隠す
      // ヘッダーセル
      headers[idx].classList.toggle("col-hidden", hide);

      // tbodyの各行セル
      rows.forEach(row => {
        if (row.cells[idx]) {
          row.cells[idx].classList.toggle("col-hidden", hide);
        }
      });
    });
  }

  // メニューボタン生成（数字は除く）
  Object.keys(labelMap).forEach(key => {
    if (key === "number") return;
    const btn = document.createElement("button");
    btn.textContent = labelMap[key];
    btn.classList.add("toggle-btn");
    btn.dataset.column = key;
    btn.addEventListener("click", () => {
      btn.classList.toggle("inactive");
      if (btn.classList.contains("inactive")) {
        activeCols.delete(key);
      } else {
        activeCols.add(key);
      }
      updateColumnVisibility();
    });
    menuContainer.appendChild(btn);
  });

  updateColumnVisibility();

  // ハンバーガーメニュー開閉処理
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const menuCloseBtn = document.querySelector(".menu .close-button");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }
  if (menuCloseBtn && menu) {
    menuCloseBtn.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  }

  // スプラッシュ画面制御
  const splash = document.querySelector(".splash-screen");
  const splashText = document.querySelector(".splash-text");

  if (splash && splashText) {
    splashText.addEventListener("animationend", () => {
      splash.classList.add("fade-out");
      splash.addEventListener("transitionend", () => {
        splash.style.display = "none";
      }, { once: true });
    });
  }
});
