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
app.use(cors({
    origin: ["https://todolist-client-eight.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
})
)
app.use('/auth', indexRouter);



app.set("db", db)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});