const { AuthenticationError } = require('apollo-server-express');

const { NewsSubscriber } = require('../../database/models');

module.exports = {
  Mutation: {
    async addNewsSubscriber(root, args, { user = null }) {
      const { email } = args.input;
      const newsSubscriber = await NewsSubscriber.findOne({ where: { email } });
      if (newsSubscriber) {
        throw new AuthenticationError('You are already subscribed!');
      }
      await NewsSubscriber.create({ email });
      return {
        message: "Thank you for your subscription"
      }
    }
  }
};
