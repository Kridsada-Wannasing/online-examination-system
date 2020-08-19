module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "QuestionExam",
    {
      questionExamId: {
        type: dataTypes.STRING(20),
      },
    },
    {
      tableName: "objective_questions",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Exam, {
      foriegnKey: "examId",
    });
    model.belongsTo(models.ObjectiveQuestion, {
      foriegnKey: "objectiveQuestionId",
    });
    model.belongsTo(models.SubjectiveQuestion, {
      foriegnKey: "subjectiveQuestionId",
    });
  };

  return model;
};
