import { Controller, Post, Get, Put, Body, Param, UsePipes, ValidationPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ApplyCouponDto } from './dto/apply-coupon.dto';

@Controller('api')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Endpoint to create a new order
  @Post('orders')
  @UsePipes(new ValidationPipe({ transform: true })) // Validate incoming data using ValidationPipe
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({ description: 'Order successfully created' })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.ordersService.createOrder(createOrderDto.userId);
    } catch (error) {
      throw new BadRequestException('Failed to create order', error.message);
    }
  }

  // Endpoint to fetch an order by ID
  @Get('orders/:orderId')
  @ApiCreatedResponse({ description: 'Found order by ID' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async getOrderById(@Param('orderId') orderId: number) {
    try {
      const order = await this.ordersService.getOrderById(Number(orderId));
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }
      return order;
    } catch (error) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
  }

  // Endpoint to update order status
  @Put('orders/:orderId/status')
  @UsePipes(new ValidationPipe({ transform: true })) // Validate incoming data using ValidationPipe
  @ApiBody({ type: UpdateOrderStatusDto })
  async updateOrderStatus(@Param('orderId') orderId: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    try {
      return await this.ordersService.updateOrderStatus(Number(orderId), updateOrderStatusDto.status);
    } catch (error) {
      throw new BadRequestException('Failed to update order status', error.message);
    }
  }

  // Endpoint to fetch user order history
  @Get('user/:userId/orders')
  @ApiCreatedResponse({ description: 'Found user order history' })
  async getUserOrderHistory(@Param('userId') userId: number) {
    return this.ordersService.getUserOrderHistory(Number(userId));
  }

  // Endpoint to apply a coupon to an order
  @Post('orders/apply-coupon')
  @UsePipes(new ValidationPipe({ transform: true })) // Validate incoming data using ValidationPipe
  @ApiBody({ type: ApplyCouponDto })
  async applyCoupon(@Body() body: ApplyCouponDto) {
    try {
      return await this.ordersService.applyCoupon(body.userId, body.couponCode);
    } catch (error) {
      throw new BadRequestException('Failed to apply coupon', error.message);
    }
  }
}
