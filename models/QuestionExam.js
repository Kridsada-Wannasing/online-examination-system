module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "QuestionExam",
    {
      questionExamId: {
        type: dataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    },
    {
      tableName: "question_exam",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Exam, {
      foriegnKey: "examId",
    });
    model.belongsTo(models.Question, {
      foriegnKey: "questionId",
    });
  };

  return model;
};
