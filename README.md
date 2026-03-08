# Clinic Appointment Booking

Full-stack clinic appointment booking system with:
- `frontend/`: React + Vite UI
- `backend/`: Node.js + Express API

The backend currently uses an in-memory store for appointments (data resets when server restarts).

## Project Structure

```text
clinic-appointment-booking/
├── backend/
│   ├── server.js
│   ├── src/
│   │   ├── app.js
│   │   ├── routes/appointmentRoutes.js
│   │   ├── controllers/appointmentController.js
│   │   ├── utils/dateUtils.js
│   │   └── middleware/
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

## Features

- View available slots for a date
- Book an appointment with basic validations
- List all appointments or appointments by date
- CORS enabled for frontend integration

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, CORS

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (recommended)

## Quick Start

Open two terminals from the project root (`clinic-appointment-booking`).

### 1. Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on: `http://localhost:5050`

### 2. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on Vite default URL (usually): `http://localhost:5173`

## Backend API

Base URL: `http://localhost:5050/api`

### Health Check

`GET /`

Response:
```json
"Clinic Appointment Backend Running"
```

### Get Available Slots

`GET /api/slots?date=YYYY-MM-DD`

Example:
```bash
curl "http://localhost:5050/api/slots?date=2026-03-09"
```

Success response:
```json
{
  "date": "2026-03-09",
  "availableSlots": ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]
}
```

Validation error:
```json
{
  "message": "Please provide a date"
}
```

### Book Appointment

`POST /api/book`

Request body:
```json
{
  "name": "John Doe",
  "symptoms": "Fever and cough",
  "date": "2026-03-09",
  "time": "11:00 AM"
}
```

Example:
```bash
curl -X POST "http://localhost:5050/api/book" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "symptoms":"Fever and cough",
    "date":"2026-03-09",
    "time":"11:00 AM"
  }'
```

Success response:
```json
{
  "success": true,
  "appointment": {
    "id": 1,
    "name": "John Doe",
    "symptoms": "Fever and cough",
    "date": "2026-03-09",
    "time": "11:00 AM",
    "status": "Confirmed"
  }
}
```

Duplicate slot response:
```json
{
  "success": false,
  "message": "This slot is already booked"
}
```

Common validation error responses:
```json
{ "message": "Name, date and time are required" }
```
```json
{ "message": "Cannot book appointments for past dates" }
```
```json
{ "message": "Appointments can only be booked within the next 14 days" }
```
```json
{ "message": "Clinic is closed on Sundays" }
```

### Get Appointments

`GET /api/appointments` (all appointments)

`GET /api/appointments?date=YYYY-MM-DD` (date-filtered)

Example:
```bash
curl "http://localhost:5050/api/appointments?date=2026-03-09"
```

## Business Rules (Current Backend Behavior)

- Bookings are allowed only:
  - for today or future dates
  - within next 14 days
  - not on Sundays
- Slot list is fixed to:
  - `9:00 AM`, `10:00 AM`, `11:00 AM`, `12:00 PM`, `2:00 PM`, `3:00 PM`, `4:00 PM`, `5:00 PM`
- Time normalization currently maps only these shorthand inputs:
  - `9 AM`, `10 AM`, `11 AM`, `12 PM`, `2 PM`, `3 PM`, `4 PM`, `5 PM`

If voice input is used (AI/telephony), normalize user time strings to backend-compatible slot format before sending API requests.

## Frontend Notes

- Frontend communicates with backend endpoints under `/api`
- Ensure backend is running before using booking flows in UI

## Development Scripts

### Backend (`backend/package.json`)

- `npm start`: Run server
- `npm run dev`: Run with nodemon

### Frontend (`frontend/package.json`)

- `npm run dev`: Start Vite dev server
- `npm run build`: Production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Known Limitations

- In-memory appointment store (no database persistence)
- No authentication/authorization
- No automated tests in backend currently
- Duplicate check and slot matching depend on normalized time strings

## Suggested Next Improvements

1. Replace in-memory storage with a database (e.g., PostgreSQL/MongoDB)
2. Enforce strict server-side time parsing to a canonical format
3. Add unit/integration tests for booking and slot collision scenarios
4. Add rate limiting and basic auth for production hardening
5. Containerize with Docker and provide compose setup

