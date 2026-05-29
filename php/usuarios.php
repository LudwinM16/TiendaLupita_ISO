<?php
include 'config.php';

if(!isset($_SESSION['user']) || $_SESSION['user']['rol'] !== 'admin'){
  echo json_encode(['error'=>'No autorizado']);
  exit;
}

$action = $_GET['action'] ?? '';

if($action === 'listar'){
  $res = $conn->query('SELECT id, username, rol FROM usuarios');
  $rows = [];
  while($r = $res->fetch_assoc()) $rows[] = $r;
  echo json_encode($rows);
  exit;
}

if($action === 'agregar'){
  $username = $_POST['username'] ?? '';
  $password = $_POST['password'] ?? '';
  $rol = $_POST['rol'] ?? 'empleado';
  if($username === '' || $password === '') { echo json_encode(['error'=>'Datos inválidos']); exit; }
  $hash = password_hash($password, PASSWORD_DEFAULT);
  $stmt = $conn->prepare('INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)');
  $stmt->bind_param('sss', $username, $hash, $rol);
  $stmt->execute();
  echo json_encode(['status'=>'ok']);
  exit;
}

if($action === 'eliminar'){
  $id = intval($_POST['id'] ?? 0);
  $stmt = $conn->prepare('DELETE FROM usuarios WHERE id = ? AND rol != "admin"');
  $stmt->bind_param('i', $id);
  $stmt->execute();
  echo json_encode(['status'=>'ok']);
  exit;
}

echo json_encode(['error'=>'Acción no definida']);
?>