document.addEventListener("DOMContentLoaded", () => {
  const splash = document.querySelector(".splash-screen");
  const splashText = document.querySelector(".splash-text");

  splashText.style.opacity = 0;
  splashText.style.transform = "scale(0.5)";
  splashText.style.transition = "opacity 1s ease, transform 1s ease";

  setTimeout(() => {
    splashText.style.opacity = 1;
    splashText.style.transform = "scale(1)";
  }, 100);

  setTimeout(() => {
    splashText.style.opacity = 0;
    splashText.style.transform = "scale(0.5)";
  }, 2600);

  setTimeout(() => {
    splash.style.display = "none";
  }, 3600);

  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  const closeBtn = document.getElementById("close-menu");

  menuToggle?.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  closeBtn?.addEventListener("click", () => {
    menu.classList.remove("open");
  });

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
  const columns = Object.keys(labelMap);
  const menuContainer = document.getElementById("menu");
  const activeCols = new Set(columns);

  columns.forEach((key) => {
    const button = document.createElement("button");
    button.textContent = labelMap[key];
    button.classList.add("toggle-btn");
    button.dataset.column = key;

    button.addEventListener("click", () => {
      button.classList.toggle("inactive");
      const colClass = col-${key};
      const cells = document.querySelectorAll(.${colClass});

      if (button.classList.contains("inactive")) {
        activeCols.delete(key);
        cells.forEach(cell => cell.classList.add("col-hidden"));
      } else {
        activeCols.add(key);
        cells.forEach(cell => cell.classList.remove("col-hidden"));
      }
    });

    menuContainer.appendChild(button);
  });
});
