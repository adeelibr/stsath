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
          Dear Adeel, thanks for booking your Google I/O ticket with us.
        </p>
        <p>
          Account Details<br/>
          Reservation number: IO12345<br/>
          Order for: John Smith<br/>
          Event: Google I/O 2013<br/>
          Start time: May 15th 2013 8:00am PST<br/>
          Venue: Moscone Center, 800 Howard St., San Francisco, CA 94103<br/>
        </p>
        <p><a href="http://localhost:3000/">Join Us</a></p>

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
