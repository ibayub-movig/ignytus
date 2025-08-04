# Simple Stripe Payment Setup

## Overview
This is a simplified payment flow using Stripe's hosted checkout page. No complex webhooks or server-side Stripe integration needed.

## How It Works
1. User fills out job finder form
2. Form data saved to `job_finder_requests` table with `paid = false`
3. User redirected to Stripe hosted checkout page
4. User pays on Stripe's secure page
5. You manually check Stripe dashboard + database to see who paid
6. Send job leads manually to paying customers

## Setup Steps

### 1. Create Stripe Hosted Checkout Page
1. Go to Stripe Dashboard → Payment Links
2. Create a new payment link:
   - **Product name**: Job Finder Service
   - **Price**: $29.00 USD
   - **Success URL**: `https://yourdomain.com/tools/job-finder?success=true`
   - **Cancel URL**: `https://yourdomain.com/tools/job-finder?canceled=true`
3. Copy the payment link URL (starts with `https://buy.stripe.com/...`)

### 2. Update the Code
Replace the Stripe URL in `app/tools/job-finder/page.tsx`:
```typescript
const stripeUrl = `YOUR_STRIPE_PAYMENT_LINK_HERE?prefilled_email=${encodeURIComponent(form.email)}`;
```

### 3. Database Setup
Run the migration to create the table:
```bash
supabase db push
```

## Manual Process
1. **Check Stripe Dashboard** daily for new payments
2. **Query database** for requests with matching emails:
   ```sql
   SELECT * FROM job_finder_requests 
   WHERE email IN ('customer1@email.com', 'customer2@email.com')
   AND paid = false;
   ```
3. **Mark as paid** in database:
   ```sql
   UPDATE job_finder_requests 
   SET paid = true 
   WHERE email = 'customer@email.com';
   ```
4. **Send job leads** manually to paying customers

## Benefits
- ✅ **Super simple** - No complex API needed
- ✅ **Secure** - Stripe handles all payment security
- ✅ **Manual control** - You decide who gets job leads
- ✅ **Easy to manage** - Just check Stripe dashboard + database

## Testing
- Use Stripe test mode for development
- Test with card number: `4242 4242 4242 4242`
- Switch to live mode for production 