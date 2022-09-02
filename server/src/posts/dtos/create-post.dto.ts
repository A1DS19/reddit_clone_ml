import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  communityId: number;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsArray()
  imagesUrl?: string[];
}
