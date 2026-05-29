<?php
include 'config.php';

if(!isset($_SESSION['user'])){
  echo json_encode(['error'=>'No autorizado']);
  exit;
}

$action = $_GET['action'] ?? '';

if($action === 'listar'){
  $res = $conn->query('SELECT * FROM productos ORDER BY id DESC');
  $rows = [];
  while($r = $res->fetch_assoc()) $rows[] = $r;
  echo json_encode($rows);
  exit;
}

if($action === 'agregar'){
  $nombre = $_POST['nombre'] ?? '';
  $precio = floatval($_POST['precio'] ?? 0);
  $cantidad = intval($_POST['cantidad'] ?? 0);
  if($nombre === '' ) { echo json_encode(['error'=>'Nombre inválido']); exit; }
  $stmt = $conn->prepare('INSERT INTO productos (nombre, precio, cantidad) VALUES (?, ?, ?)');
  $stmt->bind_param('sdi', $nombre, $precio, $cantidad);
  $stmt->execute();
  echo json_encode(['status'=>'ok']);
  exit;
}

if($action === 'editar'){
  $id = intval($_POST['id'] ?? 0);
  $nombre = $_POST['nombre'] ?? '';
  $precio = floatval($_POST['precio'] ?? 0);
  $cantidad = intval($_POST['cantidad'] ?? 0);
  $stmt = $conn->prepare('UPDATE productos SET nombre = ?, precio = ?, cantidad = ? WHERE id = ?');
  $stmt->bind_param('sdii', $nombre, $precio, $cantidad, $id);
  $stmt->execute();
  echo json_encode(['status'=>'ok']);
  exit;
}

if($action === 'eliminar'){
  $id = intval($_POST['id'] ?? 0);
  $stmt = $conn->prepare('DELETE FROM productos WHERE id = ?');
  $stmt->bind_param('i', $id);
  $stmt->execute();
  echo json_encode(['status'=>'ok']);
  exit;
}

echo json_encode(['error'=>'Acción no definida']);
?>