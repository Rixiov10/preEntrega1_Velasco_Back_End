import { promises as fs } from "fs";
import ProductManager from "./ProductManager.js";
import { nanoid } from "nanoid";

const products = new ProductManager();

class CartManager {
  constructor() {
    this.path = "./src/models/carts.json";
  }

  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  };

  writeCarts = async (carts) => {
    await fs.writeFile(this.path, JSON.stringify(carts))
  };

  exist = async (id) => {
    let carts = await this.readCarts();
    return carts.find(cart => cart.id === id);
  };


  addCarts = async () => {
    let cartsOld = await this.readCarts();
    let id = nanoid();
    let cartsConcat = [...{id: id, products : []}, ...cartsOld];
    await this.writeCarts(cartsConcat);
    return "Carrito agregado";
  };

  getCartById = async (id) => {
    let cartById = await this.exist(id);
    if (!cartById) return "carrito no encontrado";
    return cartById;
  };

  addProductInCart = async (cartId, productId) => {
    let cartById = await this.exist(cartId);
    if (!cartById) return "carrito no encontrado";
    let productById = await productAll.exist(productId);
    if (!productById) return "producto no encontrado";

    let cartAll = await this.readCarts();
    let cartFilter = carsAll.filter((cart) => cart.id != cartId);
    
    if (cartById.products.some((prod) => prod.id === productId)) {
        let moreProductInCart = cartById.products.find (
        (prod) => prod.id === productId
        );
        productInCart.cantidad++;
        console.log (moreProductInCart.cantidad);
        let cartsConcat = [cartById, ...cartFilter];
        await this.writeCarts(cartsConcat);
        return "Producto Sumado al Carrito";
        }
        cartById.products.push({ id: productById.id, cantidad : 1})
        let cartsConcat = [cartById, ...cartFilter];
        await this.writeCarts(cartsConcat);
        return "Producto Agregado al Carrito"; 

    };
    
}

export default CartManager;