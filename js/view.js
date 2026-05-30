const View = {
  renderProducts(products){
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    products.forEach(p=>{
      const tr = document.createElement('tr');
      
      // Lógica de alerta visual: stock menor a 3 en rojo
      if(parseInt(p.cantidad) < 3) {
        tr.classList.add('table-danger');
      }

      tr.innerHTML = `
        <td>${p.nombre}</td>
        <td>$${parseFloat(p.precio).toFixed(2)}</td>
        <td><strong>${p.cantidad}</strong></td>
        <td>
          <button class="btn btn-sm btn-warning edit-product" data-id="${p.id}">Editar</button>
          <button class="btn btn-sm btn-danger delete-product" data-id="${p.id}">Eliminar</button>
          <button class="btn btn-sm btn-outline-primary ms-1 add-cart" 
                  data-id="${p.id}" 
                  data-cantidad="${p.cantidad}" 
                  data-precio="${p.precio}"
                  data-nombre="${p.nombre}">Vender</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderUsers(users){
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';
    users.forEach(u=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.username}</td>
        <td>${u.rol}</td>
        <td>${u.rol !== 'admin' ? '<button class="btn btn-sm btn-danger delete-user" data-id="'+u.id+'">Eliminar</button>' : ''}</td>
      `;
      tbody.appendChild(tr);
    });
  },

  showUserInfo(user){
    document.getElementById('userInfo').textContent = user.username + ' (' + user.rol + ')';
    if(user.rol === 'admin') document.getElementById('userSection').classList.remove('d-none');
  },

  showError(msg, selector='#loginError'){
    const el = document.querySelector(selector);
    if(el) el.textContent = msg;
  },

  clearProductForm(){
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCantidad').value = '';

    // Volver al modo "Agregar"
    const btn = document.querySelector('#productForm button[type="submit"]');
    if (btn) { btn.textContent = 'Guardar'; btn.classList.replace('btn-primary', 'btn-success'); }
    const titulo = document.getElementById('formProductoTitulo');
    if (titulo) titulo.textContent = 'Agregar Producto';
  },

  fillProductForm(p){
    document.getElementById('productId').value = p.id;
    document.getElementById('productName').value = p.nombre;
    document.getElementById('productPrice').value = p.precio;
    document.getElementById('productCantidad').value = p.cantidad;

    // Feedback visual: que se note que "Editar" sí respondió
    const btn = document.querySelector('#productForm button[type="submit"]');
    if (btn) { btn.textContent = 'Actualizar'; btn.classList.replace('btn-success', 'btn-primary'); }
    const titulo = document.getElementById('formProductoTitulo');
    if (titulo) titulo.textContent = 'Editando: ' + p.nombre;

    this.showProductModal();
  },

  // Abre el pop-up (modal) del formulario de producto
  showProductModal(){
    bootstrap.Modal.getOrCreateInstance(document.getElementById('productoModal')).show();
  },

  // Cierra el pop-up del formulario de producto
  hideProductModal(){
    const modal = bootstrap.Modal.getInstance(document.getElementById('productoModal'));
    if (modal) modal.hide();
  },

  updateCartCount(count){
    document.getElementById('cartCount').textContent = count;
  },

  renderCart(cart){
    const tbody = document.querySelector('#cartTable tbody');
    const carritoVacio = document.getElementById('carritoVacio');
    const totalPagar = document.getElementById('totalPagar');
    
    if(cart.length === 0) {
      tbody.innerHTML = '';
      if(carritoVacio) carritoVacio.style.display = 'block';
      if(totalPagar) totalPagar.textContent = '$0.00';
      return;
    }
    
    if(carritoVacio) carritoVacio.style.display = 'none';
    tbody.innerHTML = '';
    
    let total = 0;
    
    cart.forEach((item, idx)=>{
      const subtotal = item.precio * item.descontar;
      total += subtotal;
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.nombre}</td>
        <td>$${parseFloat(item.precio).toFixed(2)}</td>
        <td>
          <input class="form-control form-control-sm qty-descontar" 
                 data-idx="${idx}" 
                 type="number" 
                 min="1" 
                 max="${item.cantidadActual}" 
                 value="${item.descontar}"
                 style="width: 80px;">
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-danger remove-cart" data-idx="${idx}">Quitar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    
    if(totalPagar) {
      totalPagar.textContent = `$${total.toFixed(2)}`;
    }
  },

  exportarReportePDF(datosReporte) {
    // Verificar que las librerías de PDF se hayan cargado (requieren conexión a internet)
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert('No se pudieron cargar las librerías de PDF (jsPDF). Revisa tu conexión a internet e inténtalo de nuevo.');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    if (typeof doc.autoTable !== 'function') {
      alert('No se cargó el complemento de tablas (jspdf-autotable). Revisa tu conexión a internet e inténtalo de nuevo.');
      return;
    }

    doc.text("Reporte de Productos Más Vendidos - Tienda Lupita", 14, 15);
    
    const bodyData = datosReporte.map(item => [
      item.nombre, 
      item.total_unidades, 
      `$${parseFloat(item.ingresos_totales).toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 25,
      head: [['Producto', 'Unidades Vendidas', 'Ingresos Totales']],
      body: bodyData,
      theme: 'grid',
      styles: { halign: 'center' },
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save("Reporte_Ventas_SILC.pdf");
  }
};