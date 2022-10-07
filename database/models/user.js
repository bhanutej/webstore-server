'use strict';

const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM("superadmin", "admin", "user")
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hash(this.password, 10);
    }
  };

  return User;
};



// const bcrypt = require('bcryptjs');

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     'User',
//     {
//       name: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.STRING,
//     },
//     {
//       defaultScope: {
//         rawAttributes: { exclude: ['password'] },
//       },
//     },
//   );

//   User.beforeCreate(async (user) => {
//     user.password = await user.generatePasswordHash();
//   });
//   User.prototype.generatePasswordHash = function () {
//     if (this.password) {
//       return bcrypt.hash(this.password, 10);
//     }
//   };
//   User.associate = function (models) {
//     // associations can be defined here
//     User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
//   };
//   return User;
// };