<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="../../assets/css/styles.css" />
    <link rel="stylesheet" href="../../assets/css/menu.css" />
    <link rel="stylesheet" href="../../assets/css/forms.css" />
</head>

<body>
    <h3>Cadastrando ... </h3>
</body>
<?php
include "../../services/user_data.php";

$name = $_POST['name'] ?? "name";
$email = $_POST['email'] ?? "email";
$celular = $_POST['celular'] ?? '000';

// echo $name . ' ' . $email . ' ' . $celular;
// echo nl2br("\n\n");

$filename = "../../to_simple_test/bd.json";
$handle = fopen($filename, 'r+');
$length_read = filesize($filename) - 1; //não contar o ] para rescrevermos ali em cima
$content = fread($handle, $length_read);
$content = $content . ']';

// echo $content, nl2br("\n\n");

$json = json_decode($content); // Decodifica o formato JSON e retorna um Objeto
// --- Atribuição de id---
$new_id = strval(count($json) + 1);
if (strlen($new_id) != 2) {
    $new_id = '0' . $new_id;
}

// foreach ($json as $registro) :
//     var_dump($registro);
//     echo nl2br("\n\n");
// endforeach;

$result_find_user = verify_registration($json, $email, $celular);

// --- Cadastro ---
if (!$result_find_user) {
    $new_user = (object) array(
        "id" => $new_id,
        "username" => $name,
        "email" => $email,
        'celular' => $celular,
        "password" => "321"
    );
    $data_json = json_encode($new_user); //Transforma o array em JSON
    $data_json = ',' . $data_json . ']';
    $writing = fwrite($handle, $data_json);
} else {
    echo "USUÁRIO JÁ CADASTRADO!", nl2br("\n\n");
}
fclose($handle);
echo "Vamos te redirecionar para o login", nl2br("\n");

// // --- Fim cadastro => envia outra pagina ---
$host  = $_SERVER['HTTP_HOST'];
$uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
header("Refresh: 5; url=http://$host$uri/../page_login/index.html"); //redireciona
exit(); // assegurar que nada mais depois do redirecionamento será executado
?>

</html>