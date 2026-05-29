<?php
include 'config.php';

if(!isset($_SESSION['user'])){
  echo json_encode(['error'=>'No autorizado']);
  exit;
}

$action = $_GET['action'] ?? '';

if($action === 'mas_vendidos'){
  // Consulta agrupada para obtener los productos más vendidos
  $query = "SELECT p.nombre, SUM(dv.cantidad) as total_unidades, SUM(dv.subtotal) as ingresos_totales 
            FROM detalle_ventas dv 
            JOIN productos p ON dv.producto_id = p.id 
            GROUP BY p.id 
            ORDER BY total_unidades DESC";
            
  $res = $conn->query($query);
  $rows = [];
  if($res) {
    while($r = $res->fetch_assoc()) {
      $rows[] = $r;
    }
  }
  echo json_encode($rows);
  exit;
}

echo json_encode(['error'=>'Acción no definida']);
?>