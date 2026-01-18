# Getting Started with Tailor Management API

## Quick Start Guide

### Step 1: Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Supabase account (free tier available at https://supabase.com)

### Step 2: Clone and Install

```bash
cd /workspaces/cuddly-couscous
npm install
```

### Step 3: Supabase Setup

1. Create a free account on https://supabase.com
2. Create a new project
3. Go to **Project Settings → API**
4. Copy your:
   - Project URL
   - anon public key (SUPABASE_ANON_KEY)
   - service_role secret key (SUPABASE_SERVICE_ROLE_KEY)

### Step 4: Environment Configuration

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
PORT=3000
NODE_ENV=development
```

### Step 5: Create Database Tables

1. Go to your Supabase project dashboard
2. Click on **SQL Editor**
3. Click **New Query**
4. Paste the following SQL and execute it:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tailors table
CREATE TABLE tailors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  address TEXT,
  shop_name VARCHAR(255),
  specialization VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Measurements table
CREATE TABLE measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tailor_id UUID NOT NULL REFERENCES tailors(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  measurement_type VARCHAR(255) NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50) DEFAULT 'cm',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_measurements_tailor_id ON measurements(tailor_id);
CREATE INDEX idx_measurements_user_id ON measurements(user_id);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_tailors_phone ON tailors(phone_number);
```

### Step 6: Enable Phone Authentication in Supabase

1. Go to your Supabase project dashboard
2. Click on **Authentication** in the left sidebar
3. Click **Providers**
4. Find **Phone** and click to enable it
5. Configure your phone provider (Twilio is recommended for free tier)
6. Save the configuration

### Step 7: Run the Application

```bash
# Development mode with auto-reload
npm run start:dev

# Production mode
npm run build
npm run start
```

The API will be available at `http://localhost:3000`

### Step 8: Test the API

#### Option A: Using Postman
1. Import the `Tailor-Management-API.postman_collection.json` file in Postman
2. Set the environment variables in Postman (base_url, phone_number, etc.)
3. Start with the "Send OTP" endpoint

#### Option B: Using cURL

```bash
# Send OTP
curl -X POST http://localhost:3000/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+919876543210"}'

# Response:
# {
#   "message": "OTP sent successfully",
#   "data": { "phoneNumber": "+919876543210" }
# }
```

## Testing Workflow

1. **Send OTP**: POST /auth/send-otp
   - Check your phone/Supabase console for the OTP

2. **Verify OTP**: POST /auth/verify-otp
   - Copy the access_token from response
   - Use it for subsequent requests

3. **Create Tailor Profile**: POST /tailors/profile
   - This creates your tailor account

4. **Create User**: POST /users
   - Add customer information

5. **Create Measurements**: POST /measurements
   - Store measurements for customers

## Project Structure

```
src/
├── auth/              # Authentication endpoints
├── tailor/            # Tailor management
├── users/             # User/customer management
├── measurements/      # Measurement storage
├── common/            # Shared services
└── main.ts           # Application entry point
```

## Key Features

✅ **Phone Number Authentication** - OTP-based using Supabase  
✅ **Tailor Management** - Complete profile management  
✅ **User Management** - Customer information storage  
✅ **Measurements Tracking** - Store unlimited measurements per customer  
✅ **Authorization Guards** - Protect endpoints with JWT tokens  

## Common Issues

### Issue: "Supabase configuration is missing"
**Solution**: Check your `.env` file has correct SUPABASE_URL and SUPABASE_ANON_KEY

### Issue: "OTP not received"
**Solution**: 
- Ensure phone authentication is enabled in Supabase
- Check phone number format (should include country code, e.g., +919876543210)
- Check Supabase logs for any errors

### Issue: "401 Unauthorized" on protected endpoints
**Solution**:
- Ensure you're sending the access_token in Authorization header
- Format: `Authorization: Bearer <your_access_token>`
- Check if token has expired

## Database Schema

### users
- `id` - UUID primary key
- `phone_number` - Unique phone number
- `name` - Customer name
- `email` - Email address
- `address` - Physical address

### tailors
- `id` - UUID primary key
- `name` - Tailor name
- `phone_number` - Unique phone number
- `email` - Email address
- `address` - Shop address
- `shop_name` - Business name
- `specialization` - Specialty (e.g., "suits", "dresses")

### measurements
- `id` - UUID primary key
- `tailor_id` - Reference to tailor
- `user_id` - Reference to user/customer
- `measurement_type` - Type of measurement
- `value` - Numeric value
- `unit` - Unit of measurement (cm, inches)
- `notes` - Additional notes

## Next Steps

1. Customize DTOs and services as per your needs
2. Add image upload functionality
3. Implement order management
4. Add payment integration
5. Create admin dashboard

For more details, see `API_DOCUMENTATION.md`
