module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Exam",
    {
      examId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      examType: {
        type: dataTypes.STRING(20),
      },
      term: {
        type: dataTypes.INTEGER(1),
      },
      year: {
        type: dataTypes.INTEGER(4),
      },
      examName: {
        type: dataTypes.STRING(100),
      },
      format: {
        type: dataTypes.BOOLEAN,
      },
      authority: {
        type: dataTypes.BOOLEAN,
      },
    },
    {
      tableName: "exams",
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.hasMany(models.QuestionExam, {
      foreignKey: "examId",
    });
    // model.hasMany(models.ExamLog, {
    //   foreignKey: "examId",
    // });
    model.hasMany(models.Subject, {
      foreignKey: "examId",
    });
    // model.hasMany(models.Score, {
    //   foreignKey: "examId",
    // });
    model.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
    });
  };

  return model;
};
