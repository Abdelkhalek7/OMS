import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CartDto } from './dto/cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@Controller('api/cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({  type: AddToCartDto })
  @ApiCreatedResponse({ type: CartDto})
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto.userId, addToCartDto.productId, addToCartDto.quantity);
  }

  @Get(':userId')
  async viewCart(@Param('userId') userId: number) {
    return this.cartService.viewCart(Number(userId));
  }

  @Put('update')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: UpdateCartDto })
  @ApiCreatedResponse({ type: CartDto })
  async updateCart(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(updateCartDto.cartItemId, updateCartDto.quantity);
  }

  @Delete('remove')
  @ApiBody({ type: RemoveFromCartDto})
  @UsePipes(new ValidationPipe({ transform: true }))
  async removeFromCart(@Body() body: { cartItemId: number }) {
    const { cartItemId } = body;
    return this.cartService.removeFromCart(cartItemId);
  }
}
