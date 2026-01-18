# Swagger API Documentation Setup

## Overview

Swagger documentation has been fully integrated into the Tailor Management API. The interactive API documentation is automatically generated from the code and is accessible via the Swagger UI.

## Accessing Swagger Documentation

Once the application is running:

```
http://localhost:3000/api
```

## Features Included

✅ **Interactive API Documentation** - Test all endpoints directly from the browser  
✅ **Request/Response Schemas** - Visual representation of all DTOs  
✅ **JWT Authentication** - Built-in authentication testing  
✅ **Complete API Reference** - All endpoints documented with descriptions  
✅ **Auto-generated Documentation** - Updated automatically with code changes  

## Starting the Server with Swagger

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start
```

The server will display:
```
Application is running on: http://localhost:3000
Swagger documentation: http://localhost:3000/api
```

## Swagger Features Implemented

### 1. API Tags
All endpoints are organized by tags:
- **Authentication** - OTP and login endpoints
- **Tailor** - Tailor profile management
- **Users** - Customer management
- **Measurements** - Measurement tracking

### 2. Bearer Token Authentication
- Click the "Authorize" button in Swagger UI
- Paste your JWT token from `/auth/verify-otp`
- All protected endpoints will automatically include the token

### 3. Request/Response Examples
Each endpoint includes:
- Operation summary
- Detailed description
- Example request payloads
- Example response schemas
- HTTP status codes with descriptions
- Error responses

### 4. Parameter Documentation
All parameters are documented with:
- Parameter name and type
- Description and examples
- Required vs optional fields
- Validation rules

## Testing Endpoints in Swagger

### Step 1: Authenticate
1. Scroll to the **Authentication** section
2. Click **POST /auth/send-otp**
3. Click "Try it out"
4. Enter your phone number: `+919876543210`
5. Click "Execute"
6. Check your SMS for OTP

### Step 2: Verify OTP
1. Click **POST /auth/verify-otp**
2. Click "Try it out"
3. Enter phone number and OTP (use `123456` for testing)
4. Copy the `access_token` from the response

### Step 3: Authorize
1. Click the "Authorize" button (top-right)
2. Paste the access token in the field
3. Click "Authorize"

### Step 4: Test Protected Endpoints
1. Click any endpoint under **Tailor**, **Users**, or **Measurements**
2. Click "Try it out"
3. Enter the required parameters
4. Click "Execute"
5. The token is automatically included

## Swagger Configuration

The Swagger setup is configured in `src/main.ts`:

```typescript
const config = new DocumentBuilder()
  .setTitle('Tailor Management API')
  .setDescription('...')
  .setVersion('1.0.0')
  .addTag('Authentication', 'Phone OTP based authentication')
  .addTag('Tailor', 'Tailor profile management')
  .addTag('Users', 'Customer/User management')
  .addTag('Measurements', 'Measurement tracking')
  .addBearerAuth(...)
  .build();

SwaggerModule.setup('api', app, document, {...});
```

## API Documentation Structure

### Controllers with Swagger Decorators
- `@ApiTags()` - Organize endpoints by category
- `@ApiOperation()` - Describe what the endpoint does
- `@ApiResponse()` - Document success and error responses
- `@ApiParam()` - Describe URL parameters
- `@ApiBearerAuth()` - Indicate authentication required

### DTOs with Swagger Properties
- `@ApiProperty()` - Document each field
- Examples for all properties
- Description of field purpose
- Required vs optional marking

## Example Endpoints Documentation

### Authentication Endpoints

#### POST /auth/send-otp
- **Summary**: Send OTP to phone number
- **Parameters**: 
  - `phoneNumber` (string, required) - Phone in international format
- **Response** (200): 
  ```json
  {
    "message": "OTP sent successfully",
    "data": { "phoneNumber": "+919876543210" }
  }
  ```

#### POST /auth/verify-otp
- **Summary**: Verify OTP and get access token
- **Parameters**:
  - `phoneNumber` (string, required)
  - `otp` (string, required) - 6-digit OTP
- **Response** (200):
  ```json
  {
    "message": "Authentication successful",
    "data": {
      "user": { "id": "...", "phone": "..." },
      "session": { "access_token": "...", "expires_in": 3600 }
    }
  }
  ```

### Tailor Endpoints (Protected)

#### POST /tailors/profile
- **Summary**: Create tailor profile
- **Auth**: Required (Bearer token)
- **Body**: CreateTailorDto
  ```json
  {
    "name": "John Doe",
    "phoneNumber": "+919876543210",
    "email": "john@example.com",
    "address": "123 Main St",
    "shopName": "John's Tailoring",
    "specialization": "suits"
  }
  ```

#### GET /tailors/profile/:id
- **Summary**: Get tailor profile
- **Auth**: Required
- **Parameters**: `id` (UUID)
- **Response**: Tailor object

### User Endpoints (Protected)

#### POST /users
- **Summary**: Create user/customer
- **Auth**: Required
- **Body**: CreateUserDto

#### GET /users/:id
- **Summary**: Get user details
- **Auth**: Required
- **Parameters**: `id` (UUID)

### Measurements Endpoints (Protected)

#### POST /measurements
- **Summary**: Create measurement
- **Auth**: Required
- **Body**: CreateMeasurementDto

#### GET /measurements/user/:userId
- **Summary**: Get all measurements for a user
- **Auth**: Required
- **Parameters**: `userId` (UUID)

## Troubleshooting

### Issue: Swagger UI not loading
**Solution**: Ensure the application is running and visit `http://localhost:3000/api`

### Issue: "Unauthorized" errors in Swagger
**Solution**: 
1. Get a valid JWT token from `/auth/verify-otp`
2. Click the "Authorize" button
3. Enter: `Bearer <your_token>`

### Issue: Models not showing
**Solution**: Ensure all DTOs are properly exported and imported in controllers

## API Documentation Files

- **Swagger UI**: http://localhost:3000/api
- **OpenAPI JSON**: http://localhost:3000/api-json
- **API_DOCUMENTATION.md** - Manual documentation
- **QUICK_REFERENCE.md** - Quick command reference

## Integration with Tools

### Postman
1. Go to Swagger UI: http://localhost:3000/api
2. Click "Download OpenAPI specification"
3. Import into Postman

### Other Tools
- Insomnia
- Thunder Client
- VS Code REST Client
- Any OpenAPI-compatible tool

## Next Steps

1. **Run the server**: `npm run start:dev`
2. **Open Swagger**: http://localhost:3000/api
3. **Authenticate**: Use `/auth/send-otp` and `/auth/verify-otp`
4. **Explore**: Click on endpoints to see full documentation
5. **Test**: Use "Try it out" to test endpoints interactively

## Dependencies

```json
{
  "@nestjs/swagger": "^7.0.0",
  "swagger-ui-express": "^5.0.0"
}
```

## Best Practices

1. **Update DTOs**: Always add `@ApiProperty()` decorators when adding new fields
2. **Document Endpoints**: Add `@ApiOperation()` and `@ApiResponse()` to all endpoints
3. **Test in Swagger**: Use the Swagger UI to test before deploying
4. **Keep Examples Updated**: Ensure example values match your system
5. **Review Documentation**: Check Swagger UI regularly to ensure accuracy

---

**Swagger Documentation is now fully integrated and ready to use!** 🎉

Access it at: **http://localhost:3000/api**
