// src/coupons/coupons.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCoupon(createCouponDto: CreateCouponDto) {
    const { code, discount, expiresAt } = createCouponDto;
    return this.prisma.coupon.create({
      data: {
        code,
        discount,
        expiresAt,
      },
    });
  }

  async getCouponById(couponId: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { couponId },
    });
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${couponId} not found`);
    }
    return coupon;
  }

  async updateCoupon(couponId: number, updateCouponDto: UpdateCouponDto) {
    const { discount, expiresAt } = updateCouponDto;
    return this.prisma.coupon.update({
      where: { couponId },
      data: {
        discount,
        expiresAt,
      },
    });
  }

  async deleteCoupon(couponId: number) {
    return this.prisma.coupon.delete({
      where: { couponId },
    });
  }
}
