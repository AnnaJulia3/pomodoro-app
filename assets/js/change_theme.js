var toggleTheme = document.getElementById("toggleTheme");


toggleTheme.addEventListener("change", () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
});