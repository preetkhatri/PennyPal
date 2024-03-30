require('dotenv').config(); 

const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require('./db/connect')

const transactionsRouter = require('./routes/transactions')

const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')

// middlewares
app.use(express.json())
app.use(cors())

// routes

app.use('/api/v1',transactionsRouter)

app.use(notFound)
app.use(errorHandler)

const port = 5000 || process.env.PORT

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to DB");
        app.listen(port, console.log(`Server is listening to ${port}...`));
    } catch (error) {
        console.log("Error connecting to Database", error);
    }
}

start()
