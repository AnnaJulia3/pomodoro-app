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
    unset($_SESSION['user_id']);
    unset($_SESSION['user_email']);
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
  <title>Pomodoro Timer</title>
  <meta name="description"
    content="Precisando focar do seu jeitinho? Crie um pomodoro personalizado e versátil. Atinja suas metas com mais tranquilidade. Opções de relógio e cronômetro ajustável para sessões de foco e pausas. Use para estudar, trabalhar e realizar as tarefas que desejar!">

  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./assets/css/home_connected.css">
</head>

<body>
  <header>
    <input type="checkbox" id="toggleTheme" title="Modo claro/escuro">
    <button type="button" class="circula-buttons" id="buttonPerfil" title="Perfil">
      <img src="./assets/images/button-person-circle.svg" alt="Perfil" id="perfil">
    </button>
  </header>

  <div id="containerClock">
    <button type="button" id="buttonGameTop" title="Mensagem de motivação">
      <img src="./assets/images/dog-and-cup-dark.png" alt="Cão e café">
    </button>
    <div class="progress-clock-space" theme="pomodoro" id="progressClockSpace">
      <div class="cub" id="cub2"></div>
      <div class="cub" id="cub1"></div>
      <div class="cub" id="cub4"></div>
      <div class="containers-cub" id="containerCub5">
        <div class="cub" id="cub5"></div>
      </div>
      <div class="containers-cub" id="containerCub3">
        <div class="cub" id="cub3"></div>
      </div>
      <div class="clock-space" id="clockSpace">
        <h1 id="timerText">25:00</h1>
        <img src="./assets/images/star.svg" alt="Estrela" class="micro-star" id="microStarAbove1">
        <img src="./assets/images/star.svg" alt="Estrela" class="micro-star" id="microStarAbove2">
        <img src="./assets/images/star.svg" alt="Estrela" class="micro-star" id="microStarAbove3">
        <img src="./assets/images/star.svg" alt="Estrela" class="small-star" id="smallStarAbove1">
        <img src="./assets/images/star.svg" alt="Estrela" class="middle-star" id="middleStarAbove1">
        <img src="./assets/images/star.svg" alt="Estrela" class="small-star" id="smallStarAbove2">
        <img src="./assets/images/star.svg" alt="Estrela" class="big-star" id="bigStarAbove">
        <img src="./assets/images/star.svg" alt="Estrela" class="middle-star" id="middleStarAbove2">
        <!-- below -->
        <img src="./assets/images/star.svg" alt="Estrela" class="small-star" id="smallStarBelow">
        <img src="./assets/images/star.svg" alt="Estrela" class="middle-star" id="middleStarBelow">
        <img src="./assets/images/star.svg" alt="Estrela" class="micro-star" id="microStarBelow1">
        <img src="./assets/images/star.svg" alt="Estrela" class="big-star" id="bigStarBelow">
        <img src="./assets/images/star.svg" alt="Estrela" class="micro-star" id="microStarBelow2">
        <img src="./assets/images/star.svg" alt="Estrela" class="micro-star" id="microStarBelow3">
        <img src="./assets/images/star.svg" alt="Estrela" class="micro-star" id="microStarBelow4">
        <img src="./assets/images/star.svg" alt="Estrela" class="micro-star" id="microStarBelow5">
      </div>
    </div>
    <div class="count-stars">
      <p class="break-text">0</p>
      <img src="./assets/images/star.svg" alt="Estrela" id="starToCountStars">
    </div>
  </div>

  <div class="container-timer-buttons">
    <button type="button" class="circula-buttons" id="buttonMusic" title="Configurar sons">
      <img src="./assets/images/button-music.svg" alt="Sons">
    </button>
    <input type="checkbox" name="" class="circula-buttons" id="controlPlayTimer" title="Iniciar sessão">
    <button type="button" class="circula-buttons" id="setClock" title="Configurar temporizador">
    </button>
    <button type="button" class="circula-buttons" id="buttonGear" title="Configurações gerais">
      <img src="./assets/images/button-gear.svg" alt="buttonGame">
    </button>
    <button type="button" class="circula-buttons" id="buttonGameDown" title="Mensagem de motivação">
      <img src="./assets/images/button-paw.svg" alt="buttonGame">
    </button>
  </div>

  <footer>
    <p>
      @ 2024.
      <a href="https://github.com/AnnaJulia3/pomodoro-app" target="_blank" rel='noopener noreferrer'>
        Projeto de estudos pessoais
      </a>. Em desenvolvimento por
      <a href="https://github.com/AnnaJulia3" target="_blank" rel='noopener noreferrer'>
        AJ
      </a>
    </p>
  </footer>

  <menu class="dropdown-menu" id="perfilMenu">
    <button type="button" title="Fechar" id="closePerfilMenu" class="button-close">x</button>

    <div id="menu_connected">
      <button type="button" id="perfil_connected" class="circula-buttons">
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

  <menu class="menu-base" id="groupSessionMenu" group="no">
    <div class="menu-inner">
      <button type="button" title="Fechar" id="close" class="button-close">x</button>
      <!-- Menu volume -->
      <div class="dropdown-menu" id="musicMenu">
        <audio loop preload="auto"
          src="./assets/music/background/0_default_sound-of-a-fantastic-warm-fireplace-141728.mp3" id="fireAudio">
          Seu navegador não possui suporte ao elemento audio
        </audio>
        <!-- // --- inicio -->
        <audio loop preload="none" src="./assets/music/background/calm_game_music_1-49209.mp3" id="calmAudio"></audio>
        <audio loop preload="none" src="./assets/music/background/clock-tick-76039.mp3" id="clockTickAudio"></audio>
        <audio loop preload="none" src="./assets/music/background/lo-fi-chill-medium-version-159456.mp3"
          id="loFiChillAudio"></audio>
        <audio loop preload="none" src="./assets/music/background/the-old-water-mill-meditation-8005.mp3"
          id="runningWaterAudio"></audio>
        <audio loop preload="none" src="./assets/music/background/titanium-170190.mp3" id="electronicAudio"></audio>
        <!-- // -- fim playlist -->
        <audio preload="auto" src="./assets/music/init_pomodoro/default-decide.mp3" id="audioStartPomodoro"></audio>
        <audio preload="auto" src="./assets/music/lose_pomodoro/game-over-arcade-6435.mp3"
          id="audioLosePomodoro"></audio>
        <audio loop preload="auto" src="./assets/music/success_pomodoro/success-1-6297.mp3"
          id="audioSuccessPomodoro"></audio>
        <audio loop preload="auto" src="./assets/music/end_break/alert-sound-loop-189741.mp3"
          id="audioEndBreak"></audio>
        <h4>Volume</h4>
        <label for="audioVolumeGlobal">
          Geral:
        </label>
        <input type="range" id="audioVolumeGlobal" name="volumeGlobal" min="0" max="100" step="1" title="Volume geral">
        <label for="audioVolumeAlarm">
          Alarmes (fim de sessão):
        </label>
        <input type="range" id="audioVolumeAlarm" name="volumeAlarm" min="0" max="100" step="1"
          title="Volume de alarmes">
        <label for="audioVolumeBackground">
          Música de fundo:
        </label>
        <input type="range" id="audioVolumeBackground" name="volumeBackground" min="0" max="100" step="1"
          title="Volume da música de fundo">
        <label for="audioVolumeInteraction">
          Interações:
        </label>
        <input type="range" id="audioVolumeInteraction" name="volumeInteraction" min="0" max="100" step="1"
          title="Volume das interações">
        <h4>Sons</h4>
        <span class="justify-div">
          <label for="changeMusicBackground"> Música de fundo: </label>
          <!-- TODO: Tocar música para usuário ouvir
          <button type="button"> Teste</button>
           -->
        </span>
        <select title="Mudar som de fundo de foco" name="changeMusicBackground" id="changeMusicBackground"
          title="Música de fundo">
          <option value='fire'>Brasas | Fogo</option>
          <option value='calm'>Suave Acústico</option>
          <option value='clockTick'>Tick de relógio</option>
          <option value='loFiChill'>Lo-fi Tranquila</option>
          <option value='runningWater'>Água escorrendo</option>
          <option value='electronic'>Eletrônica</option>
        </select>
        <!-- TODO: Alarme pausa 
        <span class="justify-div">
          <label for="changeMusicBreak">Fim de pausa: </label>
          <button type="button"> Teste</button></span>
        <select title="Mudar alarme de pausa" name="change_music_break" id="changeMusicBreak">
          <option value='fire'>Brasas | Fogo</option>
        </select> 
        -->
        <!-- TODO: Alarme foco
        <span class="justify-div">
          <label for="changeMusicFocus">Fim de foco: </label>
          <button type="button"> Teste</button></span>
        <select title="Mudar alarme de pausa" name="change_music_focus" id="changeMusicFocus">
          <option value='fire'>Brasas | Fogo</option>
        </select>
         -->
      </div>
      <div class="dropdown-menu" id="setClockMenu">
        <h4>Configurações do relógio</h4>
        <label for="typeTimer"> Tipo de relógio: </label>
        <select name="Tipo de time:" id="typeTimer" onchange="changeTypeTimer()" title="Tipo de relógio">
          <option value=0>Pomodoro clássico</option>
          <option value=1>Pomodoro crescente</option>
          <option value=2>Cronômetro</option>
          <option value=3>Temporizador</option>
        </select>
        <!-- TODO: Auto avanço -->
        <!--
        <span>
          <input title="Auto avanço de inicio de foco" type="checkbox" name="auto_foco" id="autoFoco">
          <label for="autoFoco">Auto avanço de foco</label>
          <button
            title="Não espera você acionar o botão para começar a contar a hora, inicia a contagem automaticamente"
            type="button">?</button>
        </span>
         -->
        <!-- TODO: Auto avanço -->
        <!-- 
        <span>
          <input title="Auto avanço de inicio de pausa" type="checkbox" name="auto_break" id="autoBreak">
          <label for="autoBreak">Auto avanço de pausas</label>
          <button
            title="Não espera você acionar o botão para começar a contar a hora, inicia a contagem automaticamente"
            type="button">?</button>
        </span>
         -->
        <button
          alt="A partir do relógio do seu computador, calcula a sessões para que uma das sessões de foco comesse exatamente na próxima hora"
          title="Calcular sessão" type="button" class="button-menu" id="buttonSynchronizeClock">Sincronização com a
          próxima hora</button>
        <h4> Tempo de sessões</h4>
        <span class="justify-div">
          <label for="focusSessionTimeRange"> Foco: </label>
          <input title="Tamanho de um foco" type="time" name="focus_session_time_range" id="focusSessionTimeRange"
            min="00:00:00" max="12:00:00" value="00:25:00" step="1">
        </span>
        <span class="justify-div">
          <label for="breakSessionTimeRange"> Pausa curta: </label>
          <input title="Tamanho de uma pausa curta" type="time" name="break_session_time_range"
            id="breakSessionTimeRange" min="00:00:00" max="12:00:00" value="00:05:00" step="1">
        </span>
        <!-- TODO: Criar pausa longa -->
        <!-- 
        <span class="justify-div">
          <label for="longBreakSessionTimeRange"> Pausa longa: </label>
          <input title="Tamanho de uma pausa longa" type="time" name="long_break_session_time_range" id="longBreakSessionTimeRange"
            min="00:00:00" max="12:00:00" value="00:15:00" step="1">
        </span>
         -->
        <!-- TODO: Criar alternância de foco até pausa curta -->
        <span class="justify-div">
          <label for="countToShortBreak">Sessões de foco até uma pausa curta:</label>
          <input title="Quantidade de foco" type="text" name="count_foco" id="countToShortBreak" value="1">
        </span>
        <!-- TODO: Criar alternância de foco até pausa longa -->
        <!--          
        <span class="justify-div">
          <label for="countToLongBreak">Pausas curtas até virar uma pausa longa: </label>
          <input title="Quantidade de foco" type="text" name="count_to_break_long" id="countToLongBreak" value="4"
            size="2px">
        </span> -->
        <p>Obs.: Contagem de sessões de foco vão até no máximo 16</p>
        <h4>Notificação do relógio</h4>
        <label for="typeNotification">Tipo de notificação</label>
        <select title="Tipo de notificação" name="type_notification" id="typeNotification">
          <option value="0">Sem notificação por fora</option>
          <!-- TODO: Criar notificações por meio do navegador -->
          <!-- 
          <option value="1">Nova Janela | Popup</option>
          <option value="2">Alerta de notificação</option>
           -->
        </select>
      </div>
      <div class="dropdown-menu" id="gameMenu">
        <h4>Mensagem</h4>
        <p>Aceito como estou agora, e assim estou em processo de buscar mudar para melhor.</p>
        <!-- 
        <button type="button" title="Em breve mais funções" class="button-menu">Iniciar</button> 
        -->
      </div>
    </div>
  </menu>

  <script src="./assets/js/animation_progress_bar.js"></script>
  <script src="./assets/js/set_music.js"></script>
  <script src="./assets/js/timer_execution.js"></script>
  <script src="./assets/js/change_theme.js"></script>
  <script src="./assets/js/menu_interaction.js"></script>
  <script src="./assets/js/input_var_to_timer.js"></script>
  <script src="./assets/js/home_connected.js"></script>
</body>

</html>