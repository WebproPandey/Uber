
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

- **Firstname**: Must be at least 3 characters long.
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
