import { Product } from "../models/product.model";

export abstract class ProductsRepository {
    static async findAll(): Promise<Product[]> {
        return Array.from(ProductsRepository.products.values())
    }
    
    static async findById(id?: string): Promise<Product | undefined> {
        if (!id) return undefined;
        if (!ProductsRepository.products.has(id)) throw new Error("Producto no encontrado.");
        return ProductsRepository.products.get(id)
    }

    static products = new Map<string, Product>([
        ["1", {
            id: "1",
            name: "Sierra circular",
            price: 100000,
            description: "Sierra Circular Ubermann. La Sierra Circular Ubermann de 1800W es la herramienta que necesitas para tus proyectos de hogar y construcción.",
            urlImage: 'https://sodimac.scene7.com/is/image/SodimacCL/8700591_00?wid=200&hei=200&qlt=70',
        }],
        ["2", {
            id: "2",
            name: "Taladro percutor eléctrico 13 mm 710W + 25 accesorios",
            price: 125000,
            description: "Taladro percutor eléctrico 13 mm 710W + 25 accesorios. Taladro percutor eléctrico 13 mm 710W + 25 accesorios , mango lateral de 1 pieza, medidor de profundidad de 1 pieza. Cuenta con una velocidad de 2700 RPM.",
            urlImage: 'https://sodimac.scene7.com/is/image/SodimacCL/8820538_01?wid=200&hei=200&qlt=70',
        }],
    ])
}