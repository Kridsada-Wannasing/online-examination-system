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

  return model;
};
