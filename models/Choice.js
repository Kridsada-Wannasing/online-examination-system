module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Choice",
    {
      choiceId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      choice: {
        type: dataTypes.STRING(255),
      },
      order: {
        type: dataTypes.INTEGER(2),
      },
    },
    {
      tableName: "choices",
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Question, {
      foreignKey: "questionId",
    });
  };

  return model;
};
