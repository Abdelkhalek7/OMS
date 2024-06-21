import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: true },
    });

    if (!cart) {
       return  this.prisma.cart.create({
        data: {
          userId,
          cartItems: {
            create: [{ productId, quantity }],
          },
        },
      });
    } else {
      const cartItem = await this.prisma.cartItem.findFirst({
        where: { cartId: cart.cartId, productId },
      });

      if (cartItem) {
        return this.prisma.cartItem.update({
          where: { cartItemId: cartItem.cartItemId },
          data: { quantity: cartItem.quantity + quantity },
        });
      } else {
        return this.prisma.cartItem.create({
          data: {
            cartId: cart.cartId,
            productId,
            quantity,
          },
        });
      }
    }

  }

  async viewCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateCart(cartItemId: number, quantity: number) {
    return this.prisma.cartItem.update({
      where: { cartItemId },
      data: { quantity },
    });
  }

  async removeFromCart(cartItemId: number) {
    return this.prisma.cartItem.delete({
      where: { cartItemId },
    });
  }
}
