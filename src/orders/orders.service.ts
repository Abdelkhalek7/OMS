import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Create a new order based on the user's cart
  async createOrder(userId: number) {
    // Fetch the user's cart including cart items and related products
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: { include: { product: true } } },
    });

    // Throw an error if the cart is empty
    if (!cart || cart.cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate the total price of the order based on cart items
    const totalPrice = cart.cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    );

    // Create the order in the database
    const order = await this.prisma.order.create({
      data: {
        userId,
        status: 'PENDING',
        totalPrice,
        items: {
          create: cart.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    // Decrease stock for ordered products
    for (const item of cart.cartItems) {
      await this.prisma.product.update({
        where: { productId: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Clear the user's cart after creating the order
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.cartId },
    });

    return order;
  }

  // Fetch an order by its ID
  async getOrderById(orderId: number) {
    return this.prisma.order.findUnique({
      where: { orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  // Update the status of an order
  async updateOrderStatus(orderId: number, status: string) {
    return this.prisma.order.update({
      where: { orderId },
      data: { status },
    });
  }

  // Fetch order history for a specific user
  async getUserOrderHistory(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  // Apply a coupon to an existing order
  async applyCoupon(orderId: number, couponCode: string) {
    // Fetch the coupon by its code
    const coupon = await this.prisma.coupon.findFirst({
      where: { code: couponCode },
    });

    // Throw an error if the coupon is not found
    if (!coupon) {
      throw new Error('Coupon not found');
    }

    // Throw an error if the coupon has expired
    if (coupon.expiresAt < new Date()) {
      throw new Error('Coupon is expired');
    }

    // Calculate the discount based on the coupon's discount percentage
    const discount = coupon.discount;

    // Fetch the order including items and related products
    const order = await this.prisma.order.findUnique({
      where: { orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Throw an error if the order is not found
    if (!order) {
      throw new Error('Order not found');
    }

    // Calculate the discounted price based on the order's total price
    const totalPrice = order.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    );
    const discountedPrice = totalPrice * (1 - discount);

    // Update the order's total price with the discounted price
    return this.prisma.order.update({
      where: { orderId },
      data: { totalPrice: discountedPrice },
    });
  }
}
