import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title pust be 3 character long' })
  @MaxLength(50, { message: 'Title can not be longer than 50 character ' })
  title: string;

  @IsNotEmpty({ message: 'Content should not be empty' })
  @IsString({ message: 'Content must be string' })
  @MinLength(5, { message: 'Minimul character atleast 5 character long' })
  content: string;

  @IsNotEmpty({ message: 'authorName should not be empty' })
  @IsString({ message: 'authorName must be string' })
  @MinLength(5, { message: 'Minimul character atleast 5 character long' })
  authorName: string;
}
