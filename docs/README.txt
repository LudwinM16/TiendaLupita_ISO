Instalación rápida:

1. Copia la carpeta 'gestion_tienda_final' a C:\xampp\htdocs\
2. Importa database/productos_db.sql en phpMyAdmin (crear la base y tablas).
3. Inicia Apache en XAMPP.
4. Abre en navegador: http://localhost/gestion_tienda_final/php/php_init_admin.php
   Esto creará el usuario admin (admin / 1234) con password_hash() si no existe.
5. Visita: http://localhost/gestion_tienda_final/ para ver el login.
6. Después de iniciar sesión, ir a app.html para usar la app.

Notas de seguridad:
- Cambia la contraseña del admin al crear un usuario real.
- En producción no uses account with empty MySQL password.
