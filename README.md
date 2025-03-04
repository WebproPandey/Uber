# Backend API Documentation

## Overview
This document provides details about the backend API endpoints, including request and response formats, validation rules, and status codes.

---

## Users API

### Endpoint: `/users/register`

#### Description
Registers a new user by creating a user account with the provided information.

#### HTTP Method
`POST`

#### Request Body
The request body should be in JSON format and include the following fields:

| Field        | Type   | Required | Description                                   |
|--------------|--------|----------|-----------------------------------------------|
| fullname     | object | Yes      | Contains user's first and last name.          |
| ├── firstname | string | Yes      | User's first name (minimum 3 characters).     |
| └── lastname  | string | No       | User's last name (minimum 3 characters).      |
| email        | string | Yes      | User's email address (must be a valid email). |
| password     | string | Yes      | User's password (minimum 6 characters).       |

##### Example:
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

#### Response

| Field        | Type   | Description                                   |
|--------------|--------|-----------------------------------------------|
| user         | object | Contains registered user details.             |
| ├── fullname | object | Full name of the user.                        |
| │   ├── firstname | string | User's first name.                     |
| │   └── lastname  | string | User's last name.                      |
| ├── email    | string | User's email address.                        |
| └── password | string | User's hashed password.                      |
| token        | string | Generated JWT token for the user.             |

##### Example:
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

#### Validation Rules
- **Firstname**: Must be at least 3 characters long.
- **Lastname**: Optional but must be at least 3 characters if provided.
- **Email**: Must be a valid email format.
- **Password**: Must be at least 6 characters long.

#### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 201  | User registered successfully.        |
| 400  | Validation error in request payload. |
| 500  | Internal server error.               |

---

## Captains API

### Endpoint: `/captains/register`

#### Description
Registers a new captain with vehicle details.

#### HTTP Method
`POST`

#### Request Body

| Field         | Type   | Required | Description                                    |
|--------------|--------|----------|------------------------------------------------|
| fullname     | object | Yes      | Captain's full name.                           |
| ├── firstname | string | Yes      | First name (min 4 characters).                 |
| email        | string | Yes      | Captain's email address.                       |
| password     | string | Yes      | Password (min 8 characters).                   |
| vehicle      | object | Yes      | Details about the vehicle.                     |
| ├── color    | string | Yes      | Color of the vehicle.                          |
| ├── plate    | string | Yes      | Vehicle plate number.                          |
| ├── capacity | int    | Yes      | Vehicle capacity (min 1).                      |
| └── vehicleType | string | Yes  | Type of vehicle (motorcycle, car, auto).       |

##### Example:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Validation Rules
- **Firstname**: At least 4 characters long.
- **Email**: Must be a valid email.
- **Password**: At least 8 characters long.
- **Vehicle Color**: Must be at least 3 characters.
- **Vehicle Type**: Must be one of `motorcycle`, `car`, or `auto`.

#### Status Codes
| Code | Description                          |
|------|--------------------------------------|
| 201  | Captain registered successfully.    |
| 400  | Validation error in request payload.|
| 500  | Internal server error.              |

---



## Map API 


### Endpoint: `/maps/get-coordinates`

### Description
Retrieves the geographic coordinates (latitude and longitude) for a given address.

---

### HTTP Method
`GET`

---

### Query Parameters

| Parameter | Type   | Required | Description                        |
|-----------|--------|----------|------------------------------------|
| address   | string | Yes      | The address to retrieve coordinates for. |

#### Example Request
```http
GET /maps/get-coordinates?address=Bhopal
```

---

### Response

| Field      | Type   | Description                        |
|------------|--------|------------------------------------|
| latitude   | number | Latitude of the provided address. |
| longitude  | number | Longitude of the provided address.|

#### Example Response
```json
{
  "latitude": 23.2599,
  "longitude": 77.4126
}
```

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 200  | Coordinates retrieved successfully.  |
| 400  | Invalid request parameters.          |
| 500  | Internal server error.               |

---

### Endpoint: `/maps/get-distance-time`

### Description
Calculates the distance and estimated travel time between two locations.

---

### HTTP Method
`GET`

---

### Query Parameters

| Parameter   | Type   | Required | Description                         |
|------------|--------|----------|-------------------------------------|
| origin     | string | Yes      | The starting location.              |
| destination| string | Yes      | The destination location.           |

#### Example Request
```http
GET /maps/get-distance-time?origin=Bhopal&destination=Indore
```

---

### Response

| Field      | Type   | Description                              |
|------------|--------|------------------------------------------|
| distance   | string | Distance between the two locations in km. |
| duration   | string | Estimated travel time in minutes.       |

#### Example Response
```json
{
  "distance": "190 km",
  "duration": "3 hours 20 minutes"
}
```

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 200  | Distance and time retrieved successfully. |
| 400  | Invalid request parameters.          |
| 500  | Internal server error.               |

---

### Endpoint: `/maps/get-suggestions`

### Description
Provides autocomplete location suggestions based on the user input.

---

### HTTP Method
`GET`

---

### Query Parameters

| Parameter | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| input     | string | Yes      | The input string for suggestions. |

#### Example Request
```http
GET /maps/get-suggestions?input=Bh
```

---

### Response

| Field       | Type   | Description                      |
|------------|--------|----------------------------------|
| suggestions | array  | List of suggested place names.  |

#### Example Response
```json
{
  "suggestions": ["Bhopal", "Bhagalpur", "Bhilai"]
}
```

---

### Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 200  | Suggestions retrieved successfully.  |
| 400  | Invalid request parameters.          |
| 500  | Internal server error.               |

---

### Notes
- Ensure that the `Content-Type` is set to `application/json` in the request headers.
- Users must be authenticated to access these endpoints.


## Rides API

### 1. Create Ride

#### Endpoint: `/rides/create`

**Description:**  
Creates a new ride request.

**HTTP Method:**  
`POST`

**Request Body:**

| Field        | Type   | Required | Description                                   |
|-------------|--------|----------|-----------------------------------------------|
| pickup      | string | Yes      | Pickup location.                              |
| destination | string | Yes      | Destination location.                         |
| vehicleType | string | Yes      | Type of vehicle (`auto`, `car`, `moto`).      |

**Status Codes:**

| Code | Description                          |
|------|--------------------------------------|
| 201  | Ride created successfully.          |
| 400  | Validation error in request payload.|
| 500  | Internal server error.              |

---  

### 2. Get Fare Estimate

#### Endpoint: `/rides/get-fare`

**Description:**  
Retrieves the estimated fare for a ride based on the provided pickup and destination locations.

**HTTP Method:**  
`GET`

**Query Parameters:**

| Parameter   | Type   | Required | Description                              |
|------------|--------|----------|------------------------------------------|
| pickup     | string | Yes      | Pickup location (must be at least 3 characters long). |
| destination | string | Yes      | Destination location (must be at least 3 characters long). |

**Headers:**

| Header        | Type   | Required | Description                   |
|--------------|--------|----------|-------------------------------|
| Authorization | string | Yes      | Bearer token for authentication. |

**Status Codes:**

| Code | Description                                  |
|------|----------------------------------------------|
| 200  | Successfully retrieved fare estimate.       |
| 400  | Validation error in request parameters.     |
| 401  | Unauthorized request (missing/invalid token). |
| 500  | Internal server error.                      |


## Server Configuration

### Dependencies
- `express`
- `cors`
- `dotenv`
- `express-validator`
- `jsonwebtoken`

### Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with necessary configurations.
4. Start the server:
   ```sh
   npm start
   ```

---

### Notes
- Ensure the `Content-Type` is set to `application/json` in requests.
- JWT tokens must be securely stored for authentication.

---

### Author
Developed by [Your Name]

