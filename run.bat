cd backend/device-service
@REM npm install
start "" npm run dev start
cd ../gateway-service
@REM npm install
start "" npm start
cd ../user-service
@REM npm install
start "" npm run dev start

cd ../../frontend
@REM npm install
start "" npm start
