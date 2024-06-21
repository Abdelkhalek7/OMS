import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyCouponDto {
  @ApiProperty({ example: 'DISCOUNT2024' })
  @IsString()
  couponCode: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;
}
