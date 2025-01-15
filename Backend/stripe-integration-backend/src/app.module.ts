import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from './controllers/stripe.controller';
import { PaymentsController } from './controllers/payments.controller';
import { StripeService } from './services/stripe.service';
import { StripeConfigService } from './config/stripe.config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentsController, StripeController],
  providers: [StripeService, StripeConfigService],
})
export class AppModule {}
