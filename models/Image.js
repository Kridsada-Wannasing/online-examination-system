module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define("Image", {
    imageId: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    type: {
      type: dataTypes.STRING,
    },
    name: {
      type: dataTypes.STRING,
    },
    path: {
      type: dataTypes.STRING,
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.Question, {
      foreignKey: "questionId",
    });
  };

  return model;
};
