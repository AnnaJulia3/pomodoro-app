// --- Elementos de controle de abertura
var openMenuSession = -1;
var openMenuContainer = -1;
var listButtonMenuSession = [
  document.getElementById("buttonPerfil"),
  document.getElementById("buttonMusic"),
  document.getElementById("setClock"),
  document.getElementById("buttonGameDown"),
];
var buttonGear = document.getElementById("buttonGear");

// --- Elementos de controle de fechamento
var listCloseButtonMenu = document.getElementsByClassName("button-close");
// toda vez que inicia uma sessão fecha qualquer menu -> timer_execution.js usar closeMenu()

// --- Listas de elementos a serem atualizados
var listMenuContainer = document.getElementsByTagName("menu");
var listDivMenu = document.getElementsByClassName("dropdown-menu");

// --- Funções fechamento


function closeMenu() {
  // if (openMenuSession == 4) closeTimerGeneralMenu();
  // else {
    listDivMenu.item(openMenuSession).style.display = "none";
    listMenuContainer.item(openMenuContainer).style.display = "none";
    openMenuSession = -1;
    openMenuContainer = -1;
  // }
}

[0, 1].forEach((i) => {
  listCloseButtonMenu.item(i).addEventListener("click", closeMenu);
});
// --- Função aberturas e demais controles
function openMenuUngrouped(i) {
  openMenuSession = i;
  openMenuContainer = 0;
  if (i > 0) {
    openMenuContainer = 1;
    listMenuContainer.item(1).style.display = "flex";
  }
  listDivMenu.item(openMenuSession).style.display = "flex";
}

// Os botões aparecem respectivos as sessões correspondentes
[0, 1, 2, 3].forEach((i) => {
  listButtonMenuSession[i].addEventListener("click", () => {
    let previous = openMenuSession;
    // Qualquer um aberto -> fecha
    if (openMenuSession > -1) closeMenu();
    // Tudo fechado ( == -1 ) -> abre
    // e ele não estava aberto  ( != i) -> abre
    if (previous != i) openMenuUngrouped(i);
  });
});

