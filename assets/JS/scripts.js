const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement

function changeTheme(){
    const currentTheme = rootHtml.getAtrribute("data-theme");

    if(currentTheme == "dark") rootHtml.setAttribute("data-theme", "light")
    else rootHtml.setAttribute("data-theme", "dark")
}

// toggleTheme.addEventListener("click", changeTheme);