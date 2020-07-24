module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "QuestionTag",
    {
      questionTagId: {
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
