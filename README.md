KwantumCoins
======
**_This is a personal project and is not meant for production use._**

Currently deployed at https://kwantumcoins.herokuapp.com/

Preparation
---
This application was originally built for an application process but was further developed for learning purposes.  

Using real cryptocurrency data pulled from CryptoCompare's API, I build a very basic Rails application to process dummy transactions. 

See documentation here: https://min-api.cryptocompare.com/documentation  

There is a scheduler running requests to their API for updated data once a minute.  That data gets stored for later use by the controller and then rendered on the view.

Quick Start
---

##### Clone repository  
 `git clone https://github.com/DorianKwan/Crypto-API-Rails-Project.git`

##### Install dependecies  
`bundle install`  

##### This application uses Ruby version 2.4.5
Check your Ruby version:  
`ruby -v`

If you need to change ruby versions use RVM  
On Mac OSX (RVM install)  
`\curl -sSL https://get.rvm.io | bash`  

Install Ruby 2.4.5 and use 
`rvm install 2.4.5 && rvm use 2.4.5`  
`ruby -v`

##### Copy and edit the application.yml  
Copy the application.yml file:  
`cp config/application.yml.example config/application.yml`  

If you would like, edit the database name, user and password in the database.yml file.  

Generate a secret and update `SECRET_BASE_KEY` in the application.yml

```bash
rake secret
```

Generate a new API key here and your new API key to `CRYPTO_API_KEY` in the application.yml file.  

https://www.cryptocompare.com/cryptopian/api-keys  


##### Initialize Database
`rake db:create`  
`rake db:schema:load`  

##### Start up the Application
`rails s`
