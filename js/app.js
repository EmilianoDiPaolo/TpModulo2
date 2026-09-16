import { ProductManager } from "./ProductManager";
import { ProductUi } from "./ProductUI";

const manager = new ProductManager();
const productUi = new ProductUi(manager);
