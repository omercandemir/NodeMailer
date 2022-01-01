const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require('express-handlebars');
const path = require("path");
const nodemailer = require("nodemailer");

const port = 3000;

const app = express();

// view engine setup
// app.engine('handlebars', exphbs());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// public folder

app.use("/public", express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/send', (req, res) => {
    const output = `
        <h3>Contact Information</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
            <li>Subject: ${req.body.subject}</li>
            <li>Message: ${req.body.message}</li>
        </ul>
    `;
    sendMail(req.body.subject, output);
    res.render('contact', {msg: '<div class="alert alert-success">Email sent successfully!</div>'})
});

function sendMail(subject, message)
{
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e415496fbe3dde",
          pass: "2406773511f1fa"
        }
    });
  
    // send mail with defined transport object
    let info = transporter.sendMail({
      from: '"Nodemailer Contact Test 👻" <omer@ayicik.net>', // sender address
      to: "inkilap28@gmail.com", // list of receivers
      subject: subject, // Subject line
      text: "New Contact Request", // plain text body
      html: message, // html body
    });

    transporter.sendMail(info, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", info.nodemailer.getTestMessageUrl(info));
    });
}

app.listen(port, () => console.log("Server is running..."));