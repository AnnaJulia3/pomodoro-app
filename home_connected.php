<?php
include "./services/user_data.php";
// session_start inicia a sessão
session_start();

if (isset($_POST['email'])) {
  // a variável email dos dados digitados na página anterior
  $email = $_POST['email'];
  // conectar com o bando de dados.
  // TODO: Criar banco de dados no servidor
  $data = extract_data_users("./to_simple_test/bd.json");
  $data_user = find_user($data, $email);
  // echo $_SERVER['HTTP_USER_AGENT'];

  // --- Fim login => envia outra pagina ---
  $host  = $_SERVER['HTTP_HOST'];
  $uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
  if (count((array) $data_user) < 1) {
    unset ($_SESSION['user_id']);
    unset ($_SESSION['user_email']);
    header("Location: http://$host$uri/./pages/page_login/login.php"); //redireciona
    exit(); // assegurar que nada mais depois do redirecionamento será executado
  }
  $_SESSION['user_id'] = $data_user->id;
  $_SESSION['user_email'] = $data_user->email;
} else {
  if ((!isset($_SESSION['user_id']) == true) and (!isset($_SESSION['user_email']) == true)) {
    header('location:index.html');
  }
  
  $logado = $_SESSION['user_id'];
  $email = $_SESSION['user_email'];
  $data = extract_data_users("./to_simple_test/bd.json");
  $data_user = find_user($data, $email);
}
/* esse bloco de código em php verifica se existe a sessão, pois o usuário pode
 simplesmente não fazer o login e digitar na barra de endereço do seu navegador
o caminho para a página principal do site (sistema), burlando assim a obrigação de
fazer um login, com isso se ele não estiver feito o login não será criado a session, então ao verificar que a session não existe a página redireciona o mesmo
 para a index.php.*/

$json = json_encode($data_user);
echo "<script>var dataUser = $json;</script>";
?>

<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Timer Pomodoro</title>
  <meta name="description" content="Precisando focar do seu jeitinho? Crie um pomodoro personalizado e versátil">

  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="stylesheet" href="assets/css/progress_bar.css">
  <link rel="stylesheet" href="assets/css/stars.css">
  <link rel="stylesheet" href="assets/css/menu.css">
  <link rel="stylesheet" href="./assets/css/home_connected.css">
</head>

<body>
  <header class="header_nav">
    <input type="checkbox" id="toggleTheme" title="toggleTheme">
    <button type="button" class="allButtons" id="buttonPerfil" onclick="openMenu(0)">
      <img src="./assets/images/button-person-circle.svg" alt="perfil" id="perfil">
    </button>
  </header>

  <div id="conteiner_clock">
    <button type="button" class="topGame" id="buttonGameTop">
      <img src="./assets/images/dog-and-cup-dark.png" alt="cup and dog">
    </button>
    <div class="progress_clock_space" theme="pomodoro" id="progress_clock_space">
      <div class="cub" id="cub2"></div>
      <div class="cub" id="cub1"></div>
      <div class="cub" id="cub4"></div>
      <div class="conteiners_cub" id="conteiner_cub5">
        <div class="cub" id="cub5"></div>
      </div>
      <div class="conteiners_cub" id="conteiner_cub3">
        <div class="cub" id="cub3"></div>
      </div>
      <div class="clock_space" id="clock_space">
        <h1 id="timerText">25:00</h1>
        <img src="./assets/images/star.svg" alt="star" class="micro_star" id="micro_star_above1">

        <img src="./assets/images/star.svg" alt="star" class="micro_star" id="micro_star_above2">

        <img src="./assets/images/star.svg" alt="star" class="micro_star" id="micro_star_above3">

        <img src="./assets/images/star.svg" alt="star" class="small_star" id="small_star_above1">

        <img src="./assets/images/star.svg" alt="star" class="middle_star" id="middle_star_above1">

        <img src="./assets/images/star.svg" alt="star" class="small_star" id="small_star_above2">

        <img src="./assets/images/star.svg" alt="star" class="big_star" id="big_star_above">

        <img src="./assets/images/star.svg" alt="star" class="middle_star" id="middle_star_above2">

        <!-- below -->
        <img src="./assets/images/star.svg" alt="star" class="small_star" id="small_star_below">

        <img src="./assets/images/star.svg" alt="star" class="middle_star" id="middle_star_below">


        <img src="./assets/images/star.svg" alt="star" class="micro_star" id="micro_star_below1">

        <img src="./assets/images/star.svg" alt="star" class="big_star" id="big_star_below">

        <img src="./assets/images/star.svg" alt="star" class="micro_star" id="micro_star_below2">

        <img src="./assets/images/star.svg" alt="star" class="micro_star" id="micro_star_below3">

        <img src="./assets/images/star.svg" alt="star" class="micro_star" id="micro_star_below4">

        <img src="./assets/images/star.svg" alt="star" class="micro_star" id="micro_star_below5">



      </div>

    </div>
    <div class="count_stars">
      <p class="break_text">0</p>
      <img src="./assets/images/star.svg" alt="star" id="star_to_count_star">
    </div>

  </div>



  <div class="menu_clock">
    <button type="button" class="allButtons" id="buttonMusic" onclick="openMenu(1)">
      <img src="./assets/images/button-music.svg" alt="buttonMusic">
    </button>

    <input type="checkbox" name="" class="allButtons" id="controlPlayTimer" title="controlPlayTimer">

    <button type="button" class="allButtons" id="setClock" title="Temporizador" onclick="openMenu(2)">
    </button>

    <button type="button" class="allButtons" id="buttonGear">
      <img src="./assets/images/button-gear.svg" alt="buttonGame">
    </button>

    <button type="button" class="allButtons" id="buttonGameDown" onclick="openMenu(3)">
      <img src="./assets/images/button-paw.svg" alt="buttonGame">
    </button>
  </div>

  <footer>
    <p>
      @ 2024. <a href="https://github.com/AnnaJulia3/pomodoro-app" target="_blank" rel='noopener noreferrer'>
        Projeto de estudos pessoais
      </a>. Em desenvolvimento por <a href="https://github.com/AnnaJulia3" target="_blank" rel='noopener noreferrer'>AJ</a>
    </p>
  </footer>


  <menu class="dropdown_menu" id="perfilMenu">
    <button title="Close" id="close" class="button-close" onclick="closeMenu('perfilMenu')">x</button>

    <div id="menu_connected">
      <button type="button" id="perfil_connected" class="allButtons">
        <img src="./assets/images/button-person-circle.svg" alt="perfil">
      </button>
      <br>
      <h4 id="username">Nome do usuário</h4>
      <p id="id_user">id do usuário</p>
      <button type="button" class="button-menu" id="button_sync">Sincronização ativada</button>
      <label for="device">Dispositivo conectado:</label>
      <select name="device" id="device_select" title="Dispositivo conectado">
        <option value="desktop">Desktop</option>
      </select>
      <button type="button" class="button-menu" id="button_account_setup">Configuração de Conta</button>
      <button type="button" class="button-menu">Desconectar</button>

      <p>Email conectado:</p>
      <p id="email_user">email do usuário</p>
    
    </div>
  </menu>

  <!-- Menu volume -->
  <menu class="dropdown_menu" id="musicMenu">
    <button title="Close" id="close" class="button-close" onclick="closeMenu('musicMenu')">x</button>

    <h4>Volume</h4>

    <label for="audioVolumeGlobal">
      Global:
    </label>
    <input type="range" id="audioVolumeGlobal" name="volumeGlobal" min="0" max="100" step="1">

    <label for="audioVolumeAlarm">
      Alarme (fim de sessão):
    </label>
    <input type="range" id="audioVolumeAlarm" name="volumeAlarm" min="0" max="100" step="1">

    <label for="audioVolumeBackground">
      Música de fundo:
    </label>
    <input type="range" id="audioVolumeBackground" name="volumeBackground" min="0" max="100" step="1">

    <label for="audioVolumeInteraction">
      Interações:
    </label>
    <input type="range" id="audioVolumeInteraction" name="volumeInteraction" min="0" max="100" step="1">
    <br>
    <h4>Sons</h4>
    <label for="changeMusicBackground"> Música de fundo: </label>
    <select name="changeMusicBackground" id="changeMusicBackground">
      <option value='fire'>Brasas | Fogo</option>
      <option value='calm'>Suave Acústico</option>
      <option value='clockTick'>Tick de relógio</option>
      <option value='lofi'>Lofi</option>
      <option value='runningWater'>Água escorrendo</option>
      <option value='eletronic'>Eletrônica</option>
    </select>
  </menu>
  <!-- Menu tipo de relógio -->
  <menu class="dropdown_menu" id="setClockMenu">
    <button title="Close" id="close" class="button-close" onclick="closeMenu('setClockMenu')">x</button>

    <label for="type_timer"> Tipo de timer: </label>
    <select name="Tipo de time:" id="type_timer" onchange="changeTypeTimer()">
      <option value=0>Pomodoro clássico</option>
      <option value=1>Pomodoro crescente</option>
      <option value=2>Cronômetro</option>
      <option value=3>Temporizador</option>
    </select>
  </menu>

  <menu class="dropdown_menu" id="gameMenu">
    <button title="Close" id="close" class="button-close" onclick="closeMenu('gameMenu')">x</button>
    <p>Em breve mais funções</p>
    <button title="Em breve mais funções" class="button-menu">Jogo</button>
  </menu>

  <script src="./assets/js/animation_progress_bar.js"></script>
  <script src="./assets/js/set_music.js"></script>
  <script src="./assets/js/timer_execution.js"></script>
  <script src="./assets/js/change_theme_and_displays.js"></script>
  <!-- <script src="./assets/js/var_to_test.js"></script> -->
  <script src="./assets/js/home_connected.js"></script>
</body>

</html>