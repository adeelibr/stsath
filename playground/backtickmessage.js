var moment = require('moment');
let username = 'undertaker';
// let createAt_date = new Date();
let createAt_date = moment().format('MMMM Do YYYY, h:mm:ss a');

var mailOptions = {
    from: '"STSATH 👥" <stsathdemo@gmail.com>', // sender address
    to: 'adeelimranr@gmail.com', // list of receivers
    subject: 'Get In Touch', // Subject line
    html:
        `
        <p>
          Dear ${username}, thanks for getting in touch with STSATH team. One of our
          representative will get in touch with you shortly.
        </p>
        <p>
          Email Details (Copy)<br/>
          Name: {person_name}<br/>
          Email: {email}<br/>
          Message: {message}<br/>
          Message Sent At: ${createAt_date}<br/>

          <br/><br/><br/>

          With Love,
          The <a href="http://localhost:3000/">STSATH</a> Team<br/>
        </p>`
};



console.log(mailOptions);
