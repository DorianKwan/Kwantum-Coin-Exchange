KwantumCoins
======
**_This is a personal project and is not meant for production use._**

Currently deployed at https://kwantumcoins.herokuapp.com/

Preparation
---
This project was started for an application process to test and show my front-end and back-end development skills.  
Afterwards, I kept working on it to make it worthy of a personal project to be added to my portfolio.  

Some goals I personally wanted to achieve:  
 - Build an Rails application from scratch; further my knowledge as a Ruby on Rails developer
 - Learn about Bootstrap 4 and it's grid system
 - Gain more experience using jQuery and CSS for smooth transitioning
 - Learn how to host an application using Heroku

The basic functionality was to have an application where users could buy crypto online via a basic form input.  
The full spec list of the requirements:  
 - Users are presented with a form for purchasing cryptocurrency
 - The form should allow the user to choose to buy either Bitcoin or Ethereum
 - Users can either enter a CAD amount, or a number of coins to buy, and click a buy button to perform the transaction
 - Transactions should be saved so that you can display a list of transactions the user has made, including the CAD price, the type of coin and the number of coins purchased
 - You can fetch the current CAD ask price for Bitcoin using this API - https://api.quadrigacx.com/v2/ticker?book=btc_cad
 - And the current CAD ask price for Ethereum using this API - https://api.quadrigacx.com/v2/ticker?book=eth_cad
 - Please provide the source code via Github

 To start, I drew up some wireframes and planned a basic database schema.  
 ![alt text](app/assets/images/screenshots/wireframes_and_schema.jpg?raw=true "Wireframes and Schema")

Following the wireframes the best I could I started to write the application.  

Screenshots
---
Here are a few screenshot of the application in use.  

Main Page  
![alt text](app/assets/images/screenshots/main-page-hero-img.png?raw=true)  

Sign up Page  
![alt text](app/assets/images/screenshots/registration.png?raw=true)  

Transaction Page  
![alt text](app/assets/images/screenshots/transaction-form.png?raw=true)

Transaction Form  
![alt text](app/assets/images/screenshots/transaction-form-2.png?raw=true)  

Transaction Details / Confirmation  
![alt text](app/assets/images/screenshots/transaction-details.png?raw=true)  

Transaction History  
![alt text](app/assets/images/screenshots/transaction-history.png?raw=true)  

Main Page Info Sections  
![alt text](app/assets/images/screenshots/main-page-2.png?raw=true)  


Getting Started
---

##### Clone repository to local repository  
 `git@github.com:DorianKwan/Kwantum-Coin-Exchange.git`

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

Generate a secret and update the `SECRET_BASE_KEY` in the application.yml file.  

##### Initialize Database
`rake db:create`  
`rake db:schema:load`  

##### Start up the Application
You should be good to start up the app.  
`rails s`
