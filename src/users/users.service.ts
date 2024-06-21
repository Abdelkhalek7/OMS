import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Method to create a new user
  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data }); // Use PrismaClient to create a new user
  }

  // Method to fetch a user by ID
  async getUserById(userId: number) {
    return this.prisma.user.findUnique({ where: { userId } }); // Use PrismaClient to find a user by ID
  }
}
