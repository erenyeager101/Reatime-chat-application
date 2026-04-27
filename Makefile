# Makefile for UserManagementSystem
# Generated from UML diagrams

.PHONY: install dev build test clean

# Install all dependencies
install:
	cd backend && npm install
	cd ../frontend && npm install

# Start development servers
dev:
	npm run dev

# Build frontend
build:
	cd frontend && npm run build

# Run tests
test:
	cd backend && npm test
	cd ../frontend && npm test

# Clean build artifacts
clean:
	rm -rf frontend/dist
	rm -rf backend/node_modules
	rm -rf frontend/node_modules
