module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "ExamLog",
    {
      examLogId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      answer1: {
        type: dataTypes.STRING(50),
      },
      answer2: {
        type: dataTypes.STRING(50),
      },
      answer3: {
        type: dataTypes.STRING(50),
      },
      answer4: {
        type: dataTypes.STRING(50),
      },
      answer5: {
        type: dataTypes.STRING(50),
      },
    },
    {
      tableName: "exams",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Exam, {
      foreignKey: "examId",
    });
    model.belongsTo(models.Student, {
      foreignKey: "studentId",
    });
    model.belongsTo(models.ObjectiveQuestion, {
      foreignKey: "objectiveQuestionId",
    });
    model.belongsTo(models.SubjectiveQuestion, {
      foreignKey: "subjectiveQuestionId",
    });
  };

  return model;
};
