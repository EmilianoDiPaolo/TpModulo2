import { Product } from "./Product.js";

export class ProductManager {
  constructor() {
    this.productos = [];
    this.nextId = 1;
  }

  agregar(nombre, categoria, precio, stock) {
    const producto = new Product(
      this.nextId++,
      nombre,
      precio,
      stock,
      categoria,
    );

    this.productos.push(producto);
  }

  editar(id, nombre, precio, stock, categoria) {
    const producto = this.productos.find((p) => p.id === id);

    if (producto) {
      producto.nombre = nombre;
      producto.precio = precio;
      producto.stock = stock;
      producto.categoria = categoria;
    }
  }

  eliminar(id) {
    this.productos = this.productos.filter((p) => p.id !== id);
  }

  obtenerProductos() {
    return [...this.productos];
  }

  buscarProductos(nombre) {
    return this.productos.filter((p) =>
      p.nombre.toLowerCase().includes(nombre.toLowerCase()),
    );
  }

  aumentarStock(id) {
    const producto = this.productos.find((p) => p.id === id);

    if (producto) {
      producto.stock++;
    }
  }

  disminuirStock(id) {
    const producto = this.productos.find((p) => p.id === id);

    if (producto && producto.stock > 0) {
      producto.stock--;
    }
  }
}
