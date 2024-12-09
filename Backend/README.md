
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


