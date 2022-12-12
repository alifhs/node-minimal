const express = require('express')
let nodemailer = require('nodemailer');
require('dotenv').config();
const app = express()

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.USER,
//     pass: process.env.PASS
//   }
// });
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user:process.env.USEREMAIL ,
    pass: process.env.PASS,
  },
});


console.log('pass', process.env.PASS);
console.log('user', process.env.USEREMAIL);

var mailOptions = {
  from: 'alifhsr@gmail.com',
  to: 'alif.hs@outlook.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

const port = 3000

app.get('/', (req, res) => {
  throw new Error('Required');
  res.send('Hello World!')
})
app.get('/h', (req, res) => {
    
    res.send('Hello World!')
  })

app.get('/sendmail', (req, res)=> {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})