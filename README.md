 Installation & Setup

 ### **1️⃣ Clone the Repository

git clone https://github.com/vishwasdev01/personal-finance-tracker-backend
cd backend
 ### **1️⃣ Install Dependencies

npm install

 ### **1️⃣ Create a .env File

Create a .env file in the root directory to store environment variables:

PORT=5000
MONGO_URI=mongodb://localhost:27017/your-database-name
NODE_ENV=development

 ### **1️⃣Running the Server

 ### **1️⃣ Start with Nodemon (for Development)

npm run start:nodemon

 ### **1️⃣ Start with PM2 (for Production)

npm run start:pm2

✅ PM2 will watch for file changes and restart the server automatically.

 ### **1️⃣ Restart or Stop PM2 Process

npm run restart  # Restart the server
npm run stop     # Stop the server

 ### **1️⃣View Logs

npm run logs

✅ Logs are saved in logs/output.log and logs/error.log.

 ### **1️⃣ Build for Production
 npm run build
