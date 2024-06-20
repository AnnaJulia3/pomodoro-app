var toggleTheme = document.getElementById("toggleTheme");
var buttonPerfil = document.getElementById("buttonPerfil");

toggleTheme.addEventListener("change", () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
});

function openMenu(idname) {  
    let menu = document.getElementById(idname);
    menu.style.display = "flex";
}

function closeMenu(idname) {
    let menu = document.getElementById(idname);
    menu.style.display = "none";
}