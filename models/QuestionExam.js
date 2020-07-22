module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "QuestionsExam",
    {
      QuestionsexamId: {
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
    model.belongsTo(models.ObjectiveQuestions, {
      foriegnKey: "ObjectiveQuestionId",
    });
    model.belongsTo(models.SubjectiveQuestions, {
      foriegnKey: "SubjectiveQuestionId",
    });
  };

  return model;
};
