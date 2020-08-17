module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Choice",
    {
      chioceId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      chioce: {
        type: dataTypes.STRING(255),
      },
      order: {
        type: dataTypes.INTEGER(2),
      },
    },
    {
      tableName: "chioces",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Question, {
      foreignKey: "questionId",
    });
  };

  return model;
};
