const express = require('express')
let nodemailer = require('nodemailer');
require('dotenv').config();
const app = express()
const{ Octokit, App } = require("octokit");

const HTML_TEMPLATE = (text) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
        <style>
          .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .email-header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
          }
          .email-footer {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <h1>EMAIL HEADER</h1>
            </div>
            <div class="email-body">
              <p>${text}</p>
            </div>
            <div class="email-footer">
              <p>EMAIL FOOTER</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

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
const message = "this is a messgae";
var mailOptions = {
  from: 'alifhsr@gmail.com',
  to: 'alif.hs@outlook.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
  html: HTML_TEMPLATE(message),
};

const port = 3000

app.get('/', (req, res) => {
  throw new Error('Required');
  res.send('Hello World!')
})
app.get('/dispatch-workflow', async(req, res) => {
  // Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: process.env.token
})

await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
  owner: 'alifhs',
  repo: 'fresh-react',
  workflow_id: 'node.js.yml',
  ref: 'main'
})
    
    res.send('Hello World!')
  })
app.get('/h', (req, res) => {
    
    res.send('Hello World!')
  })



app.get('/sendmail', (req, res)=> {
  try {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('error',error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }catch(e) {
    console.log('catch');
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


