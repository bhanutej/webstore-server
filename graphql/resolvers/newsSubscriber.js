const { AuthenticationError } = require('apollo-server-express');

const { NewsSubscriber } = require('../../database/models');

module.exports = {

  Query: {
    async newsLetterEmails(root, args, context) {
      const { limit } = args;
      return await NewsSubscriber.findAll({ limit });
    }
  },

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
    },

    async deleteNewsSubscriber(root, args, { user = null }) {
      const { id } = args.input;
      const newsSubscriber = await NewsSubscriber.findOne({ where: { id } });
      if (!newsSubscriber) {
        throw new AuthenticationError('Subscriber not found!');
      }
      await newsSubscriber.destroy();
      return {
        message: "Delted Successfully!"
      }
    }
  }
};
