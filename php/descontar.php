<?php
include 'config.php';

if(!isset($_SESSION['user'])){
  echo json_encode(['status'=>'error','error'=>'No autorizado']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if(!is_array($data) || empty($data)){
  echo json_encode(['status'=>'error','error'=>'Payload inválido']); exit;
}

$conn->begin_transaction();
try {
  // 1. Calcular el total de la venta
  $totalVenta = 0;
  foreach($data as $item){
      $precio = floatval($item['precio'] ?? 0);
      $descontar = intval($item['descontar'] ?? 0);
      $totalVenta += ($precio * $descontar);
  }

  // 2. Insertar en la tabla ventas
  $stmtVenta = $conn->prepare('INSERT INTO ventas (total) VALUES (?)');
  $stmtVenta->bind_param('d', $totalVenta);
  $stmtVenta->execute();
  $venta_id = $stmtVenta->insert_id;

  // 3. Procesar cada producto: Descontar stock e insertar en detalle_ventas
  foreach($data as $item){
    $id = intval($item['id'] ?? 0);
    $descontar = intval($item['descontar'] ?? 0);
    $precio = floatval($item['precio'] ?? 0);
    $subtotal = $precio * $descontar;
    
    if($id <= 0 || $descontar <= 0) continue;

    // Bloquear fila y comprobar stock para evitar ventas en negativo
    $stmt = $conn->prepare('SELECT cantidad FROM productos WHERE id = ? FOR UPDATE');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $res = $stmt->get_result();
    
    if($res->num_rows === 0){
      throw new Exception("Producto no existe: $id");
    }
    
    $row = $res->fetch_assoc();
    $actual = intval($row['cantidad']);
    
    if($actual < $descontar){
      throw new Exception("Cantidad insuficiente para producto id $id");
    }

    // Descontar inventario
    $stmt2 = $conn->prepare('UPDATE productos SET cantidad = cantidad - ? WHERE id = ?');
    $stmt2->bind_param('ii', $descontar, $id);
    $stmt2->execute();

    // Insertar el registro en detalle_ventas
    $stmt3 = $conn->prepare('INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)');
    $stmt3->bind_param('iiidd', $venta_id, $id, $descontar, $precio, $subtotal);
    $stmt3->execute();
  }

  // Confirmar la transacción
  $conn->commit();
  echo json_encode(['status'=>'ok','message'=>'Venta procesada e inventario actualizado']);
  
} catch(Exception $e){
  // Si hay error (ej. stock insuficiente), revertir todos los cambios
  $conn->rollback();
  echo json_encode(['status'=>'error','error'=>$e->getMessage()]);
}
?>