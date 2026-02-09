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
import { ApiProperty } from '@nestjs/swagger';

export class CreateOnboardingDto {
  @ApiProperty({
    description: 'Nombre completo del cliente',
    example: 'Juan Perez',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @ApiProperty({
    description: 'Numero de documento de identidad (6-15 digitos)',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty({ message: 'Document is required' })
  @Matches(/^\d{6,15}$/, {
    message: 'Document must contain 6 to 15 digits',
  })
  document: string;

  @ApiProperty({
    description: 'Correo electronico del cliente',
    example: 'juan@email.com',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Monto inicial de apertura',
    example: 500000,
  })
  @IsNumber({}, { message: 'Initial amount must be a number' })
  @IsPositive({ message: 'Initial amount must be positive' })
  initialAmount: number;
}
