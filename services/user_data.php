<?php

function extract_data_users()
{
    $json = "[]";
    $filename = "../../to_simple_test/bd.json";
    if (is_file($filename)) {
        $handle = fopen($filename, 'r');
        $content = fread($handle, filesize($filename));
        $json = json_decode($content);
        fclose($handle);
    }
    else{
        echo "Não foi possível acessar o banco de dados", nl2br("\n\n");
    }

    return $json;
}

function verify_registration(array $data,string $email,string $celular="0")
{
    $result_find_user = false;
    foreach ($data as $registro) :
        // echo "user:";
        // echo nl2br("\n");
        // foreach ($registro as $algo) :
        //     echo $algo;
        //     echo nl2br("\n");
        // endforeach;
        // echo nl2br("\n");

        if ($email == $registro->{'email'} || $celular == $registro->{'celular'}) {
            $result_find_user = true;
        }
    endforeach;

    return $result_find_user;
}
