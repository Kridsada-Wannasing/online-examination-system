module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "QuestionTag",
    {
      questionTagId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    },
    {
      tableName: "question_tags",
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Question, {
      foreignKey: "questionId",
    });
    model.belongsTo(models.Tag, {
      foreignKey: "tagId",
    });
  };

  return model;
};
