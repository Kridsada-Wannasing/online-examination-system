module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Answer",
    {
      answerId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      answer: {
        type: dataTypes.STRING(255),
      },
    },
    {
      tableName: "answers",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Question, {
      foreignKey: "questionId",
    });
  };

  return model;
};
