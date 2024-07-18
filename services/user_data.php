<?php

function extract_data_users(string $filename)
{
  $json = "[]";
  if (is_file($filename)) {
    $handle = fopen($filename, 'r');
    $content = fread($handle, filesize($filename));
    $json = json_decode($content);
    fclose($handle);
  } else {
    echo "Não foi possível acessar o banco de dados", nl2br("\n\n");
  }

  return $json;
}

function verify_registration(array $data, string $email, string $celular = "0")
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


function find_user(array $data, string $email, string $celular = "0")
{
  foreach ($data as $registro) :
    if ($email == $registro->{'email'} || $celular == $registro->{'celular'}) {
      return $registro;
    }
  endforeach;
  return array();
}

//TODO: Ideia em andamento
class User_tomira
{
  private $id;
  private $name;
  private $email;
  private $celular;
  private $password;
  private $session_active;
  private $devices;

  public function __construct(string $id, string $name, string $email, string $celular)
  {
    $this->id = $id;
    $this->name = $name;
    $this->email = $email;
    $this->celular = $celular;
    $this->session_active = array();
    $this->devices = array();
  }

  // --- Manipula Sessão ---
  private function generate_password()
  {
    // TODO: Implementar gerador de senha
    // $this->password = password_hash( "0123", PASSWORD_DEFAULT);
    $this->password = "0123";
  }
  public function new_login()
  {
    $this->generate_password();
    // TODO: enviar para o email a senha
    // $this->email e $this->password
  }
  public function password_verify(string $password)
  {
    if ($this->password == $password) {
      $this->generate_password();
      $useragent  = $_SERVER['HTTP_USER_AGENT'];
      $this->session_active = array($useragent);
      if (!in_array($useragent, $this->devices)) {
        array_push($this->devices, $useragent);
      }
      return true;
    }
    return false;
  }

  public function logout()
  {
    $this->session_active = array();
  }

  // --- Update ---
  public function update_email(string $new_email)
  {
    $this->email = $new_email;
  }

  public function update_celular(string $new_celular)
  {
    $this->celular = $new_celular;
  }

  public function update_name(string $new_name)
  {
    $this->name = $new_name;
  }
  // --- Get ---
  public function get_id()
  {
    return $this->id;
  }

  public function get_name()
  {
    return $this->name;
  }

  public function get_email()
  {
    return $this->email;
  }

  public function get_celular()
  {
    return $this->celular;
  }
}
