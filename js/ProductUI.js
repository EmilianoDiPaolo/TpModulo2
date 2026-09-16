export class ProductUi {
  constructor(manager) {
    this.manager = manager;

    this.nombre = document.getElementById("nombreProducto");
    this.categoria = document.getElementById("categoriaProducto");
    this.precio = document.getElementById("precioProducto");
    this.stock = document.getElementById("stockProducto");
    this.btnAgregar = document.getElementById("agregarProducto");
    this.buscarProducto = document.getElementById("buscarProducto");
    this.listado = document.getElementById("listadoProductos");
  }

  crearItemProducto(producto) {
    const item = document.createElement("li");
    item.className = "col-md-6 col-lg-4";
  }

  crearBoton(texto, clase) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.className = clase;

    return btn;
  }

  render() {}

  limpiarFormulario() {
    this.nombre.value = "";
    this.categoria.value = "";
    this.precio.value = "";
    this.stock.value = "";
  }
}
