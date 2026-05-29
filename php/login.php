<?php
include 'config.php';

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if($username === '' || $password === ''){
  echo json_encode(['status'=>'error','message'=>'Faltan credenciales']);
  exit;
}

$stmt = $conn->prepare("SELECT id, username, rol, password FROM usuarios WHERE username = ?");
$stmt->bind_param('s', $username);
$stmt->execute();
$res = $stmt->get_result();

if($res->num_rows > 0){
  $user = $res->fetch_assoc();
  if (password_verify($password, $user['password'])) {
    unset($user['password']);
    $_SESSION['user'] = $user;
    echo json_encode(['status'=>'ok','user'=>$user]);
    exit;
  }
}

echo json_encode(['status'=>'error','message'=>'Usuario o contraseña incorrectos']);
?>