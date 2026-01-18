# Swagger Quick Start

## 🚀 Access Swagger Documentation

**URL**: http://localhost:3000/api

## Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm run start:dev

# 3. Open Swagger
# Visit: http://localhost:3000/api
```

## What's Available

✅ **Interactive API Explorer** - Test all 20+ endpoints  
✅ **Request/Response Examples** - See data structure  
✅ **Authentication Testing** - Try JWT authorization  
✅ **Auto-generated Docs** - Updates with code changes  

## 5-Minute Tutorial

### 1️⃣ Send OTP (Authenticate)
```
POST /auth/send-otp
Body: {"phoneNumber": "+919876543210"}
```

### 2️⃣ Verify OTP (Get Token)
```
POST /auth/verify-otp
Body: {"phoneNumber": "+919876543210", "otp": "123456"}
Copy: access_token from response
```

### 3️⃣ Authorize in Swagger
- Click "Authorize" button (top-right)
- Paste token
- Click "Authorize"

### 4️⃣ Test Endpoints
- All endpoints now work with token
- Click any endpoint
- Click "Try it out"
- See response

## Key Endpoints Documented

### 🔐 Authentication (No Auth)
- `POST /auth/send-otp` - Send OTP
- `POST /auth/verify-otp` - Verify & get token
- `POST /auth/sign-out` - Sign out

### 👨‍💼 Tailor (Protected)
- `POST /tailors/profile` - Create profile
- `GET /tailors` - List all
- `GET /tailors/profile/:id` - Get one
- `PUT /tailors/profile/:id` - Update
- `DELETE /tailors/profile/:id` - Delete

### 👥 Users (Protected)
- `POST /users` - Create user
- `GET /users` - List all
- `GET /users/:id` - Get one
- `PUT /users/:id` - Update
- `DELETE /users/:id` - Delete

### 📏 Measurements (Protected)
- `POST /measurements` - Create
- `GET /measurements/:id` - Get one
- `GET /measurements/user/:userId` - Get by user
- `GET /measurements/tailor/:tailorId` - Get by tailor
- `PUT /measurements/:id` - Update
- `DELETE /measurements/:id` - Delete

## Files Modified

✅ `src/main.ts` - Swagger configuration  
✅ `src/auth/auth.controller.ts` - Swagger decorators  
✅ `src/auth/dto/send-otp.dto.ts` - API property docs  
✅ `src/tailor/tailor.controller.ts` - Swagger decorators  
✅ `src/tailor/dto/create-tailor.dto.ts` - API property docs  
✅ `src/users/users.controller.ts` - Swagger decorators  
✅ `src/users/dto/create-user.dto.ts` - API property docs  
✅ `src/measurements/measurements.controller.ts` - Swagger decorators  
✅ `src/measurements/dto/create-measurement.dto.ts` - API property docs  

## New Dependencies

```
@nestjs/swagger@^7.0.0
swagger-ui-express@^5.0.0
```

## Documentation

- **SWAGGER_DOCUMENTATION.md** - Complete Swagger guide
- **API_DOCUMENTATION.md** - Manual API reference
- **QUICK_REFERENCE.md** - Command reference

---

**Status**: ✅ Ready to use  
**Build**: ✅ No errors  
**Swagger UI**: http://localhost:3000/api
