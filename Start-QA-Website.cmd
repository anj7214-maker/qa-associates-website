@echo off
cd /d "%~dp0"
echo Starting QA & Associates website...
echo.
if not exist node_modules (
  echo Installing dependencies. This may take a few minutes...
  npm.cmd install --cache .\.npm-cache
  echo.
)
echo Website will open at:
echo http://localhost:5173/
echo.
echo Keep this window open while viewing the website.
echo Press Ctrl+C to stop the website server.
echo.
npm.cmd run dev -- --host 0.0.0.0 --port 5173
pause
