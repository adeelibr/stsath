# STSATH (pronounced stath)
Smart Twitter Sentiment Analysis On Tweets &amp; Hashtags
By Adeel Imran


### Running App
* Do An Npm Install
* Start Server: npm start
* Compile Fresh Client Code: npm run bundle

##### Now Go To Your Browser And Type:

```javascript
http://localhost:3000 or http://127.0.0.1:3000
```

### Sequelize
Now, run the init command to create the files (config.json) and
folders (“migrations”, “models”, and “seeders”): [First Time Only When Making App Structure]

```javascript
$ node_modules/.bin/sequelize init or npm run sequelizeinit
```

###### Note: This step isn't required, because well you clone this repository these folders will already by their.  

Go in the config.json file created and put your database information


### Sequelize Migrations
Then run the migration to create the tables:

``` javascript
$ node_modules/.bin/sequelize db:migrate or npm run migrations
```

#### Database Tables
* users
* feedbacks
