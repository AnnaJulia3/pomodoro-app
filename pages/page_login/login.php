<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastro</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" href="../../assets/css/styles.css" />
  <link rel="stylesheet" href="../../assets/css/menu.css" />
  <link rel="stylesheet" href="../../assets/css/forms.css" />
  <style>
    body {
      display: flex;
      flex-direction: column;
    }
  </style>
</head>

<body>
  <?php
  include "../../services/user_data.php";
  $email = $_POST['email'];
  $data = extract_data_users();
  $result_find_user = verify_registration($data, $email);

  // --- Fim login => envia outra pagina ---
  $host  = $_SERVER['HTTP_HOST'];
  $uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
  if ($result_find_user) {
    header("Location: http://$host$uri/../../index.html"); //redireciona
    exit(); // assegurar que nada mais depois do redirecionamento será executado
  }

  echo "Usuário com email " . $email . " não encontrado!", nl2br("\n\n");
  echo "Faça seu cadastro!", nl2br("\n\n");
  ?>
  <a href="../register/index.html">Cadastre aqui</a>
  <a href="../../index.html">Continuar sem cadastro</a>

</body>

</html>