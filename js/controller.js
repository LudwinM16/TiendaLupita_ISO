let CART = []; // {id, nombre, precio, cantidadActual, descontar}
let alertaMostrada = false; // Variable global para controlar que la alerta de inicio se muestre solo 1 vez
let PRODUCTOS = []; // Lista completa de productos (para el buscador en tiempo real)

document.addEventListener('DOMContentLoaded', ()=>{

  // Login page
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', async e=>{
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const res = await Model.login(username,password);
      if(res.status === 'ok' || res.status === 'success'){
        window.location = 'app.html';
      } else {
        View.showError(res.msg || res.message || 'Credenciales inválidas', '#loginError');
      }
    });
  }

  // App page
  if(document.getElementById('productTable')){
    initApp();
  }
});

async function initApp(){
  // obtener sesión
  const sess = await Model.session();
  if(!sess.auth){
    window.location = 'index.html';
    return;
  }
  View.showUserInfo(sess.user);

  // cargar productos
  await cargarProductos();

  // si admin, cargar usuarios
  if(sess.user.rol === 'admin') {
    cargarUsuarios();
  }

  // Buscador de productos en tiempo real
  const buscador = document.getElementById('buscadorProducto');
  if(buscador){
    buscador.addEventListener('input', renderProductosFiltrados);
  }

  // eventos productos
  document.getElementById('productForm').addEventListener('submit', async e=>{
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const nombre = document.getElementById('productName').value.trim();
    const precio = document.getElementById('productPrice').value;
    const cantidad = document.getElementById('productCantidad').value;

    if(!nombre || !precio || cantidad === '') return;

    if(id){
      await Model.editarProducto(id,nombre,precio,cantidad);
    } else {
      await Model.agregarProducto(nombre,precio,cantidad);
    }
    View.clearProductForm();
    cargarProductos();
  });

  document.getElementById('productTable').addEventListener('click', async e=>{
    const id = e.target.dataset.id;
    if(e.target.classList.contains('edit-product')){
      const productos = await Model.listarProductos();
      const p = productos.find(x=> x.id == id);
      if(p) View.fillProductForm(p);
    }
    if(e.target.classList.contains('delete-product')){
      if(confirm('Eliminar producto?')){
        await Model.eliminarProducto(id);
        cargarProductos();
      }
    }
    if(e.target.classList.contains('add-cart')){
      const id = e.target.dataset.id;
      const nombre = e.target.dataset.nombre;
      const precio = parseFloat(e.target.dataset.precio) || 0;
      const cantidadActual = parseInt(e.target.dataset.cantidad,10) || 0;
      agregarAlCarrito({id, nombre, precio, cantidadActual});
    }
  });

  // Botón Generar Reporte PDF
  const generarReporteBtn = document.getElementById('generarReporteBtn');
  if (generarReporteBtn) {
    generarReporteBtn.addEventListener('click', async () => {
      try {
        const datos = await Model.obtenerReporteVentas();
        // Si el backend devolvió un error (p. ej. sesión expirada) viene como objeto, no como arreglo
        if (datos && datos.error) {
          alert('No se pudo obtener el reporte: ' + datos.error);
          return;
        }
        if (Array.isArray(datos) && datos.length > 0) {
          View.exportarReportePDF(datos);
        } else {
          alert("No hay datos de ventas para generar el reporte.");
        }
      } catch (e) {
        console.error('Error al generar el reporte PDF:', e);
        alert('Ocurrió un error al generar el PDF: ' + e.message);
      }
    });
  }

  // carrito UI
  document.getElementById('verCarritoBtn').addEventListener('click', ()=>{
    const modal = new bootstrap.Modal(document.getElementById('carritoModal'));
    View.renderCart(CART);
    modal.show();
  });

  document.getElementById('cartTable').addEventListener('click', (e)=>{
    if(e.target.classList.contains('remove-cart')){
      const idx = parseInt(e.target.dataset.idx,10);
      CART.splice(idx,1);
      View.renderCart(CART);
      View.updateCartCount(CART.length);
    }
  });

  document.getElementById('cartTable').addEventListener('input', (e)=>{
    if(e.target.classList.contains('qty-descontar')){
      const idx = parseInt(e.target.dataset.idx,10);
      let val = parseInt(e.target.value,10);
      if(isNaN(val) || val < 1) val = 1;
      if(val > CART[idx].cantidadActual) val = CART[idx].cantidadActual;
      CART[idx].descontar = val;
      e.target.value = val;
      // Recalcular total
      View.renderCart(CART);
    }
  });

  document.getElementById('applyDiscount').addEventListener('click', async ()=>{
    if(CART.length === 0){ alert('Carrito vacío'); return; }
    
    const total = CART.reduce((sum, item) => sum + (item.precio * item.descontar), 0);
    const mensaje = `¿Procesar compra por un total de $${total.toFixed(2)}?`;
    
    if(!confirm(mensaje)) return;
    
    // Ahora enviamos también el precio para que el backend lo pueda guardar en detalle_ventas
    const payload = CART.map(i=>({id:i.id, descontar:i.descontar, precio:i.precio}));
    const res = await Model.descontarCarrito(payload);
    if(res.status === 'ok'){
      alert(`Compra procesada exitosamente!\nTotal: $${total.toFixed(2)}\n${res.message || 'Inventario actualizado'}`);
      CART = [];
      View.updateCartCount(0);
      cargarProductos();
      const modalEl = document.getElementById('carritoModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    } else {
      alert(res.error || 'Error al procesar la compra');
    }
  });

  // eventos usuarios (admin)
  const userForm = document.getElementById('userForm');
  if(userForm){
    userForm.addEventListener('submit', async e=>{
      e.preventDefault();
      const username = document.getElementById('newUsername').value.trim();
      const password = document.getElementById('newPassword').value;
      const rol = document.getElementById('newRol').value;
      if(!username || !password) return;
      await Model.agregarUsuario(username,password,rol);
      userForm.reset();
      cargarUsuarios();
    });

    document.getElementById('userTable').addEventListener('click', async e=>{
      const id = e.target.dataset.id;
      if(e.target.classList.contains('delete-user')){
        if(confirm('Eliminar usuario?')){
          await Model.eliminarUsuario(id);
          cargarUsuarios();
        }
      }
    });
  }
}

async function cargarProductos(){
  const productos = await Model.listarProductos();
  if(Array.isArray(productos)) {
    PRODUCTOS = productos; // guardamos la lista completa para el buscador
    renderProductosFiltrados();
    
    // Alerta emergente de stock bajo al iniciar sesión
    if(!alertaMostrada) {
      const stockBajo = productos.filter(p => parseInt(p.cantidad) < 3);
      if(stockBajo.length > 0) {
        const nombres = stockBajo.map(p => `- ${p.nombre} (${p.cantidad} unidades)`).join('\n');
        alert("⚠️ ALERTA DE INVENTARIO ⚠️\n\nLos siguientes productos tienen un stock bajo (menos de 3 unidades):\n" + nombres);
      }
      alertaMostrada = true; // Se marca como mostrada
    }

    // Actualizar precios y cantidades en el carrito
    for(const p of productos){
      const idx = CART.findIndex(c=> c.id == p.id);
      if(idx >= 0) {
        CART[idx].cantidadActual = parseInt(p.cantidad,10);
        CART[idx].precio = parseFloat(p.precio);
      }
    }
    View.updateCartCount(CART.length);
  }
}

// Filtra PRODUCTOS según el texto del buscador y renderiza el resultado
function renderProductosFiltrados(){
  const buscador = document.getElementById('buscadorProducto');
  const term = buscador ? buscador.value.toLowerCase().trim() : '';
  const filtrados = term
    ? PRODUCTOS.filter(p => p.nombre.toLowerCase().includes(term))
    : PRODUCTOS;
  View.renderProducts(filtrados);
}

async function cargarUsuarios(){
  const usuarios = await Model.listarUsuarios();
  if(Array.isArray(usuarios)) View.renderUsers(usuarios);
}

function agregarAlCarrito(item){
  const idx = CART.findIndex(c => c.id == item.id);
  if(idx >= 0){
    if(CART[idx].descontar < item.cantidadActual) CART[idx].descontar++;
  } else {
    CART.push({ 
      id: item.id, 
      nombre: item.nombre, 
      precio: item.precio,
      cantidadActual: item.cantidadActual, 
      descontar: 1 
    });
  }
  View.updateCartCount(CART.length);
}