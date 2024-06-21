import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  orderDate: Date;

  @ApiProperty()
  status: string;
}
