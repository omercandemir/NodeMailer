const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodeMailer = require("nodemailer");

const port = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(port, () => console.log("Server is running..."));