import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOrderHistoryDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;
}
