import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty()
  cartId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  cartItems: CartItemDto[];
}

export class CartItemDto {
  @ApiProperty()
  cartItemId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productId: number;
}
3