import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateOnboardingDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Document is required' })
  @Matches(/^\d{6,15}$/, {
    message: 'Document must contain 6 to 15 digits',
  })
  document: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNumber({}, { message: 'Initial amount must be a number' })
  @IsPositive({ message: 'Initial amount must be positive' })
  initialAmount: number;
}
