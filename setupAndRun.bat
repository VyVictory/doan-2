@echo off
start cmd /k "cd frontend && npm i && npm start"
@REM start chrome http://localhost:3000/
start cmd /k "cd backend && npm i && npm run dev"
@REM  chrome http://localhost:5000/