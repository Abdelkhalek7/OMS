import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Endpoint to create a new product
  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) // Use ValidationPipe for automatic DTO validation
  @ApiBody({ type: CreateProductDto, description: 'Create a new product' })
  @ApiCreatedResponse({ type: ProductDto })
  async createProduct(@Body() productData: CreateProductDto) {
    try {
      return await this.productsService.createProduct(productData);
    } catch (error) {
      throw new BadRequestException('Failed to create product', error.message);
    }
  }

  // Endpoint to get a product by its ID
  @Get(':productId')
  @ApiCreatedResponse({ type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async getProductById(@Param('productId') productId: number) {
    try {
      const product = await this.productsService.getProductById(Number(productId));
      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }
      return product;
    } catch (error) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
  }

  // Endpoint to get all products
  @Get()
  @ApiCreatedResponse({ type: ProductDto, isArray: true })
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }
}
