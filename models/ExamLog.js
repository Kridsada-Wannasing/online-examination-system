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
      answer: {
        type: dataTypes.STRING,
      },
    },
    {
      tableName: "exam_logs",
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Exam, {
      foreignKey: "examId",
    });
    model.belongsTo(models.Student, {
      foreignKey: "studentId",
    });
    model.belongsTo(models.Question, {
      foreignKey: "questionId",
    });
  };

  return model;
};
