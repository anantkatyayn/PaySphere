
# PaySphere

PaySphere is a modern, multi-mode payment module designed to simplify payment integrations for developers. It supports **Stripe card payments** and **UPI QR code payments**, offering flexibility and ease of use with pre-built components and APIs. Built with **React (Vite)** and **NestJS**, it provides a scalable and secure solution for payment processing.

---

## Features

- **Multi-Mode Payments**:
  - Stripe card payments with secure form handling.
  - UPI QR code generation for instant payments.
- **Dynamic Payment Configuration**:
  - Set custom payment amounts for each transaction.
- **Pre-Built UI Components**:
  - Responsive and clean interfaces for configuration and payments.
- **Developer-Friendly APIs**:
  - Ready-to-use endpoints for backend integrations.

---

## Tech Stack

- **Frontend**:
  - React (Vite)
  - Tailwind CSS
- **Backend**:
  - NestJS
  - Stripe API
  - QR Code generation (for UPI)

---

## Installation

### Prerequisites
- **Node.js** (v16+)
- **NPM** or **Yarn**
- A **Stripe Account** for API keys

### Clone the Repository
```bash
git clone https://github.com/anantkatyayn/PaySphere.git
cd PaySphere
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend/stripe-integration-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend root and add the following:
   ```env
   STRIPE_SECRET_KEY=your-stripe-secret-key
   MERCHANT_UPI_ID=your@upiid
   ```
4. Start the backend server:
   ```bash
   npm run start:dev
   ```
   The backend will be available at `http://localhost:3000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd stripe-integration-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend root and add:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## Usage

### Configuration Page
1. Navigate to `/config` in your browser.
2. Enter your Stripe **Publishable Key** and **Secret Key**.
3. Save the configuration to start processing payments.

### Payment Page
1. Navigate to `/payment`.
2. Enter the amount and select a payment mode (Card/UPI).
3. Complete the payment:
   - For card payments, use test credentials provided by Stripe:
     - **Card Number**: `4242 4242 4242 4242`
     - **Expiry Date**: Any valid future date
     - **CVC**: Any 3-digit number
   - For UPI payments, scan the generated QR code.

---

## API Endpoints

### Backend (Base URL: `http://localhost:3000`)
- **POST `/stripe/config`**:
  - Save Stripe configuration keys.
- **GET `/stripe/config`**:
  - Retrieve saved Stripe publishable key.
- **POST `/stripe/payment-intent`**:
  - Create a Stripe payment intent.
- **POST `/payments/upi`**:
  - Generate a UPI QR code for a given amount.

---

## Screenshots

### Home Page
![Welcome Page](https://github.com/anantkatyayn/PaySphere/blob/main/assets/welcomePage.png)

### Configuration Page
![Configuration Page](https://github.com/anantkatyayn/PaySphere/blob/main/assets/ConfigPage.png)

### Payment Page
![Payment Page](https://github.com/anantkatyayn/PaySphere/blob/main/assets/paymentPage.png)

---

## Roadmap

- Add support for additional payment gateways like PayPal.
- Implement webhook-based payment status updates.
- Extend support for recurring payments and subscriptions.

---

## Acknowledgements

- [Stripe API Documentation](https://stripe.com/docs/api)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NestJS Documentation](https://docs.nestjs.com)

---

Feel free to reach out if you encounter any issues or need assistance!
