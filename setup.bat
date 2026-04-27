@echo off
REM Setup script for User Management System
REM Generated from UML diagrams

echo Setting up User Management System...

REM Check prerequisites
node --version >nul 2>&1 || (
  echo Node.js is required but not installed. Aborting.
  exit /b 1
)

echo Installing root dependencies...
call npm install

echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Copy backend/.env.example to backend/.env and configure
echo 2. Start MongoDB locally or update MONGO_URI in .env
echo 3. Run 'npm run dev' to start development servers
pause
