# STSATH (pronounced stath)
Smart Twitter Sentiment Analysis On Tweets &amp; Hashtags
By Adeel Imran


### Running App
* Start Server: npm start
* Compile Client Side Code: npm run bundle'
Now Go To Your Browser And Type:
```javascript
http://localhost:3000 or http://127.0.0.1:3000
```

### Sequelize
Now, run the init command to create the files (config.json) and
folders (“migrations”, “models”, and “seeders”): [First Time Only When Making App Structure]

```javascript
$ node_modules/.bin/sequelize init
```

#### Sequelize Create Tables
* node_modules/.bin/sequelize model:create --name users --attributes "username:string, first_name:string, last_name:string, email:string, hashed_password:string"

### Sequelize Migrations
Run the migration to create the tables:

``` javascript
$ node_modules/.bin/sequelize db:migrate
```
