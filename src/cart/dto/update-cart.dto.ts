import { IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateCartDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ example: 1,type: Number})
  cartItemId: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ example: 1,type: Number})
  quantity: number;
}
