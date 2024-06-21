import { IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class AddToCartDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ example: 1 })
  userId: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ example: 1 })
  productId: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ example: 1 })
  quantity: number;
}
