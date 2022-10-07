const userResolvers = require('./user');
const productResolvers = require('./product');
const categoryResolvers = require('./category');
const newsSubscriberResolvers = require('./newsSubscriber');

module.exports = [userResolvers, productResolvers, categoryResolvers, newsSubscriberResolvers];
