import { ProductManager } from "./ProductManager.js";
import { ProductUi } from "./ProductUI.js";

const manager = new ProductManager();
const productUi = new ProductUi(manager);

productUi.render();
