import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(10, {
    message: 'repeat password must be longer than or equal to 10 characters',
  })
  repeatPassword?: string;
}
