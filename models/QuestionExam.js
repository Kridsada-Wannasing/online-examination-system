module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "QuestionExam",
    {
      questionExamId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    },
    {
      tableName: "question_exams",
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Exam, {
      foreignKey: "examId",
    });
    model.belongsTo(models.Question, {
      foreignKey: "questionId",
    });
  };

  return model;
};
