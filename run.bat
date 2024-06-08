@echo off
start cmd /k "cd frontend && npm start"
@REM start chrome http://localhost:3000/
start cmd /k "cd backend && npm run dev"
