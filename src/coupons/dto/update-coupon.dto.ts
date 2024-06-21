// src/coupons/dto/update-coupon.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsDateString, IsOptional } from 'class-validator';

export class UpdateCouponDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  expiresAt?: Date;
}
