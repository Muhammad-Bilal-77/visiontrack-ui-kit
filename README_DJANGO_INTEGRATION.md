# Django Backend Integration Guide

This frontend is prepared to connect to your Django REST API backend. Follow these steps to complete the integration.

## 🔧 Frontend Setup

### 1. Configure API URL

Create a `.env` file in the project root (copy from `.env.example`):

```bash
VITE_DJANGO_API_URL=http://localhost:8000/api
```

For production, update to your deployed Django backend URL.

### 2. Environment Variables

The frontend uses Vite's environment variable system. Variables must be prefixed with `VITE_` to be accessible in the browser.

## 🚀 Django Backend Requirements

Your Django backend should implement the following REST API endpoints:

### Employee Management

```
GET    /api/employees/           - List all employees (paginated)
POST   /api/employees/           - Create new employee
GET    /api/employees/{id}/      - Get employee details
PATCH  /api/employees/{id}/      - Update employee
DELETE /api/employees/{id}/      - Delete employee
GET    /api/employees/?search=   - Search employees
```

**Request/Response Format:**
```json
// Employee object
{
  "id": "uuid",
  "empId": "EMP001",
  "name": "John Doe",
  "email": "john@company.com",
  "role": "Developer",
  "status": "Active",
  "photo": "url or base64",
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

### Face Registration

```
POST /api/faces/register/  - Register face for employee
POST /api/faces/upload/    - Upload face image
POST /api/faces/verify/    - Verify face and identify employee
```

**Request Format (multipart/form-data):**
```
employeeId: uuid
image: File (binary)
OR
imageData: base64 string (from webcam)
captureMethod: "webcam" | "upload"
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "employeeId": "uuid",
    "faceEncoding": "encoded_data",
    "capturedAt": "timestamp",
    "imageUrl": "optional_url"
  }
}
```

### Attendance Management

```
GET  /api/attendance/              - List attendance records (paginated)
POST /api/attendance/mark/         - Mark attendance
GET  /api/attendance/today/        - Today's attendance
GET  /api/attendance/employee/{id}/ - Employee attendance history
```

**Mark Attendance Request (multipart/form-data):**
```
employeeId: uuid (optional if using face recognition)
image: File (binary)
OR
imageData: base64 string
timestamp: ISO datetime (optional)
```

**Attendance Record Response:**
```json
{
  "id": "uuid",
  "employeeId": "uuid",
  "employeeName": "John Doe",
  "timestamp": "2025-01-01T09:00:00Z",
  "status": "Present" | "Late" | "Absent",
  "photo": "optional_url",
  "verificationMethod": "face" | "manual"
}
```

### Reports

```
GET /api/reports/generate/  - Generate report with filters
GET /api/reports/monthly/   - Monthly attendance data
GET /api/reports/export/    - Export report (CSV/PDF)
GET /api/reports/stats/     - Attendance statistics
```

**Query Parameters:**
```
?start_date=YYYY-MM-DD
&end_date=YYYY-MM-DD
&employee_id=uuid
&status=Present|Late|Absent
&format=csv|pdf
&year=2025
&month=1
```

### Authentication

```
POST /api/auth/login/   - Login
POST /api/auth/logout/  - Logout
POST /api/auth/verify/  - Verify token
```

**Login Request:**
```json
{
  "email": "admin@company.com",
  "password": "password",
  "role": "admin" | "employee"
}
```

**Login Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "email": "admin@company.com",
      "role": "admin",
      "name": "Admin User"
    }
  }
}
```

## 🔐 Authentication

The frontend sends authentication tokens in the `Authorization` header:

```
Authorization: Bearer {token}
```

Tokens are stored in `localStorage` after successful login.

## 📦 Response Format

All API responses should follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Paginated Responses:**
```json
{
  "results": [ ... ],
  "count": 100,
  "next": "url_to_next_page",
  "previous": "url_to_previous_page"
}
```

## ❌ Error Handling

The frontend expects error responses in this format:

```json
{
  "success": false,
  "message": "Error description",
  "details": { ... }
}
```

HTTP status codes used:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 🖼️ File Uploads

Face images and employee photos are sent as:
1. **FormData with File objects** for uploads
2. **Base64 strings** for webcam captures

Django should handle both formats.

## 🧪 Testing

### Mock Mode (Default)
The frontend currently uses mock data. To test with your Django backend:

1. Start your Django server
2. Update `.env` with your API URL
3. The services will automatically connect to Django

### CORS Configuration

Ensure your Django backend allows requests from the frontend origin:

```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "https://your-frontend-domain.com",
]
```

## 📚 Frontend Service Files

All API calls are organized in `/src/services/`:

- `employeeService.ts` - Employee CRUD operations
- `faceService.ts` - Face registration and verification
- `attendanceService.ts` - Attendance marking and retrieval
- `reportService.ts` - Report generation and export
- `authService.ts` - Authentication

## 🔄 Data Flow

1. **User Action** → Component
2. **Component** → Service Method
3. **Service** → Django API (via `apiRequest` helper)
4. **Django** → Process & Respond
5. **Service** → Parse Response
6. **Component** → Update UI

## 📝 TypeScript Interfaces

All data types are defined in `/src/types/models.ts`. Ensure your Django serializers match these interfaces.

## 🚦 Next Steps

1. ✅ Frontend is ready
2. ⏳ Implement Django REST API endpoints
3. ⏳ Configure CORS
4. ⏳ Add JWT authentication
5. ⏳ Integrate face recognition model (e.g., face_recognition, dlib)
6. ⏳ Test integration
7. ⏳ Deploy both frontend and backend

## 💡 Tips

- Use Django REST Framework for easy API development
- Implement proper validation in Django serializers
- Use Celery for heavy tasks (face encoding)
- Store face encodings efficiently (consider PostgreSQL with pgvector)
- Add rate limiting to prevent abuse
- Use Redis for caching frequently accessed data

---

**Need Help?** Check the service files in `/src/services/` for detailed API call implementations.
