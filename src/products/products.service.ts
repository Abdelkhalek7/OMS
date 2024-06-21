import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {

    constructor(private prisma: PrismaService) {}
    
    // Method to create a new product
    async createProduct(data: CreateProductDto) {
        return this.prisma.product.create({ data });
    }
    
    // Method to fetch a product by its ID
    async getProductById(productId: number) {
        return this.prisma.product.findUnique({ where: { productId } });
    }
    
    // Method to fetch all products
    async getAllProducts() {
        return this.prisma.product.findMany();
    }
    
    // Method to update a product by its ID
    async updateProduct(productId: number, data: Prisma.ProductUpdateInput) {
        return this.prisma.product.update({ where: { productId }, data });
    }
    
    // Method to delete a product by its ID
    async deleteProduct(productId: number) {
        return this.prisma.product.delete({ where: { productId } });
    }
}
