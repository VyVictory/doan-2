@echo off
start cmd /k "cd frontend && code . && npm start"
@REM start chrome http://localhost:3000/
start cmd /k "cd backend && code . && npm run dev"
