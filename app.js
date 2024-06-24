const cors = require("cors")
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./db")
const bodyParser = require('body-parser');
// Define routes
const indexRouter = require('./routes/index.js');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use routes

const corsOptions = {
    origin: 'https://todolist-client-eight.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions))

app.use('/auth', indexRouter);



app.set("db", db)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});