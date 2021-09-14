const express = require('express');
const keys = require('./config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require ('express-handlebars');
const { default: Stripe } = require('stripe');

const app = express();

// Handlebars Middleware
// The defaultlayout that wraps around the views should be called main.handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));


// Index Route
app.get('/', (req, res) => {
    res.render('index', {
      stripePublishableKey: keys.stripePublishableKey
    });
});

// Charge Route
app.post('/charge', (req, res) => {
  const amount = 2500;
  // console.log(req.body);

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  // Gives us back a promise
  .then(customer => stripe.charges.create({
    amount,
    description: 'Web Developement Ebook',
    currency: 'usd',
    customer: customer.id
  }))
  .then(charge => res.render('success'));
  
});

// Use process.env.port for Heroku and it will choose the port
// Otherwise use port 5000 locally 
const port = process.env.PORT || 5500;

// Start the server and listen to the port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});