# LeadDesk Pro - Developer Start Guide

This guide provides the exact commands needed to start both the frontend and backend servers, along with troubleshooting steps for common issues like port conflicts.

## 🚀 How to Start the Application

To run the full application locally, you will need to open **two separate terminal windows/tabs** — one for the backend and one for the frontend.

### 1. Start the Backend API (Terminal 1)

The backend runs on `localhost:5000` and connects to MongoDB.

```powershell
# Navigate to the backend directory
cd backend

# Start the development server (uses nodemon for auto-restarts)
npm run dev
```

*Expected output:*
```
[nodemon] starting `node src/server.js`
[MongoDB] Connected successfully
LeadDesk Pro API running on port: 5000
```

### 2. Start the Frontend App (Terminal 2)

The frontend runs on `localhost:5173` using Vite.

```powershell
# Navigate to the frontend directory
cd frontend

# Start the Vite development server
npm run dev
```

*Expected output:*
```
VITE v5.4.21 ready in XXX ms
➜ Local: http://localhost:5173/
```

---

## ⚠️ Troubleshooting: Port Already in Use (EADDRINUSE)

If you see an error like `Error: listen EADDRINUSE: address already in use :::5000` when starting the backend, it means another process (or a previously crashed instance of this app) is already using port 5000. 

### How to Fix it on Windows (PowerShell)

You can kill the stuck processes by running this exact command in your PowerShell terminal:

**To kill Port 5000 (Backend):**
```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force
```

**To kill Port 5173 (Frontend):**
```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess -Force
```

*Note: If the command returns an error saying "No MSFT_NetTCPConnection objects found", it means the port is already free and you can safely run `npm run dev` again.*

---

## 🔑 Usage Guide

1. **Access the Landing Page:** Open your browser and go to `http://localhost:5173`
2. **Submit a Lead:** Use the "Let's talk business" form on the landing page to test the submission API.
3. **Access Admin Panel:** Go to `http://localhost:5173/login`
   - *Default Admin Credentials:* Check your database or use the seeder (if you ran `npm run seed`). The backend handles the JWT generation.
4. **Admin Features:** Once logged in, you can view the dashboard analytics, manage leads (update statuses, delete), and view your profile.
