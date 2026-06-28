import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  isAvailable: boolean;
  createdAt: Date;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Mesin Cuci Samsung 8kg Front Loading', price: 4500000, category: 'Laundry', stock: 10, isAvailable: true, createdAt: new Date() },
    { id: 2, name: 'Kulkas Sharp 2 Pintu 315L', price: 3800000, category: 'Dapur', stock: 7, isAvailable: true, createdAt: new Date() },
    { id: 3, name: 'AC Split Daikin 1 PK Inverter', price: 5200000, category: 'Pendingin', stock: 12, isAvailable: true, createdAt: new Date() },
    { id: 4, name: 'Microwave Panasonic 25L', price: 950000, category: 'Dapur', stock: 20, isAvailable: true, createdAt: new Date() },
    { id: 5, name: 'Blender Philips 2L Pro', price: 420000, category: 'Dapur', stock: 30, isAvailable: true, createdAt: new Date() },
    { id: 6, name: 'Vacuum Cleaner Electrolux 1600W', price: 1350000, category: 'Kebersihan', stock: 0, isAvailable: false, createdAt: new Date() },
    { id: 7, name: 'Rice Cooker Miyako 1.8L', price: 280000, category: 'Dapur', stock: 50, isAvailable: true, createdAt: new Date() },
    { id: 8, name: 'Setrika Uap Philips GC1905', price: 320000, category: 'Laundry', stock: 0, isAvailable: false, createdAt: new Date() },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  create(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      id: this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1,
      ...product,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, updateData: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | undefined {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.products[index] = { ...this.products[index], ...updateData };
    return this.products[index];
  }

  delete(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  findByCategory(category: string): Product[] {
    return this.products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  findAvailable(): Product[] {
    return this.products.filter((p) => p.stock > 0 && p.isAvailable);
  }
}
