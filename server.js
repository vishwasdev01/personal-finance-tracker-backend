const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const transactionRoutes = require('./routes/transactionRoutes');
const logger = require("./logger");
const errorController = require('./utils/errorController');
const AppError = require('./utils/appError');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

//Middleware to handle each incoming request’s method, URL
app.use((req, res, next) => {
    res.on("finish", () => {
        if(res.statusCode>=400){
            logger.error(`[${req.method}] ${req.url}`);
        }else{            
            logger.info(`[${req.method}] ${req.url}`);
        }
    });
    next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => logger.info('MongoDB Connected'))
.catch(err => logger.error(err));

// Routes
app.get("/",(_,res)=> {
    res.send({message:"running server on port 5000"})
})

app.use('/api/transactions', transactionRoutes);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

app.use(errorController)


// Start Server
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
