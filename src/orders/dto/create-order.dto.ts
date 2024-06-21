import { IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  userId: number;
}
