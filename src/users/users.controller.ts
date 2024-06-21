import { Controller, Get, Post, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint to create a new user
  @Post()
  @ApiCreatedResponse({ type: UserDto }) // Swagger response description for successful user creation
  @ApiBody({ type: CreateUserDto }) // Swagger request body description for user creation
  async createUser(@Body() userData: Prisma.UserCreateInput) {
    try {
      return await this.usersService.createUser(userData); // Call service method to create user
    } catch (error) {
      throw new BadRequestException('Failed to create user', error.message); // Throw BadRequestException on failure
    }
  }

  // Endpoint to fetch user by ID
  @Get(':userId')
  @ApiCreatedResponse({ type: UserDto }) // Swagger response description for successful user retrieval
  @ApiNotFoundResponse({ description: 'User not found' }) // Swagger response description for user not found
  async getUserById(@Param('userId') userId: number) {
    try {
      const user = await this.usersService.getUserById(Number(userId)); // Call service method to get user by ID
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`); // Throw NotFoundException if user does not exist
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${userId} not found`); // Catch errors and throw NotFoundException
    }
  }
}
