const Model = {
  async login(username,password){
    const fd = new FormData();
    fd.append('username', username);
    fd.append('password', password);
    const res = await fetch('php/login.php', { method: 'POST', body: fd });
    return res.json();
  },

  async session(){
    const res = await fetch('php/session.php');
    return res.json();
  },

  /* Productos */
  async listarProductos(){
    const res = await fetch('php/productos.php?action=listar');
    return res.json();
  },

  async agregarProducto(nombre,precio,cantidad){
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('precio', precio);
    fd.append('cantidad', cantidad);
    const res = await fetch('php/productos.php?action=agregar',{ method:'POST', body: fd });
    return res.json();
  },

  async editarProducto(id,nombre,precio,cantidad){
    const fd = new FormData();
    fd.append('id', id);
    fd.append('nombre', nombre);
    fd.append('precio', precio);
    fd.append('cantidad', cantidad);
    const res = await fetch('php/productos.php?action=editar',{ method:'POST', body: fd });
    return res.json();
  },

  async eliminarProducto(id){
    const fd = new FormData();
    fd.append('id', id);
    const res = await fetch('php/productos.php?action=eliminar',{ method:'POST', body: fd });
    return res.json();
  },

  async descontarCarrito(items){
    const res = await fetch('php/descontar.php', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(items)
    });
    return res.json();
  },

  /* Usuarios (admin) */
  async listarUsuarios(){
    const res = await fetch('php/usuarios.php?action=listar');
    return res.json();
  },

  async agregarUsuario(username,password,rol){
    const fd = new FormData();
    fd.append('username', username);
    fd.append('password', password);
    fd.append('rol', rol);
    const res = await fetch('php/usuarios.php?action=agregar',{ method:'POST', body: fd });
    return res.json();
  },

  async eliminarUsuario(id){
    const fd = new FormData();
    fd.append('id', id);
    const res = await fetch('php/usuarios.php?action=eliminar',{ method:'POST', body: fd });
    return res.json();
  },

  /* Reportes */
  async obtenerReporteVentas(){
    const res = await fetch('php/reportes.php?action=mas_vendidos');
    return res.json();
  }
};