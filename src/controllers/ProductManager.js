import {promises as fs} from 'fs';
import {nanoid} from 'nanoid';    

class ProductManager {  
    constructor() { 
        this.path = "./src/Models/Products.json";
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(products);
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(prod => prod.id === id);
    }

    addProducts = async (product) => {
        let productsOld = await this.readProducts()
        product.id = nanoid();
        let productALL = [...productsOld, product];
        await this.writeProducts(productALL);
        return "producto agregado";
    };

    getProducts = async () => {
        return await this.readProducts();
    }

    getProductsById = async (id) => {
        let productById = await this.exist(id);
        if(!productById) return "producto no encontrado";
        return productById;
    }


    updateProduct = async (id, product) => {
        let productById = await this.exist(id);
        if(!productById) return "producto no encontrado";
        await this.deleteProducts(id);
        let productsOld = await this.readProducts();
        let products = [{...products, id : id},...productsOld]
        await this.writeProducts(products);
        return "producto actualizado";
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id === id);
        if(existProducts) {
        let filterProducts = products.find(prod => prod.id != id);
        await this.writeProducts(filterProducts)
        return "producto eliminado";
        }
        return "producto a eliminar inexistente";
    }
}

export default ProductManager;