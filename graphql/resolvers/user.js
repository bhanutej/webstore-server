require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../../database/models');
module.exports = {
  Mutation: {
    async register(root, args, context) {
      const { name, email, password, role } = args.input;
      const user = await User.findOne({where: { email }});
      if (user) {
        throw new AuthenticationError('Email already existed!');
      }

      const newUser = await User.create({ name, email, password, role });
      if (newUser && bcrypt.compareSync(password, newUser.password)) {
        const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET);
        return { ...newUser.toJSON(), token };
      }
      return user;
    },

    async login(root, { input }, context) {
      const { email, password } = input;
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError('Invalid credentials');
    },
  },
};
