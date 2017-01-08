var nodemailer = require("nodemailer");

var connection = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    // logger: true,  // Logger
    auth: {
        user: '*********',
        pass: '*********'
    }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(connection);


// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"STSATH 👥" <stsathdemo@gmail.com>', // sender address
    to: 'adeelimranr@gmail.com', // list of receivers
    subject: 'Get In Touch', // Subject line
    // text: 'Hello world 🐴', // plaintext body
    html: `
        <p>
          Dear {username}, thanks for getting in touch with STSATH team. One of our
          representative will get in touch with you shortly.
        </p>
        <p>
          Email Details (Copy)<br/>
          Name: {person_name}<br/>
          Email: {email}<br/>
          Message: {message}<br/>
          Message Sent At: {createAt_date}<br/>

          <br/><br/><br/>

          With Love,
          The <a href="http://localhost:3000/">STSATH</a> Team<br/>
        </p>

        <script type="application/ld+json">
          {
            "@context": "http://schema.org",
            "@type": "EmailMessage",
            "potentialAction": {
              "@type": "ViewAction",
              "url": "https://google.com",
              "name": "Go to Google"
            },
            "description": "Search for something from Google"
          }
        </script>`
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
