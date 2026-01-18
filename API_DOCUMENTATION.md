# Tailor Management API - NestJS

A comprehensive NestJS API for tailor management with user measurements tracking and Supabase phone number authentication.

## Features

✅ **Phone Number Authentication** - OTP-based authentication using Supabase  
✅ **Tailor Management** - Create and manage tailor profiles  
✅ **User Management** - Manage customer information  
✅ **Measurements Tracking** - Store and retrieve user measurements for each tailor  
✅ **Protected Routes** - JWT-based authorization with AuthGuard  

## Project Structure

```
src/
├── auth/                      # Authentication module
│   ├── auth.controller.ts     # Auth endpoints
│   ├── auth.service.ts        # Auth business logic
│   ├── auth.guard.ts          # JWT Guard
│   ├── auth.module.ts         # Auth module
│   └── dto/
│       └── send-otp.dto.ts    # OTP DTOs
│
├── tailor/                    # Tailor management module
│   ├── tailor.controller.ts   # Tailor endpoints
│   ├── tailor.service.ts      # Tailor business logic
│   ├── tailor.module.ts       # Tailor module
│   └── dto/
│       └── create-tailor.dto.ts
│
├── measurements/              # Measurements tracking module
│   ├── measurements.controller.ts
│   ├── measurements.service.ts
│   ├── measurements.module.ts
│   └── dto/
│       └── create-measurement.dto.ts
│
├── users/                     # User management module
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── dto/
│       └── create-user.dto.ts
│
├── common/
│   └── supabase.service.ts   # Supabase service
│
└── main.ts                    # Application entry point
```

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3000
NODE_ENV=development
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Supabase Tables

Run the following SQL in your Supabase database:

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

-- Create indexes
CREATE INDEX idx_measurements_tailor_id ON measurements(tailor_id);
CREATE INDEX idx_measurements_user_id ON measurements(user_id);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_tailors_phone ON tailors(phone_number);
```

### 4. Run the Application

```bash
npm run start

# or for development with auto-reload
npm run start:dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication Routes

#### Send OTP
```
POST /auth/send-otp
Content-Type: application/json

{
  "phoneNumber": "+91XXXXXXXXXX"
}

Response:
{
  "message": "OTP sent successfully",
  "data": {
    "phoneNumber": "+91XXXXXXXXXX"
  }
}
```

#### Verify OTP
```
POST /auth/verify-otp
Content-Type: application/json

{
  "phoneNumber": "+91XXXXXXXXXX",
  "otp": "123456"
}

Response:
{
  "message": "Authentication successful",
  "data": {
    "user": { ... },
    "session": { ... }
  }
}
```

#### Sign Out
```
POST /auth/sign-out
Authorization: Bearer <access_token>

Response:
{
  "message": "Signed out successfully"
}
```

### Tailor Routes (Protected)

#### Create Tailor Profile
```
POST /tailors/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "John Doe",
  "phoneNumber": "+91XXXXXXXXXX",
  "email": "john@example.com",
  "address": "123 Main St",
  "shopName": "John's Tailoring",
  "specialization": "suits"
}

Response:
{
  "message": "Tailor profile created successfully",
  "data": { ... }
}
```

#### Get Tailor Profile
```
GET /tailors/profile/:id
Authorization: Bearer <access_token>

Response: Tailor object
```

#### Update Tailor Profile
```
PUT /tailors/profile/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "shopName": "John's Premium Tailoring"
}

Response:
{
  "message": "Tailor profile updated successfully",
  "data": { ... }
}
```

#### Delete Tailor Profile
```
DELETE /tailors/profile/:id
Authorization: Bearer <access_token>

Response:
{
  "message": "Tailor profile deleted successfully"
}
```

#### Get All Tailors
```
GET /tailors
Authorization: Bearer <access_token>

Response: Array of tailors
```

#### Get Tailor Statistics
```
GET /tailors/stats/:id
Authorization: Bearer <access_token>

Response:
{
  "totalMeasurements": 15,
  "data": [ ... ]
}
```

### User Routes (Protected)

#### Create User
```
POST /users
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "phoneNumber": "+91XXXXXXXXXX",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "address": "456 Oak Ave"
}
```

#### Get User
```
GET /users/:id
Authorization: Bearer <access_token>
```

#### Update User
```
PUT /users/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "address": "789 Pine Rd"
}
```

#### Delete User
```
DELETE /users/:id
Authorization: Bearer <access_token>
```

#### Get All Users
```
GET /users
Authorization: Bearer <access_token>
```

### Measurements Routes (Protected)

#### Create Measurement
```
POST /measurements
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "userId": "user-uuid",
  "measurementType": "chest",
  "value": 42.5,
  "unit": "cm",
  "notes": "Standard measurement"
}

Response:
{
  "message": "Measurement created successfully",
  "data": { ... }
}
```

#### Get Measurement
```
GET /measurements/:id
Authorization: Bearer <access_token>
```

#### Get User Measurements
```
GET /measurements/user/:userId
Authorization: Bearer <access_token>

Response: Array of measurements for user
```

#### Get Tailor Measurements
```
GET /measurements/tailor/:tailorId
Authorization: Bearer <access_token>

Response: Array of measurements created by tailor
```

#### Update Measurement
```
PUT /measurements/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "value": 43.0,
  "notes": "Updated measurement"
}
```

#### Delete Measurement
```
DELETE /measurements/:id
Authorization: Bearer <access_token>
```

## Common Measurement Types

- `chest` - Chest circumference
- `waist` - Waist circumference
- `sleeve` - Sleeve length
- `length` - Total garment length
- `shoulder` - Shoulder width
- `hip` - Hip circumference
- `inseam` - Inseam length
- `neck` - Neck circumference

## Available Scripts

```bash
# Development
npm run start:dev

# Production build
npm run build

# Start production server
npm run start

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Format code
npm run format

# Lint code
npm run lint
```

## Dependencies

- `@nestjs/common` - NestJS core
- `@nestjs/config` - Configuration management
- `@supabase/supabase-js` - Supabase client
- `class-validator` - Input validation
- `class-transformer` - DTO transformation
- `@nestjs/platform-express` - Express adapter

## Authentication Flow

1. User sends phone number to `/auth/send-otp`
2. Supabase sends OTP to the phone number
3. User receives OTP and sends it to `/auth/verify-otp`
4. On success, Supabase returns `access_token` and `session`
5. Use `access_token` in `Authorization: Bearer <token>` header for protected routes
6. AuthGuard validates token on each protected route request

## Error Handling

All endpoints follow consistent error handling:

- `400 Bad Request` - Invalid input or operation failed
- `401 Unauthorized` - Missing or invalid authentication
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Notes

- All phone numbers should be in international format (e.g., +91XXXXXXXXXX)
- Measurements are stored with a default unit of 'cm' if not specified
- Each tailor can store measurements for multiple users
- AuthGuard protects all endpoints except `/auth/send-otp` and `/auth/verify-otp`

## Future Enhancements

- Add image uploads for measurements (before/after)
- Order management system
- Payment integration
- Rating and review system
- SMS/Email notifications
- Advanced analytics dashboard
