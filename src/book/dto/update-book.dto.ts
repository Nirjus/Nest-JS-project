import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'Name not be empty' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'weight must be number' })
  @IsNotEmpty({ message: 'Weight must not be empty' })
  @Min(50, { message: 'minimum weight must be 50 kg' })
  @Max(100, { message: 'Maximum weight be under 100 k00g' })
  weight?: number;
}
