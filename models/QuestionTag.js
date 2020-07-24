module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "QuestionsTag",
    {
      questionsTagId: {
        type: dataTypes.STRING(4),
        primaryKey: true,
      },
    },
    {
      tableName: "questions_tag",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.ObjectiveQuestion, {
      foreignKey: "objectiveQuestionId",
    });
    model.belongsTo(models.SubjectiveQuestion, {
      foreignKey: "subjectiveQuestionId",
    });
  };

  return model;
};
