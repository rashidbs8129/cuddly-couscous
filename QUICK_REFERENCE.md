# Quick Reference Guide

## 🚀 Start the Server

```bash
cd /workspaces/cuddly-couscous
npm install
npm run start:dev
```

## 🔑 Get Access Token

```bash
# Step 1: Send OTP
curl -X POST http://localhost:3000/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+919876543210"}'

# Step 2: Verify OTP (check console/logs for OTP)
curl -X POST http://localhost:3000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+919876543210", "otp": "000000"}'

# Response includes: access_token, user object, session
```

## 📌 API Endpoints Quick List

### Authentication (No Auth Required)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /auth/send-otp | Send OTP to phone |
| POST | /auth/verify-otp | Verify OTP and get token |

### Tailor (Auth Required)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /tailors/profile | Create tailor account |
| GET | /tailors/profile/:id | Get tailor details |
| PUT | /tailors/profile/:id | Update tailor info |
| DELETE | /tailors/profile/:id | Delete tailor |
| GET | /tailors | List all tailors |
| GET | /tailors/stats/:id | Get tailor stats |

### Users (Auth Required)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /users | Create customer |
| GET | /users/:id | Get customer |
| PUT | /users/:id | Update customer |
| DELETE | /users/:id | Delete customer |
| GET | /users | List all customers |

### Measurements (Auth Required)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /measurements | Add measurement |
| GET | /measurements/:id | Get measurement |
| GET | /measurements/user/:userId | Get customer measurements |
| GET | /measurements/tailor/:tailorId | Get tailor's measurements |
| PUT | /measurements/:id | Update measurement |
| DELETE | /measurements/:id | Delete measurement |

## 📝 Example API Calls

### 1. Create Tailor Profile
```bash
curl -X POST http://localhost:3000/tailors/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phoneNumber": "+919876543210",
    "email": "john@example.com",
    "address": "123 Main St",
    "shopName": "John's Tailoring",
    "specialization": "suits"
  }'
```

### 2. Create Customer
```bash
curl -X POST http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+919876543211",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "address": "456 Oak Ave"
  }'
```

### 3. Add Measurement
```bash
curl -X POST http://localhost:3000/measurements \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_UUID",
    "measurementType": "chest",
    "value": 42.5,
    "unit": "cm",
    "notes": "Standard fit"
  }'
```

### 4. Get Customer Measurements
```bash
curl -X GET http://localhost:3000/measurements/user/USER_UUID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🛠️ Environment Setup

### 1. Create .env file
```bash
cp .env.example .env
```

### 2. Update .env with your Supabase credentials
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
PORT=3000
NODE_ENV=development
```

### 3. Create Supabase Tables
Run SQL in Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
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
  created_at TIMESTAMP DEFAULT NOW()
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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_measurements_tailor_id ON measurements(tailor_id);
CREATE INDEX idx_measurements_user_id ON measurements(user_id);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_tailors_phone ON tailors(phone_number);
```

## 📊 Request/Response Examples

### Send OTP
**Request:**
```json
POST /auth/send-otp
Content-Type: application/json

{
  "phoneNumber": "+919876543210"
}
```

**Response:**
```json
{
  "message": "OTP sent successfully",
  "data": {
    "phoneNumber": "+919876543210"
  }
}
```

### Verify OTP
**Request:**
```json
POST /auth/verify-otp
Content-Type: application/json

{
  "phoneNumber": "+919876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "message": "Authentication successful",
  "data": {
    "user": {
      "id": "user-uuid",
      "phone": "+919876543210",
      ...
    },
    "session": {
      "access_token": "eyJhbGciOiJIUzI1NiIs...",
      "token_type": "bearer",
      "expires_in": 3600,
      ...
    }
  }
}
```

## ⚠️ Common Headers

All protected endpoints require:
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| "OTP not received" | Check Supabase SMS provider setup |
| "401 Unauthorized" | Verify access token in Authorization header |
| "Tailor not found" | Use correct tailor UUID from response |
| "User not found" | Use correct user UUID from response |
| "Measurement type invalid" | Use valid types like "chest", "waist", etc. |

## 📚 Documentation Files

- `API_DOCUMENTATION.md` - Complete API reference
- `SETUP.md` - Detailed setup guide
- `IMPLEMENTATION_SUMMARY.md` - Project overview
- `Tailor-Management-API.postman_collection.json` - Postman collection

## 🎯 Development Commands

```bash
# Install dependencies
npm install

# Development mode
npm run start:dev

# Build production
npm run build

# Run production server
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

## 📱 Postman Setup

1. Import `Tailor-Management-API.postman_collection.json`
2. Set environment variables:
   - `base_url`: http://localhost:3000
   - `access_token`: <your_token>
   - `phone_number`: +919876543210
   - `tailor_id`: <tailor_uuid>
   - `user_id`: <user_uuid>
   - `measurement_id`: <measurement_uuid>
3. Execute requests in order

## 💡 Tips

- Always use international phone format: +countrycodenumber
- Save access_token after login for subsequent requests
- Keep track of UUIDs (tailor_id, user_id) for API calls
- Use Postman collection for easy testing
- Check Supabase dashboard for data verification
- Default measurement unit is 'cm'

---

Need help? Check the documentation files or review the API endpoints section above.
