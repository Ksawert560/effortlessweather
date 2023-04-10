const btn = document.querySelector(".btn-theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const icon = document.querySelector('.btn-theme #btnIcon');

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
  icon.className = "fa-solid fa-moon";
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
  icon.className = "fa-solid fa-sun";
}

btn.addEventListener("click", function () {
  if(icon.className=="fa-solid fa-moon")
        icon.className="fa-solid fa-sun";
  else
        icon.className="fa-solid fa-moon"
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});

