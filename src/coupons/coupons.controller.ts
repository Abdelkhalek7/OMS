// src/coupons/coupons.controller.ts

import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('api/coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: CreateCouponDto })
  @ApiCreatedResponse({ description: 'Coupon successfully created' })
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.createCoupon(createCouponDto);
  }

  @Get(':couponId')
  @ApiCreatedResponse({ description: 'Found coupon by ID' })
  @ApiNotFoundResponse({ description: 'Coupon not found' })
  async getCouponById(@Param('couponId') couponId: number) {
    try {
      return await this.couponsService.getCouponById(Number(couponId));
    } catch (error) {
      throw new NotFoundException(`Coupon with ID ${couponId} not found`);
    }
  }

  @Put(':couponId')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: UpdateCouponDto })
  async updateCoupon(@Param('couponId') couponId: number, @Body() updateCouponDto: UpdateCouponDto) {
    try {
      return await this.couponsService.updateCoupon(Number(couponId), updateCouponDto);
    } catch (error) {
      throw new NotFoundException(`Coupon with ID ${couponId} not found`);
    }
  }

  @Delete(':couponId')
  @ApiCreatedResponse({ description: 'Coupon successfully deleted' })
  async deleteCoupon(@Param('couponId') couponId: number) {
    try {
      await this.couponsService.deleteCoupon(Number(couponId));
      return { message: `Coupon with ID ${couponId} successfully deleted` };
    } catch (error) {
      throw new NotFoundException(`Coupon with ID ${couponId} not found`);
    }
  }
}
