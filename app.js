const cors = require("cors")
const express = require('express');
const app = express();
const port = 3000;
const db = require("./db")
const bodyParser = require('body-parser');
// Define routes
const indexRouter = require('./routes/index');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use routes
app.use(cors({ origin: "*" })
)
app.use('/auth', indexRouter);



app.set("db", db)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});