var toggleTheme = document.getElementById("toggleTheme");
var buttonPerfil = document.getElementById("buttonPerfil");
var listMenus = document.getElementsByClassName("dropdown_menu");

toggleTheme.addEventListener("change", () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});

function openMenu(itemIndex) {
  for (var indexNow = 0; indexNow < listMenus.length; indexNow++) {
    menuNow = listMenus.item(indexNow);
    if (indexNow == itemIndex && menuNow.style.display != "flex") {
      menuNow.style.display = "flex";
    } else menuNow.style.display = "none";
  }
}

function closeMenu(idName) {
  let menu = document.getElementById(idName);
  menu.style.display = "none";
}
