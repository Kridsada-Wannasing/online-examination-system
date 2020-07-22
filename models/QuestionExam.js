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

  return model;
};
