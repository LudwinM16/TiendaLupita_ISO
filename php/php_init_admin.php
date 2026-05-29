<?php
// Ejecuta este script una vez desde el navegador para crear admin seguro si no existe.
// Visita: http://localhost/gestion_tienda_final/php/php_init_admin.php
include 'config.php';
$exists = $conn->prepare('SELECT id FROM usuarios WHERE username = ?');
$adminUser = 'admin';
$exists->bind_param('s', $adminUser);
$exists->execute();
$res = $exists->get_result();
if($res->num_rows > 0){
  echo 'Admin ya existe.';
  exit;
}
$pass = '1234';
$hash = password_hash($pass, PASSWORD_DEFAULT);
$ins = $conn->prepare('INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)');
$rol = 'admin';
$ins->bind_param('sss', $adminUser, $hash, $rol);
$ins->execute();
echo 'Admin creado: admin / 1234';
?>