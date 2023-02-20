const path = require('path'); // provides functionalities for accessing and interacting with files within a repo
const express = require('express'); // layer built on top of the Node js that helps manage servers and routes
const session = require('express-session'); // creates and manages a session middleware
const exphbs = require('express-handlebars'); // renders web pages to the client side from data on the server side
const routes = require('./controllers'); // mvc framework and route extender for Express
const helpers = require('./utils/helpers'); // methods to help in getting paths relative to current scripts and in requiring relative modules

const sequelize = require('./config/connection'); // Object Relational Mapper which performs functions like handling database records by representing the data as objects
const SequelizeStore = require('connect-session-sequelize')(session.Store); // how long have you been in a session (going in and out of a browser)

const app = express(); // calling Express as "app"
const PORT = process.env.PORT || 3001; // the port where to view local host on computer

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers }); // method that tells express-handlebars to create helpers

const sess = {
  secret: 'Super secret secret',
  cookie: { // A cookie is information saved by your web browser. When you visit a website, the site may place a cookie on your web browser so it can recognize your device in the future. If you return to that site later on, it can read that cookie to remember you from your last visit and keep track of you over time
    maxAge: 300000, // as milliseconds - this is 5 minutes before the cookie expires
    httpOnly: true, // a tag added to a browser cookie that prevents client-side scripts from accessing data. It provides a gate that prevents the specialized cookie from being accessed by anything other than the server.
    secure: false, //When a secure flag is used, then the cookie will only be sent over HTTPS, which is HTTP over SSL/TLS.
    sameSite: 'strict', // Strict sameSite setting: Cookies will only be sent in a first-party context and not be sent along with requests initiated by third party websites.
  },
  resave: false, // IF TRUE: Forces session to be saved even when unmodified
  saveUninitialized: true, // IF TRUE: Forces a session that is "new but not modified" to be saved to the store.
  store: new SequelizeStore({ // store a new instance of SequelizeStore (const named for requiring above)
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parsing the URL-encoded data with the querystring library (when false) or the qs library -parsed in nested data- (when true)
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// SWITCH BELOW FROM TRUE TO FALSE AFTER DROPPING & CREATING TABLES
sequelize.sync({ force: false }).then(() => { // force TRUE: true adds a DROP TABLE IF EXISTS before trying to CREATE table (existing tables will be overwritten)
  app.listen(PORT, () => console.log('Now listening'));
});
