# Dhyuthi 7.0 — REST API Specification (OpenAPI 3.1)

Base URL: `https://api.dhyuthi.ieeesctsb.org/v1`

---

## 1. Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/registrations` | Create a new pass registration order | No |
| `GET` | `/registrations/{token}` | Retrieve registration & digital pass status | No (Public Token) |
| `POST` | `/registrations/verify-payment` | Webhook for payment gateway capture | Webhook Secret |
| `GET` | `/tracks` | List all active tracks & remaining capacity | No |
| `GET` | `/preevents` | List all pre-events, deadlines & prize pools | No |
| `POST` | `/preevents/{id}/teams` | Register a new team for a pre-event | Attendee JWT |
| `GET` | `/certificates/verify/{hash}` | Validate authenticity of KTU certificate | Public |

---

## 2. Detailed Schemas & Endpoints

### 2.1 Create Registration Order
`POST /registrations`

#### Request Body
```json
{
  "fullName": "Aditi Menon",
  "email": "aditi.menon@sctce.ac.in",
  "phone": "+919876543210",
  "college": "Sree Chitra Thirunal College of Engineering",
  "yearOfStudy": 3,
  "ktuRegNo": "SCT23CS042",
  "isIeeeMember": true,
  "ieeeMemberId": "98451234",
  "ticketTierId": "pass-all-access",
  "selectedTrackId": "aigenix"
}
```

#### Successful Response (`201 Created`)
```json
{
  "success": true,
  "data": {
    "registrationId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "ticketToken": "DHY7-PASS-X92F",
    "amountPayableInr": 719.00,
    "ieeeDiscountApplied": true,
    "discountAmountInr": 180.00,
    "orderId": "order_OG71x992Za",
    "paymentStatus": "PENDING"
  }
}
```

---

### 2.2 Verify Certificate
`GET /certificates/verify/{hash}`

#### Parameters
- `hash` (path parameter, string, 64-char hex SHA-256): Cryptographic certificate signature hash.

#### Successful Response (`200 OK`)
```json
{
  "valid": true,
  "data": {
    "certificateId": "8a3e93b1-2c5e-49b9-bf37-3e8df3859210",
    "recipientName": "Aditi Menon",
    "ktuRegNo": "SCT23CS042",
    "college": "Sree Chitra Thirunal College of Engineering",
    "eventTitle": "Dhyuthi 7.0 — AIGENIX Track Workshop",
    "ktuPointsApproved": 30,
    "issueDate": "2026-10-25T17:30:00Z",
    "issuingAuthority": "IEEE SCT SB, Student Branch STB64091",
    "verificationUrl": "https://dhyuthi.ieeesctsb.org/verify/e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}
```

#### Error Response (`404 Not Found`)
```json
{
  "valid": false,
  "error": "CERTIFICATE_NOT_FOUND",
  "message": "The provided signature hash does not match any official IEEE SCT SB Dhyuthi 7.0 credential."
}
```
