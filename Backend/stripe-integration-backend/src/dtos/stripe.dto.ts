import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;
}

export class SaveConfigDto {
  @IsString()
  @IsNotEmpty()
  publishableKey: string;

  @IsString()
  @IsNotEmpty()
  secretKey: string;
}
