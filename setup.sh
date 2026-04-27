#!/bin/bash
# Setup script for User Management System
# Generated from UML diagrams

set -e

echo "Setting up User Management System..."

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm is required but not installed. Aborting." >&2; exit 1; }

echo "Installing root dependencies..."
npm install

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy backend/.env.example to backend/.env and configure"
echo "2. Start MongoDB locally or update MONGO_URI in .env"
echo "3. Run 'npm run dev' to start development servers"
