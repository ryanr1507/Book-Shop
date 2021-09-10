//Instead of putting the keys directlry in, replace with environemnet variable added to hiroku
module.exports = {
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STIRPE_SECRET_KEY
}