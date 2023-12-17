import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {


  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
}
