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
      score: {
        type: dataTypes.INTEGER(3),
      },
    },
    {
      tableName: "answers",
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
