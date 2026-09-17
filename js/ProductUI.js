export class ProductUi {
  constructor(manager) {
    this.manager = manager;
    this.productoEditando = null;

    this.nombre = document.getElementById("nombreProducto");
    this.categoria = document.getElementById("categoriaProducto");
    this.precio = document.getElementById("precioProducto");
    this.stock = document.getElementById("stockProducto");
    this.btnAgregar = document.getElementById("agregarProducto");
    this.buscarProducto = document.getElementById("buscarProducto");
    this.listado = document.getElementById("listadoProductos");
    this.cantidadProductos = document.getElementById("cantidadProductos");
    this.cantidadStock = document.getElementById("cantidadStock");
    this.valorTotal = document.getElementById("valorInventario");

    this.btnAgregar.addEventListener("click", () => this.handleAgregar());

    this.buscarProducto.addEventListener("input", () => this.buscar());
  }

  actualizarResumen() {
    let stockTotal = 0;
    let valorTotal = 0;

    const productos = this.manager.obtenerProductos();

    productos.forEach((producto) => {
      stockTotal = stockTotal + producto.stock;
      valorTotal = valorTotal + producto.precio * producto.stock;
    });

    this.cantidadProductos.textContent = productos.length;
    this.cantidadStock.textContent = stockTotal;
    this.valorTotal.textContent = valorTotal;
  }

  buscar() {
    const busqueda = this.buscarProducto.value;
    const productosFiltrados = this.manager.buscarProductos(busqueda);

    this.listado.innerHTML = "";

    productosFiltrados.forEach((producto) => {
      this.listado.appendChild(this.crearItemProducto(producto));
    });
  }

  handleAgregar() {
    const nombre = this.nombre.value;
    const categoria = this.categoria.value;
    const precio = Number(this.precio.value);
    const stock = Number(this.stock.value);

    if (!nombre || !categoria || precio <= 0 || stock < 0) {
      alert("Debes rellenar todos los campos");
      return;
    }

    if (this.productoEditando) {
      this.manager.editar(
        this.productoEditando.id,
        nombre,
        precio,
        stock,
        categoria,
      );

      this.productoEditando = null;
      this.btnAgregar.textContent = "Agregar producto";
    } else {
      this.manager.agregar(nombre, categoria, precio, stock);
    }

    this.limpiarFormulario();
    this.render();
  }

  cargarParaEdicion(producto) {
    this.nombre.value = producto.nombre;
    this.categoria.value = producto.categoria;
    this.precio.value = producto.precio;
    this.stock.value = producto.stock;

    this.productoEditando = producto;
    this.btnAgregar.textContent = "Guardar Cambios";
  }

  render() {
    this.listado.innerHTML = "";

    this.manager.obtenerProductos().forEach((producto) => {
      this.listado.appendChild(this.crearItemProducto(producto));
    });

    this.actualizarResumen();
  }

  crearItemProducto(producto) {
    const item = document.createElement("div");
    item.className = "col-md-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "card shadow-sm h-100 p-3";

    const info = document.createElement("div");
    info.innerHTML = `
    <h5>${producto.nombre}</h5>
    <p>Categoría: ${producto.categoria}</p>
    <p>Precio: $${producto.precio}</p>
    <p>Stock: ${producto.stock}</p>`;

    const btnDisminuir = this.crearBoton("-", "btn btn-warning");
    const btnAumentar = this.crearBoton("+", "btn btn-success");
    const btnEditar = this.crearBoton("Editar", "btn btn-primary");
    const btnEliminar = this.crearBoton("Eliminar", "btn btn-danger");

    btnDisminuir.addEventListener("click", () => {
      this.manager.disminuirStock(producto.id);
      this.render();
    });
    btnAumentar.addEventListener("click", () => {
      this.manager.aumentarStock(producto.id);
      this.render();
    });
    btnEditar.addEventListener("click", () => this.cargarParaEdicion(producto));

    btnEliminar.addEventListener("click", () => {
      this.manager.eliminar(producto.id);
      this.render();
    });
    item.append(card);
    card.append(info, btnDisminuir, btnAumentar, btnEditar, btnEliminar);

    return item;
  }

  crearBoton(texto, clase) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.className = clase;

    return btn;
  }

  limpiarFormulario() {
    this.nombre.value = "";
    this.categoria.value = "";
    this.precio.value = "";
    this.stock.value = "";
  }
}
