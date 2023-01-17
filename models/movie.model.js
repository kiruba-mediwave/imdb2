module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movie", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      yearOfRelease: {
        type: Sequelize.INTEGER,
      },
      createdByUser: {
        type: Sequelize.UUID,
        refrences: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  
    // associations
    Movie.associate = (models) => {
      Movie.belongsTo(models.user, {
        foreignKey: "createdByUser",
        as: "createdUserInfo",
      });
    };
  
    return Movie;
  };
  
  /*
  {
    "id": "3131242542222242",
    "name": "The Matrix",
    "genre": "Sci-fi",
    "language": "English",
    "yearOfRelease": "1999",
    "createdByUser": "8312321938232"
    "createdAt": DATE,
    "updatedAt": DATE
  }
  */