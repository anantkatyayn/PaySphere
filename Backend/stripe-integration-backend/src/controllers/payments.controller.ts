import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import * as QRCode from 'qrcode';

let stripeKeys = {
  publishableKey: '',
  secretKey: '',
};

@Controller('payments')
export class PaymentsController {
  /**
   * Save Stripe Configuration
   */
  @Post('stripe/config')
  saveStripeConfig(@Body() body: { publishableKey: string; secretKey: string }) {
    const { publishableKey, secretKey } = body;

    // Save the configuration
    stripeKeys.publishableKey = publishableKey;
    stripeKeys.secretKey = secretKey;

    return { message: 'Stripe configuration saved successfully' };
  }

  /**
   * Get Stripe Publishable Key
   */
  @Get('stripe/config')
  getStripeConfig() {
    return { publishableKey: stripeKeys.publishableKey };
  }

  /**
   * Generate UPI QR Code
   */
  @Post('upi')
  async generateUPIQrCode(
    @Body() body: { amount: number },
    @Res() res: Response,
  ) {
    const { amount } = body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ error: 'Invalid input. Please provide a valid amount.' });
    }

    try {
      // Fetch the UPI ID from the .env file
      const merchantUPIId = process.env.MERCHANT_UPI_ID;

      if (!merchantUPIId) {
        return res.status(500).json({ error: 'Merchant UPI ID is not configured.' });
      }

      // Generate UPI payment string
      const upiData = `upi://pay?pa=${merchantUPIId}&pn=Merchant&am=${amount}&cu=INR`;

      // Generate QR code as a Base64 string
      const qrCode = await QRCode.toDataURL(upiData);

      // Return the generated QR code
      return res.status(200).json({ qrCode });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to generate UPI QR code.' });
    }
  }

  /**
   * Create Stripe Payment Intent
   */
  @Post('stripe/payment-intent')
  async createPaymentIntent(
    @Body() body: { amount: number; currency: string },
    @Res() res: Response,
  ) {
    const { amount, currency } = body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount. Please provide a valid amount.' });
    }

    try {
      // Use your Stripe secret key
      const stripe = require('stripe')(stripeKeys.secretKey || process.env.STRIPE_SECRET_KEY);

      // Create a Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Smallest currency unit
        currency,
        payment_method_types: ['card'],
      });

      // Return the client secret to the frontend
      return res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create payment intent.' });
    }
  }
}
