
# Backend API Documentation

## Endpoint: `/users/register`

### Description
Registers a new user by creating a user account with the provided information.

---

### HTTP Method
`POST`

---

### Request Body
The request body should be in JSON format and include the following fields:

| Field        | Type   | Required | Description                                   |
|--------------|--------|----------|-----------------------------------------------|
| fullname     | object | Yes      | Contains user's first and last name.          |
| ├── firstname | string | Yes      | User's first name (minimum 3 characters).     |
| └── lastname  | string | No       | User's last name (minimum 3 characters).      |
| email        | string | Yes      | User's email address (must be a valid email). |
| password     | string | Yes      | User's password (minimum 6 characters).       |

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

### Response

| Field        | Type   | Description                                   |
|--------------|--------|-----------------------------------------------|
| user         | object | Contains registered user details.             |
| ├── fullname | object | Full name of the user.                        |
| │   ├── firstname | string | User's first name.                     |
| │   └── lastname  | string | User's last name.                      |
| ├── email    | string | User's email address.                        |
| └── password | string | User's hashed password.                      |
| token        | string | Generated JWT token for the user.             |

Example:
```json
{
  "message": "User registered successfully",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$abcdef1234567890hashedpassword"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

---

### Validation Rules

- Firstname**: Must be at least 3 characters long.
- **Lastname**: Optional but must be at least 3 characters if provided.
- **Email**: Must be a valid email format.
- **Password**: Must be at least 6 characters long.

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 201  | User registered successfully.        |
| 400  | Validation error in request payload. |
| 500  | Internal server error.               |

---

### Notes

- Ensure the `Content-Type` is set to `application/json` in the request headers.
- JWT Token should be securely stored on the client side for authentication in subsequent requests.


## Endpoint: `/users/login`

### Description
Authenticates a user by verifying the provided email and password, and returns a JWT token upon successful login.

---

### HTTP Method
`POST`

---

### Request Body
The request body should be in JSON format and include the following fields:

| Field    | Type   | Required | Description                                   |
|----------|--------|----------|-----------------------------------------------|
| email    | string | Yes      | User's email address (must be a registered email). |
| password | string | Yes      | User's password (must match the registered password). |

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

### Response

| Field   | Type   | Description                                   |
|---------|--------|-----------------------------------------------|
| message | string | Message indicating successful login.          |
| token   | string | Generated JWT token for the user.             |

Example:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

---

### Validation Rules

- **Email**: Must be a valid and registered email address.
- **Password**: Must match the password stored in the database.

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 200  | Login successful.                    |
| 400  | Validation error in request payload. |
| 401  | Invalid email or password.           |
| 500  | Internal server error.               |

---

### Notes

- Ensure the `Content-Type` is set to `application/json` in the request headers.
- JWT Token should be securely stored on the client side for authentication in subsequent requests.



## Endpoint: `/users/profile`

### Description
Fetches the authenticated user's profile information. The user must be logged in and provide a valid JWT token for authorization.

---

### HTTP Method
`GET`

---

### **Authentication
Requires the `Authorization` header with a valid JWT token or a cookie with the `token`.

---

### Response

| Field        | Type   | Description                                    |
|--------------|--------|------------------------------------------------|
| id           | string | User's unique ID.                             |
| fullname     | object | Full name of the user.                        |
| ├── firstname | string | User's first name.                          |
| └── lastname  | string | User's last name.                           |
| email        | string | User's email address.                         |

Example Response:
```json
{
  "id": "62fc3bcbdc5a3e0015f4d7a3",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

### Validation Rules
- JWT Token: Must be provided and valid.
- Authorization: Only accessible to logged-in users.

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 200  | Profile fetched successfully.        |
| 401  | Unauthorized, token missing or invalid. |
| 500  | Internal server error.               |

---

### Notes
- Ensure `authMiddleware.authUser` is correctly applied to validate the token.
- The token should not be blacklisted.

---

## Endpoint: `/users/logout`

### Description
Logs the user out by blacklisting the token, preventing further use of the same token.

---

### HTTP Method
`GET`

---

### Authentication
Requires the `Authorization` header with a valid JWT token or a cookie with the `token`.

---

### Response

| Field   | Type   | Description                                    |
|---------|--------|------------------------------------------------|
| message | string | Message indicating successful logout.          |

Example Response:
```json
{
  "message": "Logout successful"
}
```

---

### Validation Rules
- JWT Token: Must be provided and valid.
- Authorization: Only accessible to logged-in users.

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 200  | Logout successful.                   |
| 401  | Unauthorized, token missing or invalid. |
| 500  | Internal server error.               |

---

### Notes
- Token Blacklisting: The token will be stored in the `BlacklistToken` schema with a TTL (time-to-live) of 24 hours.
- Cookie Clearing: Optionally, clear the token cookie for client-side logout.

---

### Example Workflow

#### Profile Request:
1. Request:
   - `GET /users/profile`
   - Headers: `{ Authorization: "Bearer <your_token>" }`
2. Response:
   ```json
   {
     "id": "62fc3bcbdc5a3e0015f4d7a3",
     "fullname": {
       "firstname": "John",
       "lastname": "Doe"
     },
     "email": "john.doe@example.com"
   }
   ```

#### Logout Request:
1. Request:
   - `GET /users/logout`
   - Headers: `{ Authorization: "Bearer <your_token>" }`
2. Response:
   ```json
   {
     "message": "Logout successful"
   }
   ```



# Captain Registration API Documentation

This document outlines the `Captain Registration API` endpoint, including the request and response format, validation rules, and example usage.

---

## Endpoint: `/captains/register`

### Description
Registers a new captain by creating an account with the provided user and vehicle details.

---

### HTTP Method
`POST`

---

### Request Body
The request body should be in JSON format and include the following fields:

#### User Details
| Field          | Type    | Required | Description                                      |
|----------------|---------|----------|--------------------------------------------------|
| fullname       | object  | Yes      | Contains the captain's first and last name.     |
| ├── firstname  | string  | Yes      | Captain's first name (minimum 4 characters).    |
| └── lastname   | string  | No       | Captain's last name (optional).                 |
| email          | string  | Yes      | Captain's email address (must be a valid email).|
| password       | string  | Yes      | Captain's password (minimum 8 characters).      |

#### Vehicle Details
| Field            | Type    | Required | Description                                     |
|------------------|---------|----------|-------------------------------------------------|
| vehicle          | object  | Yes      | Contains details about the captain's vehicle.   |
| ├── color        | string  | Yes      | Vehicle color (must be one of: red, blue, green, yellow). |
| ├── plate        | string  | Yes      | Vehicle plate number (required).               |
| ├── capacity     | integer | Yes      | Vehicle capacity (must be at least 1).         |
| └── vehicleType  | string  | Yes      | Vehicle type (must be one of: motorcycle, car, auto3). |

#### Example Request:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "blue",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### Response

| Field            | Type    | Description                                     |
|------------------|---------|-------------------------------------------------|
| message          | string  | Success message.                               |
| captain          | object  | Contains the registered captain's details.     |
| ├── fullname     | object  | Captain's full name.                           |
| │   ├── firstname| string  | Captain's first name.                          |
| │   └── lastname | string  | Captain's last name.                           |
| ├── email        | string  | Captain's email address.                       |
| ├── password     | string  | Captain's hashed password.                     |
| └── vehicle      | object  | Contains the captain's vehicle details.        |

#### Example Response:
```json
{
  "message": "Captain registered successfully",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$abcdef1234567890hashedpassword",
    "vehicle": {
      "color": "blue",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

### Validation Rules

#### User Details:
- **Firstname**: Must be a string with a minimum length of 4 characters.
- **Lastname**: Optional but must be a string if provided.
- **Email**: Must be in a valid email format.
- **Password**: Must be a string with a minimum length of 8 characters.

#### Vehicle Details:
- **Color**: Must be one of: `red`, `blue`, `green`, `yellow`.
- **Plate**: Must be a non-empty string.
- **Capacity**: Must be an integer greater than or equal to 1.
- **Vehicle Type**: Must be one of: `motorcycle`, `car`, `auto3`.

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 201  | Captain registered successfully.     |
| 400  | Validation error in request payload. |
| 500  | Internal server error.               |

---

### Notes
- Make sure the `Content-Type` header is set to `application/json`.
- Store passwords securely using hashing (e.g., bcrypt).
- Use JWT for secure authentication in subsequent requests.



## Endpoint: `/captains/login`

### Description
Logs in a registered captain and returns an authentication token.

---

### HTTP Method
`POST`

---

### Request Body
The request body should be in JSON format and include the following fields:

#### Fields
| Field     | Type    | Required | Description                          |
|-----------|---------|----------|--------------------------------------|
| email     | string  | Yes      | Captain's registered email address.  |
| password  | string  | Yes      | Captain's password.                  |

#### Example Request:
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

### Response

| Field            | Type    | Description                               |
|------------------|---------|-------------------------------------------|
| message          | string  | Success message.                         |
| token            | string  | JWT token for authentication.            |

#### Example Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 200  | Login successful.                    |
| 400  | Validation error in request payload. |
| 401  | Invalid credentials.                 |
| 500  | Internal server error.               |

---

## Endpoint: `/captains/logout`

### Description
Logs out the currently authenticated captain.

---

### HTTP Method
`POST`

---

### Headers

| Field           | Type   | Required | Description                      |
|-----------------|--------|----------|----------------------------------|
| Authorization   | string | Yes      | Bearer token for authentication. |

#### Example Request:
```http
POST /captains/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Response

| Field     | Type    | Description                 |
|-----------|---------|-----------------------------|
| message   | string  | Success message.           |

#### Example Response:
```json
{
  "message": "Logout successful"
}
```

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 200  | Logout successful.                   |
| 401  | Unauthorized (invalid or expired token). |
| 500  | Internal server error.               |

---

## Endpoint: `/captains/profile`

### Description
Fetches the profile details of the currently authenticated captain.

---

### HTTP Method
`GET`

---

### Headers

| Field           | Type   | Required | Description                      |
|-----------------|--------|----------|----------------------------------|
| Authorization   | string | Yes      | Bearer token for authentication. |

#### Example Request:
```http
GET /captains/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Response

| Field            | Type    | Description                               |
|------------------|---------|-------------------------------------------|
| message          | string  | Success message.                         |
| captain          | object  | Contains the captain's profile details.  |
| ├─ fullname     | object  | Captain's full name.                     |
| │   ├─ firstname| string  | Captain's first name.                    |
| │   └─ lastname | string  | Captain's last name.                     |
| ├─ email        | string  | Captain's email address.                 |
| └─ vehicle      | object  | Captain's vehicle details.               |

#### Example Response:
```json
{
  "message": "Profile fetched successfully",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "blue",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

### Summary of Routes

| Method | Endpoint              | Description                   |
|--------|-----------------------|-------------------------------|
| POST   | `/captains/register`  | Registers a new captain.      |
| POST   | `/captains/login`     | Logs in a captain.            |
| POST   | `/captains/logout`    | Logs out the authenticated captain. |
| GET    | `/captains/profile`   | Fetches captain's profile.    |

---

### General Notes:
1. Use secure password hashing (e.g., `bcrypt`) for storing passwords.
2. Ensure JWT tokens are securely generated and validated.
3. Protect routes by verifying the token in the `Authorization` header.

