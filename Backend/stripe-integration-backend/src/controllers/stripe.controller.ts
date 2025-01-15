import { Body, Controller, Get, Post } from '@nestjs/common';
import { StripeService } from '../services/stripe.service';
import { SaveConfigDto, CreatePaymentIntentDto } from '../dtos/stripe.dto';

let stripeKeys = {
  publishableKey: '',
  secretKey: '',
};

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  // Save Stripe Configuration
  @Post('config')
  saveStripeConfig(@Body() saveConfigDto: SaveConfigDto) {
    const { publishableKey, secretKey } = saveConfigDto;
    stripeKeys.publishableKey = publishableKey;
    stripeKeys.secretKey = secretKey;
    return { message: 'Stripe configuration saved successfully' };
  }

  // Get Publishable Key
  @Get('config')
  getStripeConfig() {
    return { publishableKey: stripeKeys.publishableKey };
  }

  // Create Payment Intent
  @Post('payment-intent')
  async createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentDto) {
    const { amount, currency } = createPaymentIntentDto;
    const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency);
    return { clientSecret: paymentIntent.client_secret };
  }
}
