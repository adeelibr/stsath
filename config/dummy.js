// Just rename this file to index.js and put your credentials here

module.exports = {

  secret: '********************************',
  twitter: {
    consumer_key: '********************************',
    consumer_secret: '********************************',
    access_token: '********************************',
    access_token_secret: '********************************'
  },
  emailConnection: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    logger: true,  // Logger
    auth: {
      user: '********',
      pass: '********'
    }
  }

};
