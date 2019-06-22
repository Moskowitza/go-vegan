module.exports = function(sequelize, Sequelize) {
  const Sanctuary = sequelize.define('Sanctuary', {
    sanId: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    image: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    animalPhone: {
      type: Sequelize.STRING,
    },
    animalEmail: {
      type: Sequelize.STRING,
    },
    animalAddress: {
      type: Sequelize.STRING,
    },
    animalWebsite: {
      type: Sequelize.STRING,
    },
    Facebook: {
      type: Sequelize.STRING,
    },
    Instagram: {
      type: Sequelize.STRING,
    },
    Twitter: {
      type: Sequelize.STRING,
    },
    YouTube: {
      type: Sequelize.STRING,
    },
    DonationPage: {
      type: Sequelize.STRING,
    },
  });
  Sanctuary.associate = function(models) {
    Sanctuary.belongsToMany(models.User, {
      through: 'UserSanList',
      as: 'Subscribers',
      foreignKey: 'sanId',
    });
  };
  return Sanctuary;
};
