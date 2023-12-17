import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt'; 
import { config } from 'dotenv';

config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ 
      secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' } }), 

  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
