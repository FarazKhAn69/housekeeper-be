import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);

    if (createdUser) {
      return {
        message: 'User created successfully',
        user: createdUser,
      };
    } else {
      return { message: 'Error creating user' };
    }
  }


  @Put(':id/update')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(+id, updateUserDto);

    if (updatedUser) {
      return {
        message: 'User updated successfully',
        user: updatedUser,
      };
    } else {
      return { message: 'Error updating user' };
    }
  }


  @Delete(':id/delete')
  remove(@Param('id') id: string) {
    try {
      this.userService.remove(+id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      return { message: 'Error deleting user' + error.message};
    }
  }

  // @Post('login')
  // login(@Body() loginUserDto: LoginUserDto) {
  //   const loginResult = this.userService.login(loginUserDto);

  //   if (loginResult) {
  //     return {
  //       message: 'Login successful',
  //       data: loginResult,
  //     };
  //   } else {
  //     return { message: 'Login failed' };
  //   }
  // }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

}
