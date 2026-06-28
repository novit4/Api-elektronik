import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products - Mendapatkan semua produk
  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  // GET /products/available - Filter produk tersedia (stok > 0 & isAvailable = true)
  @Get('available')
  findAvailable(): Product[] {
    return this.productsService.findAvailable();
  }

  // GET /products/category/:category - Filter produk berdasarkan kategori
  @Get('category/:category')
  findByCategory(@Param('category') category: string): Product[] | { message: string } {
    const results = this.productsService.findByCategory(category);
    if (results.length === 0) {
      return { message: `Tidak ada produk dalam kategori "${category}"` };
    }
    return results;
  }

  // GET /products/:id - Mendapatkan produk berdasarkan ID
  @Get(':id')
  findOne(@Param('id') id: string): Product | { message: string } {
    const product = this.productsService.findOne(parseInt(id));
    if (!product) {
      return { message: `Produk dengan ID ${id} tidak ditemukan` };
    }
    return product;
  }

  // POST /products - Menambah produk baru
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: Omit<Product, 'id' | 'createdAt'>): Product {
    return this.productsService.create(createProductDto);
  }

  // PUT /products/:id - Mengupdate produk berdasarkan ID (partial update)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Omit<Product, 'id' | 'createdAt'>>,
  ): Product | { message: string } {
    const updated = this.productsService.update(parseInt(id), updateData);
    if (!updated) {
      return { message: `Produk dengan ID ${id} tidak ditemukan` };
    }
    return updated;
  }

  // DELETE /products/:id - Menghapus produk berdasarkan ID
  @Delete(':id')
  delete(@Param('id') id: string): { message: string } {
    const deleted = this.productsService.delete(parseInt(id));
    if (!deleted) {
      return { message: `Produk dengan ID ${id} tidak ditemukan` };
    }
    return { message: `Produk dengan ID ${id} berhasil dihapus` };
  }
}
