import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommunityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(21, { message: 'name cannot be longer than 21 characters' })
  @MinLength(3, { message: 'name cannot have less than 3 characters' })
  name: string;

  @IsOptional()
  @IsString()
  about: string;

  @IsOptional()
  profile_pic_url: string;

  @IsOptional()
  header_pic_url: string;
}
